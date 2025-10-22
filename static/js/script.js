const log = m => console.log(m);
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

// Variables defined in dark-mode-detector.html
//    DARK_MODE_CLASS, LIGHT_MODE_CLASS, LOCAL_STORAGE_KEY, darkModeEnabled
const GRADIENT_CLASSES = ['', 'blue-grad', 'green-yellow-grad', 'lime-grad', 'green-grad'];
// TODO: Add more gradient classes

/***************** First Load *****************/
const randomGradient = GRADIENT_CLASSES[Math.floor(Math.random() * (GRADIENT_CLASSES.length))]
if(!!randomGradient) {
  document.body.classList.add(randomGradient)
}
setSyntaxHighlightingTheme(darkModeEnabled)

/***************** Click functionality *****************/
function addDarkModeToggle() {
  const container = document.body
  const switcher = document.getElementById('dark-mode-toggle')
  switcher.addEventListener('click', () => {
    const darkModeActive = container.classList.contains(DARK_MODE_CLASS)
    if (darkModeActive) {
      container.classList.remove(DARK_MODE_CLASS)
    } else {
      container.classList.add(DARK_MODE_CLASS)
    }
    setSyntaxHighlightingTheme(!darkModeActive)
    const saveData = {
      darkMode: !darkModeActive,
      savedAt: Math.floor(Date.now() / 1000)
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
  })
}

/* *
function addSectionScrolls() {
  const links = $$('.header__links a')
  links.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      const targetSelector = el.getAttribute('href');
      const target = $(targetSelector);
      target.scrollIntoView({ behavior: 'smooth' });
      
      const openNavbar = $('.header__links--open')
      if (openNavbar) {
        openNavbar.classList.remove('header__links--open')
      }
    })
  })
}
/* */

/* *
function toggleNavbarLinks() {
  const menuToggle = $('#menu-toggle')
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const navbar = $('.header__links')
    const languages = $('.header__languages')
    languages.classList.remove('header__languages--open')
    navbar.classList.toggle('header__links--open')
  })
}
/* */

function toggleNavbarLanguages() {
  const languageToggle = $('#language-toggle')
  languageToggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const languages = $('.header__languages')
    languages.classList.toggle('header__languages--open')
  })
}

function closeNavbarsOnClickOutside() {
  document.addEventListener('click', (event) => {
    const languages = $('.header__languages')
    if (!languages.contains(event.target)) {
      languages.classList.remove('header__languages--open')
    }
  })
}

function getStyleSheet(filename) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i];
    if (sheet.href && sheet.href.includes(filename)) {
      return sheet;
    }
  }
  return null;
}

function setSyntaxHighlightingTheme(isDark) {
  lightSheet = getStyleSheet('syntax-light.css');
  darkSheet = getStyleSheet('syntax-dark.css');
  lightSheet.disabled = isDark;
  darkSheet.disabled = !isDark;
}    

function main() {
  addDarkModeToggle();
  toggleNavbarLanguages();
  closeNavbarsOnClickOutside();
}

window.onload = main()
