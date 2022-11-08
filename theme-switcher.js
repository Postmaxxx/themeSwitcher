const _themeSwitcher = document.querySelector(".theme-switcher");
const _day = _themeSwitcher.querySelector(".day");
const _night = _themeSwitcher.querySelector(".night");
const _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");

let theme = _contentSwitcher.classList.contains('theme_day') ? 'day' : 'night'
const themeSwitchSpeed = 2;

const toDay = () => {

    new Promise((resolve) => {
        setTimeout(() => {
            _contentSwitcher.classList.add('theme_day_1')
            resolve();
        }, 10);
    })
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_1')
                _contentSwitcher.classList.add('theme_day_2')
                resolve();
            }, 500);
    }))})
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_2')
                _contentSwitcher.classList.add('theme_day')
                resolve();
            }, 30);
    }))})

}



const toNight = () => {

    new Promise((resolve) => {
        setTimeout(() => {
            _contentSwitcher.classList.remove('theme_day')
            _contentSwitcher.classList.add('theme_day_back-1')
            resolve();
        }, 0);
    })
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_back-1')
                _contentSwitcher.classList.add('theme_day_back-2')
                resolve();
            }, 500);
    }))})
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_back-2')
                resolve();
            }, 30);
    }))})

}









const switcher = (classRemove, classAdd, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            classRemove ? _contentSwitcher.classList.remove(classRemove) : null;
            classAdd ? _contentSwitcher.classList.add(classAdd) : null
            resolve();
        }, delay);
    })
}



  
const changeTheme = e => {
    if (theme === "night") {
        switcher('', 'theme_day_1', 0)
        .then(() => switcher('theme_day_1', 'theme_day_2', 500))
        .then(() => switcher('theme_day_2', 'theme_day', 30))
        //toDay();
        theme = 'day'
    } else {
        switcher('theme_day', 'theme_day_back-1', 0)
        .then(() => switcher('theme_day_back-1', 'theme_day_back-2', 500))
        .then(() => switcher('theme_day_back-2', '', 30))
        //toNight();
        theme = 'night'
    }
}





_themeSwitcher.addEventListener('click', (e) => changeTheme(e));