function initMenuEvents() {
    const menuItems = document.querySelectorAll('.nav_left-menu');
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function () {
            for (let j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            this.classList.add('active');
            toggleMainContent(this.id);  // Gọi toggle để hiển thị nội dung tương ứng
        });
    }
}

// Hàm ẩn/hiện nội dung chính
function toggleMainContent(clickedId) {
    const mainContent = document.querySelector(".Huy_maincontent");

    // Ẩn nội dung đơn hàng nếu không phải "Đơn hàng"
    if (clickedId === "donHangLink") {
        mainContent.style.display = "block"; // Hiển thị danh sách đơn hàng
        let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
        hienThiDonHang(orderList);  // Hiển thị danh sách đơn hàng
    } else {
        mainContent.style.display = "none";  // Ẩn nếu không phải "Đơn hàng"
    }
}

// Hàm hiển thị đơn hàng
function hienThiDonHang(orderList) {
    const tbody = document.getElementById("orderTableBody");
    tbody.innerHTML = "";

    if (!orderList) {
        orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    }

    if (orderList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">Không có đơn hàng</td>
            </tr>
        `;
        return;
    }

    for (let i = 0; i < orderList.length; i++) {
        const order = orderList[i];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${order.OrderID}</td>
            <td>${order.FullName}</td>
            <td>${order.OrderDate}</td>
            <td>${order.OrderItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN')} đ</td>
            <td class="centering">
                <select class="status-dropdown" onchange="changeSelectColor(this)">
                    <option value="0" ${order.Status === 0 ? "selected" : ""}>Chưa xử lý</option>
                    <option value="1" ${order.Status === 1 ? "selected" : ""}>Đã xử lý</option>
                    <option value="2" ${order.Status === 2 ? "selected" : ""}>Đã giao</option>
                    <option value="3" ${order.Status === 3 ? "selected" : ""}>Đã hủy</option>
                </select>
            </td>
            <td class="centering"><button class="detail-button" onclick="xemChiTiet(${order.OrderID - 1})">Xem</button></td>
        `;
        tbody.appendChild(tr);

        const dropdown = tr.querySelector(".status-dropdown");
        changeSelectColor(dropdown);

        dropdown.addEventListener("change", () => {
            updateOrderStatus(orderList, order.OrderID - 1, parseInt(dropdown.value));
        });
    }
}

// Hàm cập nhật trạng thái đơn hàng
function updateOrderStatus(orderList, index, newStatus) {
    if (orderList[index].Status !== newStatus) {
        orderList[index].Status = newStatus;
        localStorage.setItem("orderList", JSON.stringify(orderList));
        console.log(`Cập nhật trạng thái đơn hàng ${orderList[index].OrderID} thành công: ${newStatus}`);
        alert(`Cập nhật trạng thái đơn hàng ${orderList[index].OrderID} thành công thành: ${getStatusLabel(newStatus)}`);
    }
}

// Hàm chuyển đổi trạng thái số thành chuỗi 
function getStatusLabel(status) {
    switch (status) {
        case 0: return "Chưa xử lý";
        case 1: return "Đã xử lý";
        case 2: return "Đã giao";
        case 3: return "Đã hủy";
        default: return "Không xác định";
    }
}

// Hàm hiển thị chi tiết đơn hàng
function xemChiTiet(index) {
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const order = orderList[index];

    if (!order) {
        alert("Đơn hàng không tồn tại.");
        return;
    }

    const modal = document.getElementById("orderDetailModal");
    const closeModal = document.getElementById("closeDetailModal");
    const content = document.getElementById("orderDetailContent");

    let details = `
        <p><strong>Mã đơn hàng:</strong> ${index + 1}</p> 
        <p><strong>Tên khách hàng:</strong> ${order.FullName}</p>
        <p><strong>Số điện thoại:</strong> ${order.Sdt}</p>
        <p><strong>Địa chỉ giao hàng:</strong> ${order.Address}</p>
        <p><strong>Ngày đặt:</strong> ${order.OrderDate}</p>
        <p><strong>Trạng thái:</strong> ${getStatusLabel(order.Status)}</p>
        <h4>Danh sách sản phẩm:</h4>
        <ul>
    `;

    order.OrderItems.forEach((item) => {
        details += `<li>${item.name} - Số lượng: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</li>`;
    });

    const totalPrice = order.OrderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    details += `
        </ul>
        <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString('vi-VN')} đ</p>
    `;

    content.innerHTML = details;
    modal.style.display = "block";

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Hàm mở/đóng modal lọc
function initFilterModal() {
    const filterBtn = document.getElementById("filterBtn");
    const filterModal = document.getElementById("filterModal");
    const closeModal = document.getElementById("closeModal");
    const confirmFilter = document.getElementById("confirmFilter");

    filterBtn.addEventListener("click", () => filterModal.style.display = "block");
    closeModal.addEventListener("click", () => filterModal.style.display = "none");
    
    window.addEventListener("click", event => {
        if (event.target === filterModal) {
            filterModal.style.display = "none";
        }
    });

    confirmFilter.addEventListener("click", () => {
        filterModal.style.display = "none";
        filterOrders(); 
    });
}

let filterFromDate = null;
let filterToDate = null;

// Hàm lọc danh sách đơn hàng theo ngày
function locDonHangTheoNgay(orderList, fromDate, toDate) {
    if (!fromDate || !toDate) return orderList;

    const from = convertToDateFormat(fromDate, true);
    const to = convertToDateFormat(toDate, true);
    const filteredOrders = [];

    for (let i = 0; i < orderList.length; i++) {
        const order = orderList[i];
        const orderDate = convertToDateFormat(order.OrderDate);
        if (orderDate >= from && orderDate <= to) {
            filteredOrders.push(order);
        }
    }

    return filteredOrders;
}

// Hàm lọc danh sách đơn hàng theo trạng thái
function locDonHangTheoTrangThai(orderList, selectedStatus) {
    if (selectedStatus === "" || selectedStatus === undefined) {
        return orderList;
    }
    selectedStatus = parseInt(selectedStatus);
    const filteredOrders = [];

    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].Status === selectedStatus) {
            filteredOrders.push(orderList[i]);
        }
    }

    return filteredOrders;
}

// Hàm lọc đơn hàng theo địa chỉ
function locDonHangTheoDiaChi(orderList, userAccountList) {
    
    const provinceId = document.getElementById('provinces').value;
    const districtId = document.getElementById('districts').value;
    const wardId = document.getElementById('wards').value;

    console.log("Province ID:", provinceId);
    console.log("District ID:", districtId);
    console.log("Ward ID:", wardId);

    const filteredOrders = []; 

    // Duyệt qua tất cả các đơn hàng trong orderList bằng vòng lặp for
    for (let i = 0; i < orderList.length; i++) {
        const order = orderList[i];
        const user = getUserByOrderID(order, userAccountList);  
        
        if (user) {
            const { address2, address3, address4 } = user;
            const isProvinceMatch = provinceId ? provinceId === address2 : true;
            const isDistrictMatch = districtId ? districtId === address3 : true;
            const isWardMatch = wardId ? wardId === address4 : true;
            if (isProvinceMatch && isDistrictMatch && isWardMatch) {
                filteredOrders.push(order);
            }
        }
    }
    return filteredOrders;
}

// Hàm lay user từ userAccountList theo OrderID
function getUserByOrderID(order, userAccountList) {
    return userAccountList.find(user => user.userId === order.UserID);
}

// Hàm lọc và hiển thị đơn hàng
function filterOrders() {
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const userAccountList = JSON.parse(localStorage.getItem("userAccountList")) || [];
    const selectedStatus = document.getElementById("statusFilter").value;
    const filterFromDate = document.getElementById("fromDate").value;
    const filterToDate = document.getElementById("toDate").value;
    let filteredOrders = locDonHangTheoTrangThai(orderList, selectedStatus);
    filteredOrders = locDonHangTheoNgay(filteredOrders, filterFromDate, filterToDate);
    filteredOrders = locDonHangTheoDiaChi(filteredOrders, userAccountList);

    hienThiDonHang(filteredOrders);
}

// Hàm chuyển đổi ngày để đúng form so sánh
function convertToDateFormat(dateString, isFromDate = false) {
    if (isFromDate) {
        const [year, month, day] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`);
    } else {
        const [day, month, year] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`);
    }
}

// Hàm cập nhật OrderID cho các đơn hàng
function updateOrderID(orderList) {
    for (let i = 0; i < orderList.length; i++) {
        const order = orderList[i];
        if (!order.OrderID || order.OrderID === "N/A") {
            order.OrderID = i + 1;
        }
    }
    localStorage.setItem("orderList", JSON.stringify(orderList));
}

// Khởi tạo tất cả chức năng khi Load
document.addEventListener("DOMContentLoaded", () => {
    initMenuEvents();
    initFilterModal();
    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    updateOrderID(orderList);
    // hienThiDonHang(orderList);
});



// Thay đổi màu chữ theo trạng thái
function changeSelectColor(selectElement) {
    const selectedValue = parseInt(selectElement.value);
    let color = "black";

    switch (selectedValue) {
        case 0: color = "orange"; break;
        case 1: color = "blue"; break;
        case 2: color = "green"; break;
        case 3: color = "red"; break;
    }

    selectElement.style.color = color;
}



// Hàm để khởi tạo các tỉnh vào dropdown
function populateProvinces() {
    const provinces = JSON.parse(localStorage.getItem('Tinh_TP')) || [];
    const provincesSelect = document.getElementById('provinces');
    
    provincesSelect.innerHTML = '<option value="">Chọn Tỉnh/TP</option>'; // Reset dropdown
    
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.TinhID;
        option.textContent = province.TinhName;
        provincesSelect.appendChild(option);
    });
  }
  
  // Hàm để hiển thị quận/huyện khi chọn tỉnh
  function populateDistricts() {
    const provinceId = document.getElementById('provinces').value;
    const districts = JSON.parse(localStorage.getItem('Quan_Huyen')) || [];
    const districtsSelect = document.getElementById('districts');
    
    if (!provinceId) {
        districtsSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        return;
    }
    
    const filteredDistricts = districts.filter(district => district.TinhID === provinceId);
    
    districtsSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>'; // Reset dropdown
    filteredDistricts.forEach(district => {
        const option = document.createElement('option');
        option.value = district.Quan_HuyenID;
        option.textContent = district.Quan_HuyenName;
        districtsSelect.appendChild(option);
    });
  }
  
  // Hàm để hiển thị phường/xã khi chọn quận/huyện
  function populateWards() {
    const districtId = document.getElementById('districts').value;
    const wards = JSON.parse(localStorage.getItem('Phuong_Xa')) || [];
    const wardsSelect = document.getElementById('wards');
    
    if (!districtId) {
        wardsSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        return;
    }
    
    const filteredWards = wards.filter(ward => ward.Quan_HuyenID === districtId);
    
    wardsSelect.innerHTML = '<option value="">Chọn Phường / Xã</option>'; // Reset dropdown
    filteredWards.forEach(ward => {
        const option = document.createElement('option');
        option.value = ward.PhuongID;
        option.textContent = ward.PhuongName;
        wardsSelect.appendChild(option);
    });
  }
  
  // Hàm khởi tạo dropdown và các sự kiện
  window.onload = function() {
    populateProvinces();
    
    // Gắn sự kiện onchange cho các dropdown
    document.getElementById('provinces').addEventListener('change', populateDistricts);
    document.getElementById('districts').addEventListener('change', populateWards);
  };





























