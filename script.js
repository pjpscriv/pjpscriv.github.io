const log = m => console.log(m);
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

const DARK_MODE_CLASS = 'dark-mode'
const GRADIENT_CLASSES = ['', 'blue-grad', 'green-yellow-grad', 'lime-grad', 'green-grad'];
// TODO: Add more gradient classes

/***************** First Load *****************/
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (userPrefersDark) {
    document.body.classList.add(DARK_MODE_CLASS)
}
const randomGradient = GRADIENT_CLASSES[Math.floor(Math.random() * GRADIENT_CLASSES.length)]
document.body.classList.add(randomGradient)

/***************** Click functionality *****************/
function addDarkModeToggle() {
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
    const links = $$('.navbar__link')
    links.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            const targetSelector = el.getAttribute('href');
            const target = $(targetSelector);
            target.scrollIntoView({ behavior: 'smooth' });

            const openNavbar = $('.navbar__links--open')
            if (openNavbar) {
                openNavbar.classList.remove('navbar__links--open')
            }
        })
    })
}

function toggleNavbarLinks() {
    const menuToggle = $('#menu-toggle')
    menuToggle.addEventListener('click', () => {
        const navbar = $('.navbar__links')
        navbar.classList.toggle('navbar__links--open')
    })
}

function main() {
    addDarkModeToggle();
    addSectionScrolls();
    toggleNavbarLinks();
}

window.onload = main()
