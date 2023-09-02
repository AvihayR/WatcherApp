import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function CountDown({ startFrom, onDone }) {
    const [timer, updateTimer] = useState(startFrom)
    let intervalIdRef = useRef()

    if (timer === 0) {
        clearInterval(intervalIdRef.current)
        onDone()
    }

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            updateTimer(oldTime => (oldTime - 1))
        }, 1000)

        return () => {
            console.log('cmp unmounted')
            clearInterval(intervalIdRef.current)
        }
    }, [])

    function getTime() {
        return (
            <span className={`time ${timer <= 6 ? 'red' : ''}`}>
                {(!timer) ? '0' : utilService.padNum(timer)}
            </span>
        )
    }

    return (
        <article>
            <h1></h1>
            <h2 className="timer">
                {(!timer) ? '⌛' : '⏳'}
                {getTime()}
            </h2>
        </article>
    )
}