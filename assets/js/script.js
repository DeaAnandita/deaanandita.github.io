'use strict';

console.log("script.js berhasil dimuat ✅");

// fungsi toggle class active
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ── SIDEBAR (mobile) ────────────────────────────────────────
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ── PORTFOLIO FILTER ────────────────────────────────────────
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // note: typo di HTML, seharusnya data-select-value
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {

    const category = item.dataset.category;

    if (selectedValue === "all") {
      item.classList.add("active");
    } 
    else if (category.includes(selectedValue)) {
      item.classList.add("active");
    } 
    else {
      item.classList.remove("active");
    }

  });
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ── CONTACT FORM VALIDATION ─────────────────────────────────
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ── NAVBAR / PAGE NAVIGATION ────────────────────────────────
const navLinks = document.querySelectorAll(".navbar-link[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");

console.log(`Ditemukan ${navLinks.length} tombol navbar`);

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // cegah scroll aneh jika ada href="#"

    const target = this.getAttribute("data-nav-link");

    // reset semua active
    navLinks.forEach(l => l.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    // aktifkan yang diklik
    this.classList.add("active");

    const targetPage = document.querySelector(`[data-page="${target}"]`);
    if (targetPage) {
      targetPage.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(`Halaman dibuka: ${target}`);
    } else {
      console.warn(`Halaman dengan data-page="${target}" tidak ditemukan`);
    }
  });
});

// Opsional: pastikan halaman About tetap active saat pertama load (sudah ada di HTML)