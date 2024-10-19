export const carousel = () => {
    const carouselElements = document.querySelectorAll('.owl-carousel')

    if (carouselElements.length) {
        carouselElements.forEach(carousel => {
            // Initialize the carousel
            $(carousel).owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                stagePadding: 5,
                navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
        })
    }
}