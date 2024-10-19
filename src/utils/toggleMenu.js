export const toggleMenu = (aside, main) => {
    // Show the menu
    const showMenu = () => {
        aside.classList.add('active')
        main.classList.add('mobile-open')
    }

    // Hide the menu
    const hideMenu = () => {
        aside.classList.remove('active')
        main.classList.remove('mobile-open')
    }

    // Add event listener to toggle menu
    document.querySelector('.js-probootstrap-toggle').addEventListener('click', (e) => { 
        showMenu() 
        console.log('show menu')
        e.preventDefault()
    })

    // Add event listener to close menu
    document.querySelector('.js-probootstrap-close-menu').addEventListener('click', (e) => { 
        hideMenu() 
        console.log('hide menu')
        e.preventDefault()
    })

    // Close menu when clicked outside
    const handleOutsideClick = (e) => {
        if (!aside.contains(e.target) && !e.target.closest('.js-probootstrap-toggle')) {
            hideMenu()
        }
    }

    document.addEventListener('mouseup', handleOutsideClick)

    // Clean up
    return () => {
        document.removeEventListener('mouseup', handleOutsideClick)
    }
}