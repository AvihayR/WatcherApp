import { utilService } from '../services/util.service.js'
const { useState } = React

export function SeasonClock() {
    const [isDarkMode, setIsDarkMode] = useState(false)



    const currMonth = utilService.getMonthName(new Date)
    const currSeason = utilService.getSeason(currMonth)
    const currDay = utilService.getDayName(Date.now(), 'en')

    return (
        <article className={`season-card ${isDarkMode ? 'dark' : 'light'}`} onClick={() => { setIsDarkMode(!isDarkMode) }}>
            <h2>{currMonth}, {currSeason}.</h2>
            <img src={`assets/seasons/${currSeason}.png`} alt="Current season img" />
            <p>{currDay}</p>
        </article>
    )
}