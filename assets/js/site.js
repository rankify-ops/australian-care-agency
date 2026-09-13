document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".mobile-menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      header.classList.toggle("nav-open");
    });
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
    var messageEl = contactForm.querySelector(".form-message");
    var submitBtn = contactForm.querySelector("button[type=submit]");
    var submitLabel = submitBtn ? submitBtn.textContent : "";

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (messageEl) {
        messageEl.textContent = "";
        messageEl.classList.remove("success", "error");
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (messageEl) {
            if (data.success) {
              messageEl.textContent = "Thanks! Your message has been sent — we'll be in touch soon.";
              messageEl.classList.add("success");
              contactForm.reset();
            } else {
              messageEl.textContent = "Something went wrong sending your message. Please call us on 0411 426 496 instead.";
              messageEl.classList.add("error");
            }
          }
        })
        .catch(function () {
          if (messageEl) {
            messageEl.textContent = "Something went wrong sending your message. Please call us on 0411 426 496 instead.";
            messageEl.classList.add("error");
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
    });
  }
});
