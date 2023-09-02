const { useState, useEffect } = React

export function Mouser() {
    let [isOn, setIsOn] = useState(true)
    let [pos, setPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (isOn) addMouseListener()
        else removeMouseListener()

        return () => { removeMouseListener() }
    }, [isOn])


    function addMouseListener() {
        document.addEventListener('mousemove', findXY)
        // console.log('Add mouse listener')
    }

    function removeMouseListener() {
        document.removeEventListener('mousemove', findXY)
        // console.log('Remove mouse listener')
    }

    function findXY(ev) {
        setPos({ x: ev.offsetX, y: ev.offsetY })
    }

    function toggleTracking() {
        setIsOn(isOn => !isOn)
    }

    return (
        <section className="mouse-pos">
            <h2>Mouse position</h2>
            <p>x:{pos.x} y:{pos.y}</p>
            {<button onClick={toggleTracking}>{isOn ? 'Pause' : 'Resume'}</button>}
        </section>
    )
}