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
    const saveData = {
      darkMode: !darkModeActive,
      savedAt: Math.floor(Date.now() / 1000)
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
  })
}


window.onload = addDarkModeToggle()
