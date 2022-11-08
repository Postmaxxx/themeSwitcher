const _themeSwitcher = document.querySelector(".theme-switcher");
let _contentSwitcher;
let theme;

//let theme = _contentSwitcher.classList.contains('theme_day') ? 'day' : 'night'
//let theme = 'night'
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

  
const changeTheme = (duration, currentTheme) => {
    if (currentTheme === "night") {
        switcher('', 'theme_day_1', 0)
        .then(() => switcher('theme_day_1', 'theme_day_2', duration / 4))
        .then(() => switcher('theme_day_2', 'theme_day', 30))
        theme = 'day'
    } else {
        switcher('theme_day', 'theme_day_back_1', 0)
        .then(() => switcher('theme_day_back_1', 'theme_day_back_2', duration / 4))
        .then(() => switcher('theme_day_back_2', '', 30))
        theme = 'night'
    }
}





const createThemeSwitcherStyles = (width, height, circleSize, duration, pathDayImg, pathNightImg) => {
    let circlePosition = width / 2 - circleSize;

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleThemeSwitcher = styleEl.sheet;

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher {
            width: ${width}px;
            height: ${height}px;
            border-radius: ${height / 2}px;
            position: relative;
            overflow: hidden;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div {
            position: absolute;
            height: 100%;
            width: 100%;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.day {
            background-image: url('${pathDayImg}');
            background-size: contain;
            clip-path: circle(${circleSize}px at ${circlePosition}px 50%);
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.night {
            background-image: url('${pathNightImg}');
            background-size: contain;
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
        }`)



    //theme day_1
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_1 .day {
            transition: ${duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${width*10}px at ${circlePosition - width * 10 + circleSize}px 50%);
        }`)
       



    //theme day_2
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_2 .day {
            transition: ${duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${width*10}px at ${circlePosition - width * 10 + circleSize}px 50%);
        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_2 .night {
            transition: ${duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${width*10}px at ${circlePosition + width * 10 + circleSize}px 50%);
        }`)


    
    //theme day
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day .day {
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
            z-index: 900;
            clip-path: circle(${width*10}px at ${circleSize - width * 9}px 50%);
        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day .night {
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
            z-index: 1000;
            clip-path: circle(${circleSize}px at ${circlePosition + circleSize * 2}px 50%);
        }`)




    //theme day_back_1
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_1 .day {
            transition: 0ms;
            z-index: 900;
            clip-path: circle(${width*10}px at ${circleSize - width * 9}px 50%);

        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_1 .night {
            transition: ${duration/4}ms cubic-bezier(1,0,1,0);
            z-index: 1000;
            clip-path: circle(${width * 10}px at ${circlePosition + circleSize + width * 10}px 50%);
        }`)



    //theme day_back_2
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_2 .day {
            transition: 0ms;
            z-index: 1000;
            clip-path: circle(${width*10}px at ${circlePosition - width * 10 + circleSize}px 50%);
        }`)
        
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_2 .night {
            transition: 0ms;
            z-index: 900;
            clip-path: circle(${width * 10}px at ${circlePosition + circleSize + width * 10}px 50%);
        }`)
}

const createThemeSwitcherHtml = (currentTheme) => {
    document.querySelector('.theme-switcher').innerHTML = `
        <div class="content-switcher ${currentTheme !== 'night' ? 'theme_day' : null}">
            <div class="night"></div>
            <div class="day"></div>
        </div>
    `;
    _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");
}





//defaultTheme: 'night' -> night, other/undef -> day

export const createThemeSwitcher = (width, height, circleSize, duration, pathDayImg, pathNightImg, defaultTheme) => {
    theme = defaultTheme;
    new Promise((res, rej) => {
        createThemeSwitcherHtml(defaultTheme);
        createThemeSwitcherStyles(width, height, circleSize, duration, pathDayImg, pathNightImg);
        res()
    })
    .then(_themeSwitcher.addEventListener('click', () => changeTheme(duration, theme)))
}





