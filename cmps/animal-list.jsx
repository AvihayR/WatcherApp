export function AnimalList({ animalInfos }) {

    function renderAnimal(animal) {
        return (
            <tr className="animal-row " key={animal.type}>
                <td>{animal.type}</td>
                <td>{animal.count}</td>
                <td>
                    <a href={`https://www.google.com/search?q=${animal.type}`}>Search</a>
                </td>
            </tr>
        )
    }

    return (
        <table className="animals ">
            <thead>
                <tr>
                    <td>Rare animals</td>
                </tr>
            </thead>
            <tbody>
                {animalInfos.map(animal => renderAnimal(animal))}
            </tbody>
        </table>
    )
}