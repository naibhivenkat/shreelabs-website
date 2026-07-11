/*
==========================================
All Local WEBSITE
Main JavaScript
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSmoothScroll();

    initializeScrollReveal();

    initializeHeaderEffect();

    initializeCounterAnimation();

    initializeContactForm();

});


/*
==========================================
Sticky Header
==========================================
*/

function initializeHeaderEffect() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


/*
==========================================
Smooth Scroll
==========================================
*/

function initializeSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}


/*
==========================================
Scroll Reveal
==========================================
*/

function initializeScrollReveal() {

    const elements = document.querySelectorAll(

        ".card, .workflow-card, .stat-card, .hero-left, .hero-right"

    );

    elements.forEach(el => {

        el.classList.add("reveal");

    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach(el => observer.observe(el));

}


/*
==========================================
Statistics Counter
==========================================
*/

function initializeCounterAnimation() {

    const stats = document.querySelectorAll(".stat-card h2");

    if (stats.length === 0) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    });

    stats.forEach(stat => observer.observe(stat));

}


function animateCounter(element) {

    const text = element.innerText;

    const number = parseFloat(text);

    if (isNaN(number)) return;

    const suffix = text.replace(/[0-9.]/g, "");

    let current = 0;

    const increment = number / 80;

    const timer = setInterval(() => {

        current += increment;

        if (current >= number) {

            current = number;

            clearInterval(timer);

        }

        if (number % 1 === 0) {

            element.innerText =
                Math.floor(current) + suffix;

        } else {

            element.innerText =
                current.toFixed(1) + suffix;

        }

    }, 20);

}


/*
==========================================
Contact Form
==========================================
*/


function initializeContactForm() {
    console.log("EmailJS function loaded");

    emailjs.init("W584rcIlcEPeP4OjS");

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_alllocal",
            "template_contact",
            form
        )
            .then(() => {

                alert("Message sent successfully!");

                form.reset();

            })
            .catch((error) => {

                console.error(error);

                alert("Failed to send message.");

            });

    });

}