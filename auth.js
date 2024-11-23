/* ÔNG LẤY HẾT CODE NÀY ĐỔI LẠI CODE TRONG GIT HỘ TUI CÁI */
"use strict";

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  document
    .querySelector(".tab-container .tab.active-tab")
    .classList.remove("active-tab");
  document.querySelector(".tab-container .tab").classList.add("active-tab");
}

function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document
    .querySelector(".tab-container .tab.active-tab")
    .classList.remove("active-tab");
  document
    .querySelectorAll(".tab-container .tab")[1]
    .classList.add("active-tab");
}

function register() {
  const username = document.getElementById("register-username").value;
  const fullname = document.getElementById("register-fullname").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const phoneNumber = document.getElementById("phone-number").value;
  let presentId = parseInt(localStorage.getItem("presentId"));
  const address1 = document.getElementById("address-number").value;
  const address2 = document.getElementById("provinces").value;
  const address3 = document.getElementById("districts").value;
  const address4 = document.getElementById("wards").value;
  if (!presentId) {
    presentId = 10001;
  }

  if (!username || !password || !confirmPassword || !phoneNumber || !fullname || !address1 || !address2 || !address3 || !address4) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }
  const userAccountList = JSON.parse(localStorage.getItem("userAccountList")) || [];

  const isUsernameTaken = userAccountList.some((user) => user.username === username);
  if (isUsernameTaken) {
    alert("Tên đăng nhập đã tồn tại!");
    return;
  }

  const newUser = {
    userId: presentId,
    username,
    fullname,
    password,
    phoneNumber,
    address1,
    address2,
    address3,
    address4,
  };

  userAccountList.push(newUser);

  localStorage.setItem("userAccountList", JSON.stringify(userAccountList));
  localStorage.setItem("presentId", presentId + 1);
  alert("Đăng kí thành công!");
  showLogin();
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const userAccountList = JSON.parse(localStorage.getItem("userAccountList")) || [];

  const matchedUser = userAccountList.find(
    (user) => user.username === username && user.password === password
  );

  if (matchedUser) {
    alert("Đăng nhập thành công!");
    localStorage.setItem("userLogin", JSON.stringify(matchedUser));
    window.location.href = "index.html";
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
}

document.querySelector(".close-btn").onclick = function () {
  document.querySelector(".login-container").style.display = "none";
};

// js/auth.js
document.querySelector(".close-btn").addEventListener("click", () => {
  // Chuyển hướng về trang chủ (index.html)
  window.location.href = "index.html";
});

// Địa chỉ
// Hàm để hiển thị dropdown địa chỉ
function toggleAddressDropdown() {
  const dropdown = document.querySelector('.address-dropdown');
  dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
}

// Hàm để khởi tạo các tỉnh vào dropdown
function populateProvinces() {
  const provinces = JSON.parse(localStorage.getItem('Tinh_TP')) || [];
  const provincesSelect = document.getElementById('provinces');
  
  provincesSelect.innerHTML = '<option value="">Chọn Tỉnh / Thành phố</option>'; // Reset dropdown
  
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
      districtsSelect.innerHTML = '<option value="">Chọn Quận / Huyện</option>';
      return;
  }
  
  const filteredDistricts = districts.filter(district => district.TinhID === provinceId);
  
  districtsSelect.innerHTML = '<option value="">Chọn Quận / Huyện</option>'; // Reset dropdown
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
      wardsSelect.innerHTML = '<option value="">Chọn Phường / Xã</option>';
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
