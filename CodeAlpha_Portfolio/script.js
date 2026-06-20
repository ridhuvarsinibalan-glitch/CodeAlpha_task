/* ==========================================
   CRIMSON NOIR PORTFOLIO
   RIDHUVARSINI B
========================================== */

/* ==========================
   TYPING ANIMATION
========================== */

const roles = [
  "Frontend Developer",
  "UI Enthusiast",
  "Creative Problem Solver",
  "Open Source Contributor",
  "FOSS Club Head - Editing Team"
];

const typingElement = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }

  } else {

    typingElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

/* ==========================
   MOBILE NAVIGATION
========================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Close mobile menu on click */

document.querySelectorAll(".nav-links a")
.forEach(link => {

  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

});

/* ==========================
   SCROLL PROGRESS BAR
========================== */

const progressBar =
document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

  const scrollTop =
  document.documentElement.scrollTop;

  const scrollHeight =
  document.documentElement.scrollHeight -
  document.documentElement.clientHeight;

  const progress =
  (scrollTop / scrollHeight) * 100;

  progressBar.style.width =
  progress + "%";
});

/* ==========================
   BACK TO TOP BUTTON
========================== */

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* ==========================
   REVEAL ON SCROLL
========================== */

const revealElements =
document.querySelectorAll(
  ".section, .project-card, .skill-card, .timeline-item, .certificate-card"
);

function reveal() {

  const triggerBottom =
  window.innerHeight * 0.85;

  revealElements.forEach(element => {

    const boxTop =
    element.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      element.classList.add("active");
    }

  });

}

reveal();

window.addEventListener("scroll", reveal);

/* Add reveal class automatically */

revealElements.forEach(item => {
  item.classList.add("reveal");
});

/* ==========================
   ACTIVE NAVBAR LINK
========================== */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
    section.offsetTop - 150;

    const sectionHeight =
    section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navItems.forEach(link => {

    link.classList.remove("active-link");

    if (
      link.getAttribute("href") ===
      "#" + current
    ) {
      link.classList.add("active-link");
    }

  });

});

/* ==========================
   NAVBAR BACKGROUND EFFECT
========================== */

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {

    navbar.style.background =
      "rgba(0,0,0,0.75)";

    navbar.style.boxShadow =
      "0 5px 20px rgba(255,30,30,.15)";

  } else {

    navbar.style.background =
      "rgba(0,0,0,.3)";

    navbar.style.boxShadow =
      "none";
  }

});

/* ==========================
   BUTTON RIPPLE EFFECT
========================== */

const buttons =
document.querySelectorAll(".btn");

buttons.forEach(button => {

  button.addEventListener("click", function (e) {

    const ripple =
    document.createElement("span");

    const rect =
    button.getBoundingClientRect();

    const size =
    Math.max(rect.width, rect.height);

    ripple.style.width =
    ripple.style.height =
    size + "px";

    ripple.style.left =
    e.clientX - rect.left - size / 2 + "px";

    ripple.style.top =
    e.clientY - rect.top - size / 2 + "px";

    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

  });

});

/* ==========================
   PROJECT CARD ANIMATION
========================== */

const cards =
document.querySelectorAll(".project-card");

cards.forEach(card => {

  card.addEventListener("mousemove",
  (e) => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateX =
    ((y - centerY) / centerY) * -4;

    const rotateY =
    ((x - centerX) / centerX) * 4;

    card.style.transform =
    `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-10px)
    `;

  });

  card.addEventListener("mouseleave",
  () => {

    card.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0)";

  });

});

/* ==========================
   SKILL CARD TILT EFFECT
========================== */

const skillCards =
document.querySelectorAll(".skill-card");

skillCards.forEach(card => {

  card.addEventListener("mousemove",
  (e) => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const rotateY =
    ((x / rect.width) - 0.5) * 10;

    const rotateX =
    ((y / rect.height) - 0.5) * -10;

    card.style.transform =
    `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-8px)
    `;

  });

  card.addEventListener("mouseleave",
  () => {

    card.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0)";

  });

});

/* ==========================
   HERO IMAGE PARALLAX
========================== */

const heroImage =
document.querySelector(".image-card");

document.addEventListener("mousemove",
(e) => {

  if (!heroImage) return;

  const x =
  (window.innerWidth / 2 - e.clientX) / 40;

  const y =
  (window.innerHeight / 2 - e.clientY) / 40;

  heroImage.style.transform =
  `translate(${x}px, ${y}px)`;

});

/* ==========================
   CONTACT FORM DEMO
========================== */

const form =
document.querySelector(".contact-form");

if (form) {

  form.addEventListener("submit",
  function(e){

    e.preventDefault();

    const button =
    form.querySelector("button");

    const original =
    button.textContent;

    button.textContent =
    "Sending...";

    setTimeout(() => {

      button.textContent =
      "Message Sent ✓";

      setTimeout(() => {

        button.textContent =
        original;

        form.reset();

      }, 2000);

    }, 1200);

  });

}

/* ==========================
   PAGE LOAD ANIMATION
========================== */

window.addEventListener("load", () => {

  document.body.style.opacity = "0";

  setTimeout(() => {

    document.body.style.transition =
    "opacity .8s ease";

    document.body.style.opacity = "1";

  }, 100);

});

/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener("click",
  function (e) {

    e.preventDefault();

    const target =
    document.querySelector(
      this.getAttribute("href")
    );

    if(target){

      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

    }

  });

});

/* ==========================
   CONSOLE SIGNATURE
========================== */

console.log(
"%cRidhuvarsini B Portfolio",
"color:#ff1e1e;font-size:18px;font-weight:bold;"
);

console.log(
"%cFrontend Developer | UI Enthusiast | Creative Problem Solver",
"color:white;font-size:12px;"
);