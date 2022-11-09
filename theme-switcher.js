const _themeSwitcher = document.querySelector(".theme-switcher");
let _contentSwitcher;
let theme;


const themeClouds = {
    big: {
        width: 30,
        gap: 15,
        top: 0, //in percent
        speed: 7, //in sec for 1 cycle, less -> faster
        opacity: 1, //transparent
    },
    med: {
        width: 25,
        gap: 20,
        top: 25,
        speed: 4,
        opacity: 0.8,
    },
    small: {
        width: 20,
        gap: 20,
        top: 40,
        speed: 5,
        opacity: 0.6,
    },
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


const createThemeSwitcherStyles = (width, height, circleSize, duration) => {
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
            cursor: pointer;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div {
            position: absolute;
            height: 100%;
            width: 100%;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.day {
            background-color: rgb(100 181 245);
            clip-path: circle(${circleSize}px at ${circlePosition}px 50%);
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
        }`)
        //background-image: url('${pathDayImg}'); #ADD5F5;
        //background-size: contain;

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.night {
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
            background-color: #002E6E;
        }`)
        //background-image: url('${pathNightImg}');
        //background-size: contain;
        


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


    // theme_night__star blinks
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-1 {
            animation: star-blink .9s linear infinite;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-2 {
            animation: star-blink 1.2s linear infinite;
        }`)


    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-3 {
            animation: star-blink 1.4s linear infinite;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-4 {
            animation: star-blink 1.6s linear infinite;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-5 {
            animation: star-blink 1.8s linear infinite;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-6 {
            animation: star-blink 2.1s linear infinite;
        }`)


    styleThemeSwitcher.insertRule(`
        @keyframes star-blink {
            0% { 
                opacity: .2 
            }
            50% { 
                opacity: .8
            }
            100% { 
                opacity: .2
            }
        }`)




        
    // Clouds top
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day > div {
            display: inline-block;
            height: auto;
            position: absolute;
            left: 0;
        }`)

        //Cloud big
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-big {
            width: ${(themeClouds.big.width * 6 + themeClouds.big.gap * 5)}px;
            top: ${themeClouds.big.top}%;
            animation: theme-clouds_big  linear infinite;
            animation-duration: ${themeClouds.big.speed}s;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-big .cloud {
            width: ${themeClouds.big.width}px;
            margin-right: ${themeClouds.big.gap}px;
            opacity: ${themeClouds.big.opacity};
        }`)

        //Cloud med
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-med {
            width: ${(themeClouds.med.width * 6 + themeClouds.med.gap * 5)}px;
            top: ${themeClouds.med.top}%;
            animation: theme-clouds_med linear infinite;
            animation-duration: ${themeClouds.med.speed}s;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-med .cloud {
            width: ${themeClouds.med.width}px;
            margin-right: ${themeClouds.med.gap}px;
            opacity: ${themeClouds.med.opacity};
        }`)

        //Cloud small
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-small {
            width: ${(themeClouds.small.width * 6 + themeClouds.small.gap * 5)}px;
            top: ${themeClouds.small.top}%;
            animation: theme-clouds_small linear infinite;
            animation-duration: ${themeClouds.small.speed}s;
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-small .cloud {
            width: ${themeClouds.small.width}px;
            margin-right: ${themeClouds.small.gap}px;
            opacity: ${themeClouds.small.opacity};
        }`)


        
        //animation big
    styleThemeSwitcher.insertRule(`
        @keyframes theme-clouds_big {
            0% { transform: translateX(0); }
            100% { transform: translateX(${-themeClouds.big.width - themeClouds.big.gap - 4}px); }
        }`)
        //animation med
    styleThemeSwitcher.insertRule(`
        @keyframes theme-clouds_med {
            0% { transform: translateX(0); }
            100% { transform: translateX(${-themeClouds.med.width - themeClouds.med.gap -4}px); }
        }`)
        //animation small
    styleThemeSwitcher.insertRule(`
        @keyframes theme-clouds_small {
            0% { transform: translateX(0); }
            100% { transform: translateX(${-themeClouds.small.width - themeClouds.small.gap - 4}px); }
        }`)


        
}



const createThemeSwitcherHtml = (currentTheme) => {
    document.querySelector('.theme-switcher').innerHTML = `
        <div class="content-switcher ${currentTheme !== 'night' ? 'theme_day' : ''}">
            <div class="night"></div>
            <div class="day"></div>
        </div>
    `;
    _contentSwitcher = _themeSwitcher.querySelector(".content-switcher");
}



const createStars = (maxWidth, maxHeight, numberOfStars) => {
    new Array(numberOfStars)
        .fill('')
        .map((star) => {
            let size = Math.floor(Math.random()*20+ 1);
            if (size > 13) { size = Math.floor(size / 3)};
            return {
                x: Math.floor(Math.random()*maxWidth),
                y: Math.floor(Math.random()*maxHeight),
                size: size,
                blinkTemp:  Math.floor(Math.random()*6 + 1)
            }
        })
        .forEach((star) => {
            _themeSwitcher.querySelector('.content-switcher .night').innerHTML += `
                <img class="theme_night__star-${star.blinkTemp}" src="./theme_nigth__star.svg" style="position: absolute; left: ${star.x}px; top: ${star.y}px; width: ${star.size}px; aspect-ratio: 1">
            `;
        })
}


const createClouds = (maxWidth, maxHeight) => {
    _themeSwitcher.querySelector('.content-switcher .day').innerHTML += `
    <div class="clouds-big">
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
    </div>
    <div class="clouds-med">
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
    </div>
    <div class="clouds-small">
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
        <img class="cloud" src="./cloud-3.svg" >
    </div>
    `
}


//defaultTheme: 'night' -> night, other/undef -> day

export const createThemeSwitcher = (width, height, circleSize, duration, defaultTheme) => {
    theme = defaultTheme;
    new Promise((res, rej) => {
        createThemeSwitcherHtml(defaultTheme);
        createThemeSwitcherStyles(width, height, circleSize, duration);
        createStars(width, height, 30);
        createClouds(width, height);
        res()
    })
    .then(_themeSwitcher.addEventListener('click', () => changeTheme(duration, theme)))
}





