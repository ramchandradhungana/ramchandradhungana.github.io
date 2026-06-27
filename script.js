/* ═══════════════════════════════════════════════════
   Ram Chandra Dhungana — PhD Portfolio
   script.js  |  Nav · Active links · Contact form
   ═══════════════════════════════════════════════════ */

/* ── Year ── */
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/* ── Mobile nav toggle ── */
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ── Active nav link on scroll ── */
const sections = [...document.querySelectorAll("main section[id]")];

const setActiveLink = () => {
  let current = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) current = section;
  });
  menuLinks.forEach(link => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });

/* ── Formspree contact form ──────────────────────────
   Endpoint: https://formspree.io/f/mdarznlz
   To use a separate PhD-site inbox, create a new form
   at formspree.io and replace 'mdarznlz' below.
──────────────────────────────────────────────────── */
const contactForm = document.getElementById("contact-form");
const submitBtn   = document.getElementById("submit-btn");
const fsSuccess   = document.getElementById("fs-success");
const fsError     = document.getElementById("fs-error");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (fsSuccess) fsSuccess.style.display = "none";
    if (fsError)   fsError.style.display   = "none";

    submitBtn.disabled    = true;
    submitBtn.textContent = "Sending…";

    const data = new FormData(contactForm);

    try {
      const res = await fetch("https://formspree.io/f/mdarznlz", {
        method:  "POST",
        body:    data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        if (fsSuccess) fsSuccess.style.display = "block";
        contactForm.reset();
        // Scroll success message into view
        fsSuccess && fsSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        if (fsError) fsError.style.display = "block";
      }
    } catch (_) {
      if (fsError) fsError.style.display = "block";
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = "Send Message ✉️";
    }
  });
}
