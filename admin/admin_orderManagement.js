// Hàm khởi tạo sự kiện click cho menu
function initMenuEvents() {
    const menuItems = document.querySelectorAll('.nav_left-menu');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            toggleMainContent(this.id);
        });
    });
}

// Hàm ẩn/hiện nội dung chính
function toggleMainContent(clickedId) {
    const mainContent = document.querySelector(".Huy_maincontent");
    if (clickedId === "donHangLink") {
        mainContent.style.display = "block";
    } else {
        mainContent.style.display = "none";
    }
}

// Hàm hiển thị danh sách đơn hàng
function hienThiDonHang() {
    const tbody = document.getElementById("orderTableBody");
    tbody.innerHTML = "";

    // Lấy danh sách đơn hàng từ localStorage
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const filteredOrders = locDonHangtheoNgay(orderList, filterFromDate, filterToDate);

    //Gán OrderID về lại local
    filteredOrders.forEach((order, index) => {
        order.OrderID = index + 1; 
    });
    localStorage.setItem("orderList", JSON.stringify(orderList));

    if (filteredOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">Không có đơn hàng</td>
            </tr>
        `;
        return;
    }

    filteredOrders.forEach((order, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td> <!-- Hiển thị orderId tự động -->
            <td>${order.FullName}</td>
            <td>${order.OrderDate}</td>
            <td>${order.OrderItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN')} đ</td>
            <td class="centering">
                <select class="status-dropdown" onchange="changeSelectColor(this)">
                    <option value="Chưa xử lý" ${order.Status === "Chưa xác nhận" ? "selected" : ""}>Chưa xử lý</option>
                    <option value="Đã xử lý" ${order.Status === "Đã xử lý" ? "selected" : ""}>Đã xử lý</option>
                    <option value="Đã giao" ${order.Status === "Đã giao" ? "selected" : ""}>Đã giao</option>
                    <option value="Đã hủy" ${order.Status === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
                </select>
            </td>
            <td class="centering"><button class="detail-button" onclick="xemChiTiet(${index})">Xem</button></td>
        `;
        tbody.appendChild(tr);

        const dropdown = tr.querySelector(".status-dropdown");
        changeSelectColor(dropdown); 

        // Thay đổi trạng thái
        dropdown.addEventListener("change", () => {
            updateOrderStatus(orderList, index, dropdown.value);
        });
    });
}


// Hàm cập nhật trạng thái đơn hàng
function updateOrderStatus(orderList, index, newStatus) {
    if (orderList[index].Status !== newStatus) {
        orderList[index].Status = newStatus;

        localStorage.setItem("orderList", JSON.stringify(orderList));
        
        console.log(`Cập nhật trạng thái đơn hàng ${index + 1} thành công: ${newStatus}`);
        alert(`Cập nhật trạng thái đơn hàng ${index + 1} thành công thành: ${newStatus}`);
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
        <p><strong>Mã đơn hàng:</strong> ${index + 1}</p> <!-- Hiển thị orderId tự động -->
        <p><strong>Tên khách hàng:</strong> ${order.FullName}</p>
        <p><strong>Số điện thoại:</strong> ${order.Sdt}</p>
        <p><strong>Địa chỉ giao hàng:</strong> ${order.Address}</p>
        <p><strong>Ngày đặt:</strong> ${order.OrderDate}</p>
        <p><strong>Trạng thái:</strong> ${order.Status}</p>
        <h4>Danh sách sản phẩm:</h4>
        <ul>
    `;

    // Hiển thị danh sách sản phẩm
    order.OrderItems.forEach((item, idx) => {
        details += `<li>${item.name} - Số lượng: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</li>`;
    });

    const totalPrice = order.OrderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    details += `
        </ul>
        <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString('vi-VN')} đ</p>
    `;

    // Cập nhật nội dung modal
    content.innerHTML = details;

    // Hiển thị modal
    modal.style.display = "block";

    // Đóng modal khi nhấn vào nút đóng
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Đóng modal khi nhấn ra ngoài modal
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
        filterFromDate = document.getElementById("fromDate").value;
        filterToDate = document.getElementById("toDate").value;
        hienThiDonHang();
    });
}

// Biến lưu trữ ngày lọc
let filterFromDate = null;
let filterToDate = null;

// Hàm lọc danh sách đơn hàng theo ngày
function locDonHangtheoNgay(orderList, fromDate, toDate) {
    console.log("From Date:", fromDate, "To Date:", toDate);

    // Nếu không có ngày bắt đầu hoặc kết thúc, trả về tất cả đơn hàng
    if (!fromDate || !toDate) return orderList;

    // Chuyển đổi các ngày thành đối tượng Date để so sánh
    const from = convertToDateFormat(fromDate, true); // Chuyển đổi fromDate (yyyy/mm/dd)
    const to = convertToDateFormat(toDate, true); // Chuyển đổi toDate (yyyy/mm/dd)

    return orderList.filter(order => {
        const orderDate = convertToDateFormat(order.OrderDate); // Lấy OrderDate từ đơn hàng (dd/mm/yyyy)
        return orderDate >= from && orderDate <= to;
    });
}


// Hàm định dạng ngày theo dd/mm/yyyy

function formatOrderDate(orderDate) {
    if (!orderDate) return ''; 
    const [month, day, year] = orderDate.split('/');
    return `${day}/${month}/${year}`; // Đảm bảo hiển thị theo dd/mm/yyyy
}


// Hàm chuyển đổi ngày để đúng form so sánh
function convertToDateFormat(dateString, isFromDate = false) {
    if (isFromDate) {
        const [year, month, day] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`); 
    } else {
        // Chuyển đổi từ dd/mm/yyyy (orderDate) thành đối tượng Date
        const [day, month, year] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`); 
    }
}



// Khởi tạo tất cả chức năng khi DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initMenuEvents();
    initFilterModal();
    hienThiDonHang();
});

// Thay đổi màu chữ theo trạng thái
function changeSelectColor(selectElement) {
    const selectedValue = selectElement.value;

    // Xác định màu chữ dựa trên giá trị đã chọn
    let color = 'black'; // Màu mặc định

    if (selectedValue === 'Chưa xử lý') {
        color = 'orange'; 
    } else if (selectedValue === 'Đã xử lý') {
        color = 'blue'; 
    } else if (selectedValue === 'Đã giao') {
        color = 'green'; 
    } else if (selectedValue === 'Đã hủy') {
        color = 'red'; 
    }

    // Cập nhật màu chữ của phần tử select
    selectElement.style.color = color;
}

window.onload = function() {
    const selectElement = document.querySelector('.status-dropdown');
    const selectedValue = selectElement.value;
    changeSelectColor(selectElement);
};









