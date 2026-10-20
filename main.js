```javascript
// ========================================
// DESPINA GRUJEVSKA - PORTFOLIO
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    // Navigation links
    const navLinks = document.querySelectorAll(
        'nav a, header a, .navbar a'
    );

    // Smooth scrolling for links pointing to sections
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Active navigation link
    function updateActiveLink() {
        const currentHash = window.location.hash;

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
                link.classList.toggle(
                    "active",
                    href === currentHash
                );
            }
        });
    }

    window.addEventListener("hashchange", updateActiveLink);

    // Project cards: keyboard accessibility
    const projectCards = document.querySelectorAll(
        ".project-card, .project, .portfolio-item"
    );

    projectCards.forEach((card) => {
        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" &&
                card.getAttribute("role") === "link"
            ) {
                card.click();
            }
        });
    });

    // Email links
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        link.setAttribute("aria-label", "Send an email");
    });

    // Footer year
    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // Reveal elements when they enter the screen
    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    console.log("Despina Grujevska portfolio is ready!");
});
```