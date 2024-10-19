import 'waypoints/lib/noframework.waypoints'

export const animateOnScroll = () => {
    let i = 0;

    // Select all elements with the class 'probootstrap-animate'
    const animateElements = document.querySelectorAll('.probootstrap-animate');

    animateElements.forEach((element) => {
        new Waypoint({
            element: element,
            handler: function (direction) {
                if (direction === 'down' && !element.classList.contains('probootstrap-animated')) {
                    i++;
                    element.classList.add('item-animate');

                    setTimeout(() => {
                        animateElements.forEach((el, k) => {
                            if (el.classList.contains('item-animate')) {
                                setTimeout(() => {
                                    const effect = el.getAttribute('data-animate-effect');
                                    if (effect === 'fadeIn') {
                                        el.classList.add('fadeIn', 'probootstrap-animated');
                                    } else if (effect === 'fadeInLeft') {
                                        el.classList.add('fadeInLeft', 'probootstrap-animated');
                                    } else if (effect === 'fadeInRight') {
                                        el.classList.add('fadeInRight', 'probootstrap-animated');
                                    } else {
                                        el.classList.add('fadeInUp', 'probootstrap-animated');
                                    }
                                    el.classList.remove('item-animate');
                                }, k * 50);
                            }
                        });
                    }, 100);
                }
            },
            offset: '95%',
        });
    });
}