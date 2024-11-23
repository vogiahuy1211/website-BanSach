

// ĐƯA LÊN 
const productsFromLocal = JSON.parse(localStorage.getItem('product')) || [];

const pageSize = 8; 

// Hiển thị sản phẩm và phân trang
function displayFilteredProducts(filteredProducts, currentPage) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Xóa nội dung hiện tại

    // Kiểm tra nếu không có sản phẩm nào sau khi lọc
    if (filteredProducts.length === 0) {
      const noProductsMessage = document.createElement('div');
      noProductsMessage.classList.add('no-products-message');
      noProductsMessage.innerText = 'Không tìm thấy sản phẩm phù hợp.';
      productsContainer.appendChild(noProductsMessage);
      return; // Dừng lại nếu không có sản phẩm nào
  }
    // Tính toán chỉ số bắt đầu và kết thúc
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    // Hiển thị sản phẩm trên trang hiện tại
    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('productitems');
        productItem.innerHTML = `
            <img class="product-img" src="${product.src}" alt="">
            <div class="product-price"><i class="fa-solid fa-truck"></i>${product.price}Đ</div>
            <div class="add-cart">Thêm vào giỏ</div>
        `;
        productsContainer.appendChild(productItem);
    });

    // Gọi hàm hiển thị phân trang
    renderPage(filteredProducts, currentPage);
}
function renderPage(filteredProducts, currentPage) {
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = ''; // Xóa nội dung hiện tại

  // Hiển thị số trang
  for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('div');
      pageButton.classList.add('page', `page${i}`);
      if (i === currentPage) {
          pageButton.classList.add('activepage'); // Đánh dấu trang hiện tại
      }
      pageButton.innerText = i;
      pageButton.addEventListener('click', () => changePage(filteredProducts, i));
      paginationContainer.appendChild(pageButton);
  }
}
function changePage(filteredProducts, pageNumber) {
  // Hiển thị sản phẩm mới khi chuyển trang
  displayFilteredProducts(filteredProducts, pageNumber);
}
function searchProducts() {
  const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
  const category = document.getElementById('advanced-search-category-select').value;

  // Lọc sản phẩm dựa trên tiêu chí tìm kiếm
  const filteredProducts = productsFromLocal.filter(product => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'Tất cả' || product.category === category;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesName && matchesCategory && matchesPrice;
  });

  // Hiển thị sản phẩm đã lọc từ trang 1
  displayFilteredProducts(filteredProducts, 1);
   // Cuộn xuống phần sản phẩm
   const productsContainer = document.querySelector('.products');
   productsContainer.scrollIntoView({ behavior: 'smooth' });  
}
document.querySelector('.search-bar input').addEventListener('input', searchProducts);
document.getElementById('min-price').addEventListener('change', searchProducts);
document.getElementById('max-price').addEventListener('change', searchProducts);
document.getElementById('advanced-search-category-select').addEventListener('change', searchProducts);
// reset tìm kiếm
function resetSearch() {
  // Reset các trường tìm kiếm về trạng thái ban đầu
  document.querySelector('.search-bar input').value = '';  
  document.getElementById('min-price').value = '';         
  document.getElementById('max-price').value = '';         
  document.getElementById('advanced-search-category-select').value = 'Tất cả';  
  searchProducts();
}

// Gắn sự kiện click cho nút reset
document.getElementById('reset-search').addEventListener('click', function(event) {
  event.preventDefault(); 
  resetSearch();  
}); // ĐƯA ĐẾN ĐÂY 

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  }); 
});
//


document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("currentUser");

  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  if (user) {
    loginLink.style.display = "none";
    logoutLink.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    logoutLink.style.display = "none";
  }

  logoutLink.addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "auth.html";
    loginLink.style.display = "inline-block";
    logoutLink.style.display = "none";
  });
});
// ĐƯA LÊN ĐẾN CUỐI
// Đợi DOM được load đầy đủ
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các thành phần liên quan
  const filterBtn = document.querySelector(".filter-btn");
  const advancedSearch = document.querySelector(".advanced-search");

  // Thêm sự kiện click cho nút Lọc
  filterBtn.addEventListener("click", function () {
    // Kiểm tra nếu phần advanced-search đang mở, thì đóng lại
    if (advancedSearch.classList.contains("open")) {
      advancedSearch.classList.remove("open");
    } else {
      // Nếu chưa mở, thì mở ra
      advancedSearch.classList.add("open");
    }
  });

  // Tùy chọn: Đóng phần advanced-search khi click ra ngoài
  document.addEventListener("click", function (event) {
    if (!advancedSearch.contains(event.target) && !filterBtn.contains(event.target)) {
      advancedSearch.classList.remove("open");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const accountInfoLink = document.getElementById("account-info-link");

  // Kiểm tra nếu người dùng đã đăng nhập
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    loginLink.style.display = "none";
    logoutLink.style.display = "inline-block";
    accountInfoLink.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    logoutLink.style.display = "none";
    accountInfoLink.style.display = "none";
  }

  // Xử lý khi nhấn nút Đăng xuất
  logoutLink.addEventListener("click", function () {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("currentUser");

    // Cập nhật hiển thị
    loginLink.style.display = "inline-block";
    logoutLink.style.display = "none";
    accountInfoLink.style.display = "none";

    // Chuyển hướng về trang đăng nhập
    window.location.href = "auth.html";
  });
});

// nút đóng lọc
function closeSearchAdvanced() {
  document.querySelector(".advanced-search").classList.toggle("open");
}

// Thông tin tài khoản 

