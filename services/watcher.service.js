import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

// var gFilterBy = {txt: '', minSpeed: 0}
const WATCH_KEY = 'watcherDB'
_createWatchers()


export const watcherService = {
    query,
    get,
    remove,
    save,
    getEmptyWatcher,
    getNextWatcherId,
    getFilterBy,
    createWatcher
    // setFilterBy
}

function query() {
    return storageService.query(WATCH_KEY)
}

function get(watcherId) {
    return storageService.get(WATCH_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(WATCH_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCH_KEY, watcher)
    } else {
        return storageService.post(WATCH_KEY, watcher)
    }
}

function getEmptyWatcher(fullName = '', imgUrl = 'netflix-2.png', movies = []) {
    return { id: '', fullName, imgUrl, movies }
}

function getFilterBy() {
    return { ...gFilterBy }
}

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

function getNextWatcherId(watcherId) {
    return storageService.query(WATCH_KEY)
        .then(watchers => {
            var idx = watchers.findIndex(watcher => watcher.id === watcherId)
            if (idx === watchers.length - 1) idx = -1
            return watchers[idx + 1].id
        })
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCH_KEY)
    if (!watchers || !watchers.length) {
        watchers = []
        watchers.push(createWatcher('Avici', 'netflix-1.png', ['2 Fast 2 Furious', 'Rambo : first blood', 'Wanted', 'Friday', 'Friday after next', 'The mechanic']))
        watchers.push(createWatcher('Ice cube', 'netflix-4.png', ['Friday', 'The boyz n\' the hood']))
        watchers.push(createWatcher('Jim Lahey', 'netflix-6.png', ['The Trailer Park Boys', 'Elemental', 'Ron\'s gone wrong', 'Top Gun: Maverick']))
        utilService.saveToStorage(WATCH_KEY, watchers)
    }
}

function createWatcher(fullName, imgUrl, movies = ['2 Fast 2 Furious']) {
    const watcher = getEmptyWatcher(fullName, imgUrl, movies)
    watcher.id = utilService.makeId()
    return watcher
}
