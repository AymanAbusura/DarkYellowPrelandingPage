document.addEventListener("DOMContentLoaded", function () {
    // Burger Menu Toggle
    var burgerMenu = document.getElementById("burger-menu");
    var overlay = document.getElementById("menu");
    var body = document.body;

    if (burgerMenu && overlay) {
        burgerMenu.addEventListener("click", function () {
            this.classList.toggle("close");
            overlay.classList.toggle("overlay");

            if (body.classList.contains("no-scroll")) {
                body.classList.remove("no-scroll");
            } else {
                body.classList.add("no-scroll");
            }
        });
    }

    // Step Card Hover Effect
    document.querySelectorAll(".step__card").forEach((card) => {
        const img = card.querySelector("img");
        const headerNumber = card.querySelector(".header__number");
        const textElements = card.querySelectorAll("h1, p");
        const stepNumber = card.querySelector(".step__number");
        const h1 = card.querySelector("h1");
        const button = card.querySelector(".block__description__btn.different.shown");

        if (img) {
            const originalSrc = img.src;
            const newSrc = "assets/steps.svg";

            card.addEventListener("mouseenter", function () {
                img.style.transition = "opacity 0.4s ease-in-out, transform 0.3s ease-in-out";
                img.style.opacity = "0";
                setTimeout(() => {
                    img.src = newSrc;
                    img.style.opacity = "1";
                    img.style.transform = "scale(1.05)";
                }, 200);

                headerNumber?.classList.add("activated");
                stepNumber?.classList.add("shown");
                h1.style.marginBottom = "10px";

                textElements.forEach((element) => {
                    element.classList.add("after_hovered");
                });

                if (button) {
                    button.classList.add("move-right");
                }
            });

            card.addEventListener("mouseleave", function () {
                img.style.transition = "opacity 0.4s ease-in-out, transform 0.3s ease-in-out";
                img.style.opacity = "0";
                setTimeout(() => {
                    img.src = originalSrc;
                    img.style.opacity = "1";
                    img.style.transform = "scale(1)";
                }, 200);

                headerNumber?.classList.remove("activated");
                stepNumber?.classList.remove("shown");
                h1.style.marginBottom = "";

                textElements.forEach((element) => {
                    element.classList.remove("after_hovered");
                });

                if (button) {
                    button.classList.remove("move-right");
                }
            });
        }
    });

    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const pagination = document.querySelector('.pagination');
    let currentIndex = 0;
    let slideInterval;

    function createPagination() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            pagination.appendChild(dot);
        });
    }

    function moveToSlide(index) {
        slides[currentIndex].classList.remove('active');
        pagination.children[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        pagination.children[currentIndex].classList.add('active');
        resetTimer();
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    }

    if (slides.length > 0) {
        createPagination();
        slideInterval = setInterval(nextSlide, 3000);
    }
});