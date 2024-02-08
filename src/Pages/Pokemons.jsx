import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";

function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [uniqueTypes, setUniqueTypes] = useState([]);

    useEffect(() => {
        axios.get("https://my-json-server.typicode.com/tahsincanpolat/pokedex/pokemons")
            .then((response) => {
                if (response.status === 200) {
                    setPokemons(response.data);
                    // Tüm unique tipleri bul
                    const allTypes = response.data.flatMap(pokemon => pokemon.type);
                    const uniqueTypesArray = allTypes.filter((type, index) => allTypes.indexOf(type) === index);
                    setUniqueTypes(uniqueTypesArray);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // Arama işlemini gerçekleştiren fonksiyon
    const searchPokemon = (e) => {
        setSearchTerm(e.target.value);
    }

    // Filtrelenmiş pokemon listesini döndüren fonksiyon
    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        && (!selectedType || pokemon.type.includes(selectedType))
    );

    // Select'te seçilen tipi güncelle
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    }

    return (
        <div className="container pokemons">
            <div className="filter">
                <input
                    type="text"
                    placeholder="Pokemon adıyla ara..."
                    className="form-control search-input"
                    value={searchTerm}
                    onChange={searchPokemon}
                />
                <select onChange={handleTypeChange} value={selectedType} className="form-control search-select">
                    <option value="" disabled>Pokemon tipine Göre Filtrele</option>
                    <option value="">Tüm tipler</option>
                    {uniqueTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
           
            <div className="row">
                {filteredPokemons.map((pokemon, key) => (
                    <Pokemon pokemon={pokemon} key={key} />
                ))}
            </div>
        </div>
    )
}

export default Pokemons;
