const _themeSwitcher = document.querySelector(".theme-switcher");
const _day = _themeSwitcher.querySelector(".day");
const _night = _themeSwitcher.querySelector(".night");
const _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");

let theme = _contentSwitcher.classList.contains('theme_day') ? 'day' : 'night'

/*
const timeLine = {
    day: [
        {
            duration: 500,
            class: 'day_1'
        },
        {
            duration: 1000,
            class: 'day_2'
        },
        {
            duration: 1000,
            class: 'day_3'
        }
    ]
}

*/
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



const changeTheme = e => {
    if (theme === "night") {
        toDay();
        theme = 'day'
        console.log('to Day');
    } else {
        toNight();
        theme = 'night'
        console.log('to Night');
    }


}





_themeSwitcher.addEventListener('click', (e) => changeTheme(e));