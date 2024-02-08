
function Pokemon({pokemon}) {
    console.log(pokemon)
    const getTypeColor = (type) => {
        switch(type) {
            case "Electric":
                return "#f9de44";
            case "Fire":
                return "#f37839";
            case "Flying":
                return "#185293";
            case "Water":
                return "#86c7d8";
            case "Grass":
                return "#5da071";
            case "Poison":
                return "#716a87";
            case "Rock":
                return "#8d8990";
            case "Ground":
                return "#957331";
            case "Psychic":
                return "#343437";
            case "Fairy":
                return "#e8bbc1";
            case "Bug":
                return "#a62754";
            default:
                return "green";
        }
    }

    return ( 
        <div className="col-md-4">
            <div className="pokemon">
                <div className="poke-image">
                    <img src={pokemon.image.thumbnail} alt={pokemon.name} />
                </div>
                <p className="poke-name">{pokemon.name}</p>
                <div className="poke-types">
                        {Object.values(pokemon.type).map((type, index) => (
                            <div
                                key={index}
                                className="type-box"
                                style={{ backgroundColor: getTypeColor(type) }}
                            >
                                {type}
                            </div>
                        ))}
                </div>
            </div>
        </div>
  )
}

export default Pokemon
