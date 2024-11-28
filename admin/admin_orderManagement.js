const menuItems = document.querySelectorAll('.nav_left-menu');
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function() {
        for (let j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('active');
        }
        this.classList.add('active');
    }); 
}

    
    const donHangLink = document.getElementById('donHangLink');
    const mainContent = document.getElementById("admin_content");

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', function() {
            for (let j = 0; j < menuItems.length; j++) {
                menuItems[j].classList.remove('active');
            }
            this.classList.add('active');
            mainContent.innerHTML = '';
    
            if (this === donHangLink) {
                hienThiDonHang(); 
            }
        });
    }



    function hienThiDonHang(orderList) {
        const mainContent = document.getElementById("admin_content");
    
        if (!orderList) {
            orderList = JSON.parse(localStorage.getItem("orderList")) || [];
        }
    
        let contentHTML = `
            <h1 class="centering">DANH SÁCH ĐƠN HÀNG</h1>
            <div class="filter" id="filter">
                <button id="filterBtn" class="filter-btn">Lọc</button>
            </div>
            <table id="orderTable">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th class="centering">Trạng thái</th>
                        <th class="centering">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        if (orderList.length === 0) {
            contentHTML += `
                    <tr>
                        <td colspan="6" style="text-align: center;">Không có đơn hàng</td>
                    </tr>
            `;
        } else {
            for (let i = 0; i < orderList.length; i++) {
                const order = orderList[i];
                const totalAmount = order.OrderItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN');
                contentHTML += `
                    <tr>
                        <td>${order.OrderID}</td>
                        <td>${order.FullName}</td>
                        <td>${order.OrderDate}</td>
                        <td>${totalAmount} đ</td>
                        <td class="centering">
                            <select class="status-dropdown" data-order-id="${order.OrderID-1}" onchange="changeStatus(this)">
                                <option value="0" ${order.Status === "0" ? "selected" : ""}>Chưa xử lý</option>
                                <option value="1" ${order.Status === "1" ? "selected" : ""}>Đã xử lý</option>
                                <option value="2" ${order.Status === "2" ? "selected" : ""}>Đã giao</option>
                                <option value="3" ${order.Status === "3" ? "selected" : ""}>Đã hủy</option>
                            </select>
                        </td>
                        <td class="centering">
                            <button class="detail-button" onclick="xemChiTiet(${order.OrderID - 1})">Xem</button>
                        </td>
                    </tr>
                `;
            }
        }
    
        contentHTML += `
                </tbody>
            </table>
        `;
    
        mainContent.innerHTML = contentHTML;
        initFilterModal();
        const statusDropdowns = document.querySelectorAll('.status-dropdown');
        for (let i = 0; i < statusDropdowns.length; i++) {
            changeSelectColor(statusDropdowns[i]);
        }
    }
    




// Hàm chuyển đổi trạng thái số thành chuỗi 
function getStatusLabel(status) {
    switch (status) {
        case "0": return "Chưa xử lý";
        case "1": return "Đã xử lý";
        case "2": return "Đã giao";
        case "3": return "Đã hủy";
        default: return "Không xác định";
    }
}

// Thay đổi màu chữ theo trạng thái
// function changeSelectColor(selectElement, orderId) {
    
//     const selectedValue = selectElement.value;

//     switch (selectedValue) {
//         case "0": 
//             selectElement.style.color = "#f0ad4e"; 
//             break;
//         case "1": 
//             selectElement.style.color = "#1565D6"; 
//             break;
//         case "2": 
//             selectElement.style.color = "#5cb85c";
//             break;
//         case "3": 
//             selectElement.style.color = "#d9534f"; 
//             break;
//         default:
//             selectElement.style.color = "#000000"; 
//             break;
//     }

    
// }


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


function locDonHangTheoTrangThai(orderList, selectedStatus) {
    if (selectedStatus === "" || selectedStatus === undefined) {
        return orderList;
    }

    return orderList.filter(order => order.Status === selectedStatus);
}

// Hàm lọc danh sách đơn hàng theo ngày
function locDonHangTheoNgay(orderList, fromDate, toDate) {
    if (!fromDate || !toDate) return orderList;

    const from = convertToDateFormat(fromDate, true);
    const to = convertToDateFormat(toDate, true);

    return orderList.filter(order => {
        const orderDate = convertToDateFormat(order.OrderDate);
        return orderDate >= from && orderDate <= to;
    });
}

// Hàm lọc đơn hàng theo địa chỉ
function locDonHangTheoDiaChi(orderList) {
    const provinceId = document.getElementById('provinces').value;
    const districtId = document.getElementById('districts').value;
    const wardId = document.getElementById('wards').value;

    return orderList.filter(order => {
        const isProvinceMatch = provinceId ? provinceId === order.Province : true;
        const isDistrictMatch = districtId ? districtId === order.District : true;
        const isWardMatch = wardId ? wardId === order.Ward : true;
        return isProvinceMatch && isDistrictMatch && isWardMatch;
    });
}



// Hàm lọc và hiển thị đơn hàng
function filterOrders() {
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const selectedStatus = document.getElementById("statusFilter").value;
    const filterFromDate = document.getElementById("fromDate").value;
    const filterToDate = document.getElementById("toDate").value;
    
    let filteredOrders = locDonHangTheoTrangThai(orderList, selectedStatus);
    filteredOrders = locDonHangTheoNgay(filteredOrders, filterFromDate, filterToDate);
    filteredOrders = locDonHangTheoDiaChi(filteredOrders);

    // Hiển thị danh sách đơn hàng đã lọc
    hienThiDonHang(filteredOrders); 
}

document.getElementById("confirmFilter").addEventListener("click", function() {
    filterOrders(); 
    filterModal.style.display= "none";
});



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

// Hàm mở/đóng modal lọc
function initFilterModal() {
    const filterBtn = document.getElementById("filterBtn");
    const filterModal = document.getElementById("filterModal");
    const closeModal = document.getElementById("closeModal");

    filterBtn.addEventListener("click", () => {
        filterModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        filterModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === filterModal) {
            filterModal.style.display = "none";
        }
    });
}

// Khởi tạo modal khi load trang
document.addEventListener("DOMContentLoaded", () => {
    initFilterModal();
    const orders = JSON.parse(localStorage.getItem("orders")) || {};

    const dropdowns = document.querySelectorAll('.status-dropdown');
    for (let i = 0; i < dropdowns.length; i++) {
        const orderId = dropdowns[i].dataset.orderId;
        if (orders[orderId]) {
            dropdowns[i].value = orders[orderId];
            changeSelectColor(dropdowns[i], orderId);
        }
    }
});

function changeStatus(selectElement) {
    let orderId = (selectElement.dataset.orderId); 
    let selectedValue = selectElement.value; 

    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    let orderIndex = orderList.findIndex(order => order.OrderID === orderId);
    console.log(orderIndex);

    if (orderIndex !== -1) {
        orderList[orderIndex].Status = selectedValue;

        localStorage.setItem("orderList", JSON.stringify(orderList));

        console.log(`Order ${orderId} updated to status ${selectedValue}`);
    } else {
        alert("Lỗi");
    }
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

