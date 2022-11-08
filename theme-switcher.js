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
                //_contentSwitcher.classList.remove('theme_day_1')
                _contentSwitcher.classList.add('theme_day_2')
                resolve();
            }, 500);
    }))})
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                //_contentSwitcher.classList.remove('theme_day_2')
                _contentSwitcher.classList.add('theme_day')
                resolve();
            }, 30);
    }))})

}



const toNight = () => {

    new Promise((resolve) => {
        setTimeout(() => {
            _contentSwitcher.classList.remove('theme_day')
            _contentSwitcher.classList.add('theme_day_2')
            resolve();
        }, 0);
    })
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_2')
                _contentSwitcher.classList.add('theme_day_1')
                resolve();
            }, 2000);
    }))})
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('theme_day_1')
                resolve();
            }, 2000);
    }))})

}



const changeTheme = e => {
    if (theme === "night") {
        toDay();
        theme = 'day'
        console.log('to Day');
    } else {
        //toNight();
        theme = 'night'
        console.log('to Night');
    }


}



/*const changeTheme = e => {
    if (theme === 'day') {
        theme = 'night'
        _day.classList.remove("selected");
        _night.classList.add("selected");
    } else {
        theme = 'day'
        _day.classList.add("selected_1");
        _night.classList.remove("selected");
        setTimeout(() => {
            _day.classList.remove("selected_1");
            _day.classList.add("selected_2");

            setTimeout(() => {
                _day.classList.remove("selected_2");
                _day.classList.add("selected");
                console.log('3');
            }, 1000);

        }, 1000);
    }
    console.log(theme);
}
*/


_themeSwitcher.addEventListener('click', (e) => changeTheme(e));