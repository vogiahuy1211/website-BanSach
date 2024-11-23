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

    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const filteredOrders = locDonHangtheoNgay(orderList, filterFromDate, filterToDate);

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
            <td>${order.User.FullName}</td>
            <td>${formatOrderDate(order.orderDate)}</td>
            <td>${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN')} đ</td>
            <td>
                <select class="status-dropdown">
                    <option value="Chưa xử lý" ${order.status === "Chưa xử lý" ? "selected" : ""}>Chưa xử lý</option>
                    <option value="Đã xử lý" ${order.status === "Đã xử lý" ? "selected" : ""}>Đã xử lý</option>
                    <option value="Đã giao" ${order.status === "Đã giao" ? "selected" : ""}>Đã giao</option>
                    <option value="Đã hủy" ${order.status === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
                </select>
            </td>
            <td class="button-container"><button class="detail-button" onclick="xemChiTiet(${index})">Xem</button></td>
        `;
        tbody.appendChild(tr);

        const dropdown = tr.querySelector(".status-dropdown");
        dropdown.addEventListener("change", () => {
            updateOrderStatus(orderList, index, dropdown.value);
        });
    });
}

// Hàm hiển thị chi tiết đơn hàng
function xemChiTiet(index) {
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const order = orderList[index]; // Chọn đơn hàng dựa trên index

    if (!order) return;

    const modal = document.getElementById("orderDetailModal");
    const closeModal = document.getElementById("closeDetailModal");
    const content = document.getElementById("orderDetailContent");

    let details = `
        <p><strong>Mã đơn hàng:</strong> ${index + 1}</p> <!-- Hiển thị orderId tự động -->
        <p><strong>Tên khách hàng:</strong> ${order.User.FullName}</p>
        <p><strong>Địa chỉ khách hàng:</strong> ${order.User.Address}</p>
        <p><strong>Ngày đặt:</strong> ${order.orderDate}</p>
        <p><strong>Trạng thái:</strong> ${order.status}</p>
        <h4>Danh sách sản phẩm:</h4>
        <ul>
    `;
    order.items.forEach((item, idx) => {
        details += `<li>${item.name} - Số lượng: ${item.quantity} - Giá: ${item.price.toLocaleString('vi-VN')} đ</li>`;
    });
    const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
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

    if (!fromDate || !toDate) return orderList;

    const from = convertToDateFormat(fromDate);
    const to = convertToDateFormat(toDate);

    return orderList.filter(order => {
        const orderDate = convertToDateFormat(order.orderDate);
        return orderDate >= from && orderDate <= to;
    });
}

// Hàm định dạng ngày theo dd/mm/yyyy
function formatOrderDate(orderDate) {
    const [month, day, year] = orderDate.split('/');
    return `${day}/${month}/${year}`;
}

// Hàm chuyển đổi ngày từ mm/dd/yyyy
function convertToDateFormat(dateString) {
    // Kiểm tra nếu ngày có định dạng yyyy-mm-dd
    const [year, month, day] = dateString.split('-');
    return new Date(`${month}/${day}/${year}`);
}


// Khởi tạo tất cả chức năng khi DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initMenuEvents();
    initFilterModal();
    hienThiDonHang();
});

// Dữ liệu đơn hàng mẫu cho localStorage
const orderList = [
    {
        User: {
            UserID: 10001,
            FullName: "Nguyễn Văn A",
            UserPassword: "password123",
            UserName: "nguyenvana",
            Sdt: "0987654321",
            Status: "Active",
            Address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        orderDate: "11/10/2024",
        status: "Chưa xử lý",
        items: [
            { productId: 1, category: "tuoitho", name: "Tôi thấy hoa vàng trên cỏ xanh", price: 99000, quantity: 2 },
            { productId: 5, category: "kynangsong", name: "đừng chỉ đẹp mà không hiểu chuyện", price: 139000, quantity: 1 }
        ]
    },
    {
        User: {
            UserID: 10002,
            FullName: "Trần Thị B",
            UserPassword: "securepass",
            UserName: "tranthib",
            Sdt: "0981234567",
            Status: "Active",
            Address: "456 Đường XYZ, Quận 2, TP.HCM"
        },
        orderDate: "11/15/2024",
        status: "Đã xử lý",
        items: [
            { productId: 17, category: "lichsu", name: "lịch sử tư tưởng trung quốc", price: 300000, quantity: 3 },
            { productId: 27, category: "tinhcam", name: "Yêu miêu", price: 500000, quantity: 2 }
        ]
    },
    {
        User: {
            UserID: 10003,
            FullName: "Lê Văn C",
            UserPassword: "mypassword",
            UserName: "levanc",
            Sdt: "0976543210",
            Status: "Active",
            Address: "789 Đường LMN, Quận 3, TP.HCM"
        },
        orderDate: "11/20/2024",
        status: "Đã giao",
        items: [
            { productId: 10, category: "kynangsong", name: "nhà đầu tư vĩ đại", price: 260000, quantity: 1 },
            { productId: 34, category: "kynangsong", name: "tiểu sử Elon Musk", price: 99000, quantity: 2 }
        ]
    },
    {
        User: {
            UserID: 10004,
            FullName: "Lai Văn D",
            UserPassword: "mypassword",
            UserName: "laivand",
            Sdt: "0976543210",
            Status: "Active",
            Address: "72 Đường ADV, Quận 5, TP.HCM"
        },
        orderDate: "11/23/2024",
        status: "Đã giao",
        items: [
            { productId: 41, category: "tinhcam", name: "kiếp nào ta cũng tìm thấy nhau", price: 99000, quantity: 1 },
            { productId: 45, category: "kynangsong", name: "Thép đã tôi thế đấy", price: 139000, quantity: 2 }
        ]
    }

];

// Lưu vào localStorage
localStorage.setItem("orderList", JSON.stringify(orderList));
