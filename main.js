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

document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("currentUser");
  console.log(user)

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
