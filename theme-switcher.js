const theme_state__default = {
    width: 70,
    height: 40,
    circleSize: 14,
    duration: 2000,
    theme: 'day',
    numberOfStars: 30,
    starsBlinkingDuration: [0.9, 1.2, 1.4, 1.6, 1.8, 2.1], //default durations
    starsBlinkingAnimation: `
        0% { opacity: .2 }
        50% { opacity: .8 }
        100% { opacity: .2 }`,
    clouds: [ //default styles for clouds
        {
            width: 30, //px
            gap: 15, //px
            top: 0, //in percent of height
            speed: 7, //sec for 1 cycle, less -> faster
            opacity: 1, //transparent for line
        },
        {
            width: 25,
            gap: 20,
            top: 25,
            speed: 4,
            opacity: 0.85,
        },
        {
            width: 20,
            gap: 20,
            top: 40,
            speed: 5,
            opacity: 0.7,
        },
    ]
}




let theme_state = {
    _themeSwitcher: '',
    _contentSwitcher: '',
    star: '',
    cloud: '',
    width: theme_state__default.width,
    height: theme_state__default.height,
    circleSize: theme_state__default.circleSize,
    duration: theme_state__default.duration,
    theme: theme_state__default.theme,
    numberOfStars: theme_state__default.numberOfStars,
    starsBlinkingDuration: theme_state__default.starsBlinkingDuration, //default durations
    clouds: theme_state__default.clouds,
    starsBlinkingAnimation: theme_state__default.starsBlinkingAnimation,
    isChanging: false,
}
 


const switcher = (classRemove, classAdd, delay) => { //class +/- for _contentSwitcher using delay
    return new Promise((res, rej) => {
        setTimeout(() => {
            classRemove ? theme_state._contentSwitcher.classList.remove(classRemove) : null;
            classAdd ? theme_state._contentSwitcher.classList.add(classAdd) : null
            res();
        }, delay);
    })
}

  
const changeTheme = () => { //main switcher
    if (theme_state.isChanging) { return };
    theme_state.isChanging = true;
    if (theme_state.theme === "night") {
        switcher('', 'theme_day_1', 0)
        .then(() => switcher('theme_day_1', 'theme_day_2', theme_state.duration / 4))
        .then(() => {switcher('theme_day_2', 'theme_day', 30); theme_state.isChanging = false;})
        theme_state.theme = 'day';
    } else {
        switcher('theme_day', 'theme_day_back_1', 0)
        .then(() => switcher('theme_day_back_1', 'theme_day_back_2', theme_state.duration / 4))
        .then(() => {switcher('theme_day_back_2', '', 30); theme_state.isChanging = false;})
        theme_state.theme = 'night';
    }
}


const createThemeSwitcherStyles = () => {
    let circlePosition = theme_state.width / 2 - theme_state.circleSize; //circles must contact each other

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const styleThemeSwitcher = styleEl.sheet;

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher {
            width: ${theme_state.width}px;
            height: ${theme_state.height}px;
            border-radius: ${theme_state.height / 2}px;
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
            clip-path: circle(${theme_state.circleSize}px at ${circlePosition}px 50%);
            transition: ${theme_state.duration/4}ms cubic-bezier(0,1,0,1);
        }`)

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.night {
            transition: ${theme_state.duration/4}ms cubic-bezier(0,1,0,1);
            background-color: #002E6E;
        }`)


    //theme day_1
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_1 .day {
            transition: ${theme_state.duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${theme_state.width*10}px at ${circlePosition - theme_state.width * 10 + theme_state.circleSize}px 50%);
        }`)
       

    //theme day_2
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_2 .day {
            transition: ${theme_state.duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${theme_state.width*10}px at ${circlePosition - theme_state.width * 10 + theme_state.circleSize}px 50%);
        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_2 .night {
            transition: ${theme_state.duration/4}ms cubic-bezier(1,0,1,0);
            clip-path: circle(${theme_state.width*10}px at ${circlePosition + theme_state.width * 10 + theme_state.circleSize}px 50%);
        }`)

    
    //theme day
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day .day {
            transition: ${theme_state.duration/4}ms cubic-bezier(0,1,0,1);
            z-index: 900;
            clip-path: circle(${theme_state.width*10}px at ${theme_state.circleSize - theme_state.width * 9}px 50%);
        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day .night {
            transition: ${theme_state.duration/4}ms cubic-bezier(0,1,0,1);
            z-index: 1000;
            clip-path: circle(${theme_state.circleSize}px at ${circlePosition + theme_state.circleSize * 2}px 50%);
        }`)


    //theme day_back_1
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_1 .day {
            transition: 0ms;
            z-index: 900;
            clip-path: circle(${theme_state.width*10}px at ${theme_state.circleSize - theme_state.width * 9}px 50%);

        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_1 .night {
            transition: ${theme_state.duration/4}ms cubic-bezier(1,0,1,0);
            z-index: 1000;
            clip-path: circle(${theme_state.width * 10}px at ${circlePosition + theme_state.circleSize + theme_state.width * 10}px 50%);
        }`)


    //theme day_back_2
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_2 .day {
            transition: 0ms;
            z-index: 1000;
            clip-path: circle(${theme_state.width*10}px at ${circlePosition - theme_state.width * 10 + theme_state.circleSize}px 50%);
        }`)
        
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher.theme_day_back_2 .night {
            transition: 0ms;
            z-index: 900;
            clip-path: circle(${theme_state.width * 10}px at ${circlePosition + theme_state.circleSize + theme_state.width * 10}px 50%);
        }`)


    // themes_night__star blinks
    theme_state.starsBlinkingDuration.forEach((duration, index) => {
        styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-${index} {
            animation: star-blink ${duration}s linear infinite;
        }`)
    })


    //star blinking animation
    styleThemeSwitcher.insertRule(`
        @keyframes star-blink {
            ${theme_state.starsBlinkingAnimation}
        }`)

        
    // Clouds base
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day > div {
            display: inline-block;
            height: auto;
            position: absolute;
            left: 0;
        }`)

    // all lines of clouds (line, cloud, animation)
    theme_state.clouds.forEach((cloud, index) => {
        styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-${index} {
            width: ${(cloud.width * 6 + cloud.gap * 5)}px;
            top: ${cloud.top}%;
            animation: theme-clouds-${index}  linear infinite;
            animation-duration: ${cloud.speed}s;
        }`)
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day .clouds-${index} .cloud {
            width: ${cloud.width}px;
            margin-right: ${cloud.gap}px;
            opacity: ${cloud.opacity};
        }`) 
    styleThemeSwitcher.insertRule(`
        @keyframes theme-clouds-${index} {
            0% { transform: translateX(0); }
            100% { transform: translateX(${-(cloud.width + cloud.gap)}px); }
        }`)
    })    
}


const createThemeSwitcherHtml = (currentTheme) => {
    document.querySelector('.theme-switcher').innerHTML = `
        <div class="content-switcher ${currentTheme !== 'night' ? 'theme_day' : ''}">
            <div class="night"></div>
            <div class="day"></div>
        </div>`;
    theme_state._contentSwitcher = theme_state._themeSwitcher.querySelector(".content-switcher");
}



const createStars = () => {
    new Array(theme_state.numberOfStars)
        .fill('')
        .map(() => {
            let size = Math.floor(Math.random()*20 + 1);
            size = size > 13 ? Math.floor(size / 3) : size; //to create more small stars than big
            return {
                x: Math.floor(Math.random() * theme_state.width),
                y: Math.floor(Math.random() * theme_state.height),
                size: size,
                blinkDuration:  Math.floor(Math.random() * theme_state.starsBlinkingDuration.length) //different duration of blinking
            }
        })
        .forEach((star) => {
            theme_state._themeSwitcher.querySelector('.content-switcher .night').innerHTML += `
                <img class="theme_night__star-${star.blinkDuration}" src="${theme_state.star}" style="position: absolute; left: ${star.x}px; top: ${star.y}px; width: ${star.size}px; aspect-ratio: 1">
            `;
        })
}


const createClouds = () => {
    const numberOfClouds = new Array(Math.ceil(theme_state.width / (theme_state.clouds[theme_state.clouds.length - 1].width + theme_state.clouds[theme_state.clouds.length - 1].gap) + 2)).fill(''); //number of clouds in a cloud-raw, depends on the cloud size and gap between clouds + some reserve
    theme_state.clouds.forEach((cloud, index) => {
        theme_state._themeSwitcher.querySelector('.content-switcher .day').innerHTML += `
        <div class="clouds-${index}">
            ${numberOfClouds.map(() => {
                return `<img class="cloud" src="${theme_state.cloud}" >`
            }).join('')}
        </div>
        `
    })
}


export const createThemeSwitcher = (props) => {
    theme_state._themeSwitcher = document.querySelector(props._themeSwitcher);
    theme_state.star = props.star;
    theme_state.cloud = props.cloud;
    theme_state.width = props.width ? props.width : theme_state__default.width;
    theme_state.height = props.height ? props.height : theme_state__default.height;
    theme_state.circleSize = props.circleSize ? props.circleSize : theme_state__default.circleSize;
    theme_state.duration = props.duration ? props.duration : theme_state__default.duration;
    theme_state.theme = props.theme ? props.theme : theme_state__default.theme;
    theme_state.numberOfStars = props.numberOfStars ? props.numberOfStars : theme_state__default.numberOfStars;
    theme_state.starsBlinkingDuration = props.starsBlinkingDuration ? props.starsBlinkingDuration : theme_state__default.starsBlinkingDuration;
    theme_state.clouds = props.clouds ? props.clouds : theme_state__default.clouds;
    theme_state.starsBlinkingAnimation = props.starsBlinkingAnimation ? props.starsBlinkingAnimation : theme_state__default.starsBlinkingAnimation;

    new Promise((res, rej) => {
        createThemeSwitcherHtml();
        createThemeSwitcherStyles();
        createStars();
        createClouds();
        res()
    })
    .then(theme_state._themeSwitcher.addEventListener('click', () => changeTheme()))
}