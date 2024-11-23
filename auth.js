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
  if (!presentId) {
    presentId = 10001;
  }

  if (!username || !password || !confirmPassword || !phoneNumber || !fullname) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isUsernameTaken = users.some((user) => user.username === username);
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
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("presentId", presentId + 1);
  alert("Đăng kí thành công!");
  showLogin();
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (matchedUser) {
    alert("Đăng nhập thành công!");
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
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
