const DARK_MODE_CLASS = 'dark-mode'

// Get user's preferred color scheme - Run ASAP to prevent flicker
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (userPrefersDark) {
    document.body.classList.add(DARK_MODE_CLASS)
}

function addDarkModeToggle() {
    // Get container
    const container = document.body

    const switcher = document.getElementById('dark-mode-toggle')
    switcher.addEventListener('click', () => {
        if (container.classList.contains(DARK_MODE_CLASS)) {
            container.classList.remove(DARK_MODE_CLASS)
        } else {
            container.classList.add(DARK_MODE_CLASS)
        }
    })
}

function addSectionScrolls() {
    const links = document.querySelectorAll('.navbar__link')

    links.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            const targetSelector = el.getAttribute('href');
            const target = document.querySelector(targetSelector);
            target.scrollIntoView({ behavior: 'smooth' });
        })
    })
}

function main() {
    addDarkModeToggle();
    addSectionScrolls();
}

window.onload = main()
