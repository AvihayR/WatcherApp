import { Home } from './cmps/home.jsx'
import { AnimalList } from './cmps/animal-list.jsx'
import { SeasonClock } from './cmps/season-clock.jsx'
import { CountDown } from './cmps/count-down.jsx'
import { watcherService } from './services/watcher.service.js'
import { WatcherApp } from './cmps/watcher-app.jsx'
import { Mouser } from './cmps/mouser.jsx'
const { useState } = React

const animals = [
    { type: 'Malayan Tiger', count: 787 },
    { type: 'Mountain Gorilla', count: 212 },
    { type: 'Fin Whale', count: 28 },
]
const watcherList = watcherService.query()


export function App() {
    const [compToRender, setCompToRender] = useState('watcher')

    function chooseComp(ev) {
        ev.preventDefault()
        const compName = ev.target.innerText.toLowerCase()
        setCompToRender(compName)
    }

    return (<section className="app">
        <header className="app-header">
            <h1>My App</h1>
            <ul>
                <li>
                    <a href="" onClick={() => { chooseComp(event) }}>Watcher</a>
                </li>
                <li>
                    <a href="" onClick={() => { chooseComp(event) }}>Mouser</a>
                </li>
                <li>
                    <a href="" onClick={() => { chooseComp(event) }}>Season clock</a>
                </li>
                <li>
                    <a href="" onClick={() => { chooseComp(event) }}>Timer</a>
                </li>
                <li>
                    <a href="" onClick={() => { chooseComp(event) }}>Animal list</a>
                </li>
            </ul>
        </header>
        <main className="container">
            {/* <Home /> */}
            {compToRender === 'animal list' && <AnimalList animalInfos={animals} />}
            {compToRender === 'season clock' && <SeasonClock />}
            {compToRender === 'timer' && <CountDown startFrom={10} onDone={() => console.log('Done!')} />}
            {compToRender === 'watcher' && < WatcherApp watcherList={watcherList} />}
            {compToRender === 'mouser' && <Mouser />}
        </main>
    </section>)
}