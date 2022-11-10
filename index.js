import { createThemeSwitcher } from './theme-switcher.js';


const starsBlinkingDuration = [0.9, 1.2, 1.4, 1.6, 1.8, 2.1]; //in sec
const clouds = [ //default styles for clouds
    {
        width: 30, //1 cloud, px
        gap: 15, //between clouds, px
        top: 0, //in percent of switcher height 
        speed: 7, //for 1 cycle, sec, less -> faster
        opacity: 1, //opacity
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
const starsBlinkingAnimation = `
    0% { opacity: .2 }
    50% { opacity: .8 }
    100% { opacity: .2 }
`



createThemeSwitcher({
    _themeSwitcher: '.theme-switcher', 
    star: './theme_nigth__star.svg', 
    cloud: './theme_day__cloud.svg', 
    width: 70, 
    height: 40, 
    circleSize: 14, 
    duration: 2000, 
    theme: 'day', 
    numberOfStars: 30,
    starsBlinkingDuration: starsBlinkingDuration, 
    clouds: clouds, 
    starsBlinkingAnimation: starsBlinkingAnimation,
});
