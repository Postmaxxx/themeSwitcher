const _themeSwitcher = document.querySelector(".theme-switcher");
const _day = _themeSwitcher.querySelector(".day");
const _night = _themeSwitcher.querySelector(".night");
const _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");

let theme = _contentSwitcher.classList.contains('night') ? 'night' : 'day'


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


const toNigth = () => {

    
    new Promise((resolve) => {
        setTimeout(() => {
            _contentSwitcher.classList.add('day_1')
            resolve();
        }, 0);
    })
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('day_1')
                _contentSwitcher.classList.add('day_2')
                resolve();
            }, 500);
    }))})
    .then(() => {
        return(new Promise((resolve) => {
            setTimeout(() => {
                _contentSwitcher.classList.remove('day_2')
                _contentSwitcher.classList.add('day_3')
                resolve();
            }, 10);
    }))})


}


const changeTheme = e => {
    if (theme === "day") {
        toNigth();
    


/*
    classSwitcher(timeLine.day[0].duration, timeLine.day[0].class)
    .then(() => classSwitcher(timeLine.day[1].timeLine.day[1].class))
    .then(() => classSwitcher(timeLine.day[2].timeLine.day[2].class));
      
    function classSwitcher(delay, newClass) {
      return new Promise((resolve) => {
        setTimeout(() => {
            _contentSwitcher





          resolve();
        }, delay);
      });
    }
      */



    theme = 'night'
    } else {
        theme = 'day'
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