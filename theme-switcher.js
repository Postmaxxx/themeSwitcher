const _themeSwitcher = document.querySelector(".theme-switcher");
const _day = _themeSwitcher.querySelector(".day");
const _night = _themeSwitcher.querySelector(".night");
const _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");

let theme = _contentSwitcher.classList.contains('theme_day') ? 'day' : 'night'
//const themeSwitchSpeed = 2000;



const switcher = (classRemove, classAdd, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            classRemove ? _contentSwitcher.classList.remove(classRemove) : null;
            classAdd ? _contentSwitcher.classList.add(classAdd) : null
            resolve();
        }, delay);
    })
}

  
const changeTheme = (themeSwitchSpeed) => {
    if (theme === "night") {
        switcher('', 'theme_day_1', 0)
        .then(() => switcher('theme_day_1', 'theme_day_2', themeSwitchSpeed / 4))
        .then(() => switcher('theme_day_2', 'theme_day', 30))
        theme = 'day'
    } else {
        switcher('theme_day', 'theme_day_back-1', 0)
        .then(() => switcher('theme_day_back-1', 'theme_day_back-2', themeSwitchSpeed / 4))
        .then(() => switcher('theme_day_back-2', '', 30))
        theme = 'night'
    }
}

const createThemeSwitcher = (width, height, circleSize, duration) => {

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleThemeSwitcher = styleEl.sheet;

    styleThemeSwitcher.insertRule(`
    .content-switcher{
        width: ${width}px;
        height: ${height}px;
        border-radius: ${height / 2}px;
        position: relative;
        overflow: hidden;
    }
    `)
}


createThemeSwitcher(100, 50, 18, 2000);

_themeSwitcher.addEventListener('click', () => changeTheme(2000));