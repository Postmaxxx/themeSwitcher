const _themeSwitcher = document.querySelector(".theme-switcher");
let _contentSwitcher;
let theme;


const themeClouds = [
    {
        width: 30,
        gap: 15,
        top: 0, //in percent
        speed: 7, //in sec for 1 cycle, less -> faster
        opacity: 1, //transparent
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

const starsBlinkingDuration = [0.9, 1.2, 1.4, 1.6, 1.8, 2.1];


const switcher = (classRemove, classAdd, delay) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            classRemove ? _contentSwitcher.classList.remove(classRemove) : null;
            classAdd ? _contentSwitcher.classList.add(classAdd) : null
            res();
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

    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher > div.night {
            transition: ${duration/4}ms cubic-bezier(0,1,0,1);
            background-color: #002E6E;
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


    // themes_night__star blinks
    starsBlinkingDuration.forEach((duration, index) => {
        styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .night .theme_night__star-${index} {
            animation: star-blink ${duration}s linear infinite;
        }`)
    })


    styleThemeSwitcher.insertRule(`
        @keyframes star-blink {
            0% { opacity: .2 }
            50% { opacity: .8 }
            100% { opacity: .2 }
        }`)


        
    // Clouds base
    styleThemeSwitcher.insertRule(`
        .theme-switcher > .content-switcher .day > div {
            display: inline-block;
            height: auto;
            position: absolute;
            left: 0;
        }`)

    // all lines of clouds  
    themeClouds.forEach((cloud, index) => {
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
            100% { transform: translateX(${-cloud.width - cloud.gap}px); }
        }`)
    })    
        
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
        .map(() => {
            let size = Math.floor(Math.random()*20 + 1);
            if (size > 13) { size = Math.floor(size / 3)};
            return {
                x: Math.floor(Math.random()*maxWidth),
                y: Math.floor(Math.random()*maxHeight),
                size: size,
                blinkDuration:  Math.floor(Math.random() * starsBlinkingDuration.length)
            }
        })
        .forEach((star) => {
            _themeSwitcher.querySelector('.content-switcher .night').innerHTML += `
                <img class="theme_night__star-${star.blinkDuration}" src="./theme_nigth__star.svg" style="position: absolute; left: ${star.x}px; top: ${star.y}px; width: ${star.size}px; aspect-ratio: 1">
            `;
        })
}


const createClouds = (maxWidth, maxHeight) => {
    const numberOfClouds = new Array(Math.ceil(maxWidth / (themeClouds[themeClouds.length - 1].width + themeClouds[themeClouds.length - 1].gap) + 2)).fill(''); //number of clouds in a raw, depends on the cloud size and gap
    themeClouds.forEach((cloud, index) => {
        _themeSwitcher.querySelector('.content-switcher .day').innerHTML += `
        <div class="clouds-${index}">
            ${numberOfClouds.map(() => {
                return `<img class="cloud" src="./cloud-3.svg" >`
            }).join('')}
        </div>
        `
    })
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





