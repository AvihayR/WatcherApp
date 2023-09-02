import { watcherService } from '../services/watcher.service.js'
const { useState, useEffect, useRef } = React

export function WatcherApp({ watcherList }) {
    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState({})

    useEffect(() => {
        watcherList.then(res => setWatchers(res))
    }, [])

    // console.log(watchers.map(w => w))
    // console.log(selectedWatcher)

    function onSelectWatcher(watcherId) {
        watcherService.get(watcherId)
            .then(setSelectedWatcher)
    }

    function onDeleteWatcher(watcherId) {
        watcherService.remove(watcherId)
            .then(res => watcherService.query().then(setWatchers))
    }

    function createNewWatcher() {
        const fullName = prompt('Please enter the full name of the new user: ')
        const newWatcher = watcherService.getEmptyWatcher(fullName)

        watcherService.save(newWatcher)
            .then(res => watcherService.query().then(setWatchers))
    }

    function onClosePreviewModal() {
        setSelectedWatcher('')
    }

    function renderPreviewModal() {
        const { fullName: name, imgUrl, movies } = selectedWatcher

        return (
            <div className="modal">
                <button className='close' onClick={() => { onClosePreviewModal() }}>X</button>
                <h2>{name}</h2>
                <img src={`../assets/watchers/${imgUrl}`} alt="Profile img" />
                <h3 className='fav-movies'>Favorite Movies:</h3>
                <ul>
                    {(!movies.length) ? <span>No favorite movies yet</span> : movies.map(movie => <li key={movie + 'movie'}>{movie}</li>)}
                </ul>
            </div>
        )
    }

    function renderWatcher(watcher) {
        const { fullName: name, imgUrl, id, movies } = watcher
        return (
            <article key={watcher.id} className="card">
                <h2>{name}</h2>
                <img src={`assets/watchers/${imgUrl}`} alt="Profile img" />
                <br />
                <button className='remove-watcher' onClick={() => { onDeleteWatcher(watcher.id) }}></button>
                <button className='select-watcher' onClick={() => { onSelectWatcher(watcher.id) }}>Select</button>
            </article>
        )
    }

    return (
        <section className='watcher-app'>
            <h2 className='title'>Tenflix</h2>
            <button className='add-watcher' onClick={createNewWatcher}>Add Watcher</button>
            <section className="cards-container">
                {watchers.map(watcher => renderWatcher(watcher))}
            </section>
            {(!selectedWatcher.id) ? '' : renderPreviewModal()}
        </section>
    )
}