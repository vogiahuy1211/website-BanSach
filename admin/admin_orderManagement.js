  const menuItems = document.querySelectorAll('.nav_left-menu');
  menuItems.forEach(item => {
  item.addEventListener('click', function() {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
  }); 
  });
  
  // Xử lý sự kiện click vào "Đơn hàng"
  const donHangLink = document.getElementById("donHangLink");
  const mainContent = document.querySelector(".Huy_maincontent");

  donHangLink.addEventListener("click", function (event) {
  event.preventDefault(); 
  mainContent.style.display = "block";
  });
  
  // Ẩn content khi click vào các li khác
  menuItems.forEach(item => {
  item.addEventListener('click', function () {
    menuItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    if (this.id !== "donHangLink") {
        mainContent.style.display = "none"; 
    }
  });
  });

  

  
  // Lấy các phần tử cần thiết
  const filterBtn = document.getElementById("filterBtn");
  const filterModal = document.getElementById("filterModal");
  const closeModal = document.getElementById("closeModal");
  const confirmFilter = document.getElementById("confirmFilter");

  // mở modal khi nhấn nút "lọc"
  filterBtn.addEventListener("click", () => {
  filterModal.style.display = "block";
  });

  //đóng modal nhấn nút "X" hoặc bên ngoài modal 
  closeModal.addEventListener("click", () => {
  filterModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
  if (event.target === filterModal) {
      filterModal.style.display = "none";
  }
  });

  //  Nút "Xác nhận" đóng modal và thực hiện hành động lọc
  confirmFilter.addEventListener("click", () => {
  filterModal.style.display = "none";
  console.log("Từ ngày:", document.getElementById("fromDate").value);
  console.log("Đến ngày:", document.getElementById("toDate").value);
  console.log("Địa chỉ:", document.getElementById("address").value);
  });


  function hienThiDonHang() {
      const tbody = document.getElementById("orderTableBody");
      tbody.innerHTML = ""; 
      const orderList = JSON.parse(localStorage.getItem("orderList")) || [];

      // Nếu không có đơn hàng nào
      if (orderList.length === 0) {
          tbody.innerHTML = `
              <tr>
                  <td colspan="6" style="text-align: center;">Không có sản phẩm</td>
              </tr>
          `;
          return;
      }

      // Hiển thị danh sách đơn hàng
      orderList.forEach((order) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${order.orderId}</td>
              <td>${order.customerName}</td>
              <td>${order.orderDate}</td>
              <td>${order.items.reduce((total, item) => total + item.Book_price, 0).toLocaleString('vi-VN')} đ</td>
              <td>
                  <select class="status-dropdown">
                      <option value="Chưa xử lý" ${order.status === "Chưa xử lý" ? "selected" : ""}>Chưa xử lý</option>
                      <option value="Đã xử lý" ${order.status === "Đã xác nhận" ? "selected" : ""}>Đã xử lý</option>
                      <option value="Đã giao" ${order.status === "Đã giao" ? "selected" : ""}>Đã giao</option>
                      <option value="Đã hủy" ${order.status === "Đã hủy" ? "selected" : ""}>Đã hủy</option>
                  </select>
              </td>
              <td><button onclick="xemChiTiet(${order.orderId})">(...)</button></td>
          `;
          tbody.appendChild(tr);
      });

      //Sự kiện thay đổi trạng thái
      const statusDropdowns = document.querySelectorAll(".status-dropdown");
      statusDropdowns.forEach((dropdown, index) => {
          dropdown.addEventListener("change", function () {
              orderList[index].status = this.value;
              localStorage.setItem("orderList", JSON.stringify(orderList));
              alert("Cập nhật trạng thái đơn hàng thành công!");
          });
      });
  }

  document.addEventListener("DOMContentLoaded", hienThiDonHang);
  

  
  // Hàm hiển thị chi tiết đơn hàng
    function xemChiTiet(orderId) {
        const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
        const order = orderList.find((o) => o.orderId === orderId);
        if (!order) return;

        const modal = document.getElementById("orderDetailModal");
        const closeModal = document.getElementById("closeDetailModal");
        const content = document.getElementById("orderDetailContent");

        // Tạo nội dung 
        let details = `<p><strong>Mã đơn hàng:</strong> ${order.orderId}</p>`;
        details += `<p><strong>Tên khách hàng:</strong> ${order.customerName}</p>`;
        details += `<p><strong>Ngày đặt:</strong> ${order.orderDate}</p>`;
        details += `<p><strong>Trạng thái:</strong> ${order.status}</p>`;
        details += "<h4>Danh sách sản phẩm:</h4><ul>";

        order.items.forEach((item, index) => {
            details += `<li>${index + 1}. ${item.Book_name} - ${item.Book_price.toLocaleString('vi-VN')} đ</li>`;
        });

        details += "</ul>";

        // Hiển thị thông tin chi tiết trong modal
        content.innerHTML = details;

        // Hiển thị modal
        modal.style.display = "block";

        // Đóng modal khi nhấn vào nút "X" hoặc bên ngoài modal
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }