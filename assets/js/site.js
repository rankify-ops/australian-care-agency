document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var spacer = document.querySelector(".site-header-spacer");
  var toggle = document.querySelector(".mobile-menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      header.classList.toggle("nav-open");
    });
  }

  if (header && spacer) {
    var STICK_AT = 80;
    var onScroll = function () {
      var shouldStick = window.scrollY > STICK_AT;
      if (shouldStick && !header.classList.contains("is-stuck")) {
        spacer.style.height = header.getBoundingClientRect().height + "px";
        header.classList.add("is-stuck");
      } else if (!shouldStick && header.classList.contains("is-stuck")) {
        header.classList.remove("is-stuck");
        spacer.style.height = "0px";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.querySelectorAll(".main-nav li.has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle("dropdown-open");
      }
    });
  });

  document.querySelectorAll(".faq-item .faq-question").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
      });
      if (!wasOpen) item.classList.add("open");
    });
  });

  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }
});
