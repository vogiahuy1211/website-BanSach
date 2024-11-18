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
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const phoneNumber = document.getElementById("phone-number").value;

  if (!username || !password || !confirmPassword || !phoneNumber) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }

  localStorage.setItem(username, JSON.stringify({ password, phoneNumber }));
  alert("Đăng kí thành công!");

  showLogin();
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    alert("Đăng nhập thành công!");
    localStorage.setItem("currentUser", username);
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
