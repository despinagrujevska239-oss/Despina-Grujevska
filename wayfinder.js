
/* =========================
   WAYFINDER - JAVASCRIPT
   ========================= */

// Wait until the HTML page is loaded
document.addEventListener("DOMContentLoaded", function () {

    // Search functionality
    const searchButton = document.querySelector(
        ".search-box button"
    );

    const searchInput = document.querySelector(
        ".search-box input"
    );

    const destinationCards = document.querySelectorAll(
        ".destination-card"
    );

    if (searchButton && searchInput) {

        function searchDestinations() {
            const searchText = searchInput.value
                .trim()
                .toLowerCase();

            let found = 0;

            destinationCards.forEach(function (card) {
                const cardText = card.textContent.toLowerCase();

                if (cardText.includes(searchText)) {
                    card.style.display = "";
                    found++;
                } else {
                    card.style.display = "none";
                }
            });

            if (searchText === "") {
                destinationCards.forEach(function (card) {
                    card.style.display = "";
                });
                return;
            }

            if (destinationCards.length > 0 && found === 0) {
                alert("No destinations found. Try another search.");
            }
        }

        searchButton.addEventListener(
            "click",
            searchDestinations
        );

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchDestinations();
            }
        });
    }

    // Destination card click
    destinationCards.forEach(function (card) {
        card.style.cursor = "pointer";

        card.addEventListener("click", function () {
            const title = card.querySelector("h3");

            if (title) {
                console.log(
                    "Selected destination: " +
                    title.textContent
                );
            }
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {
            link.addEventListener("click", function (event) {
                const targetId = link.getAttribute("href");

                if (targetId && targetId.length > 1) {
                    const target = document.querySelector(targetId);

                    if (target) {
                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            });
        }
    );

    // Contact form validation
    const contactForm = document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const requiredFields = contactForm.querySelectorAll(
                "input[required], textarea[required], select[required]"
            );

            let isValid = true;

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = "#e74c3c";
                } else {
                    field.style.borderColor = "#d6e0e7";
                }
            });

            if (!isValid) {
                event.preventDefault();
                alert("Please fill in all required fields.");
            }
        });
    }

});
