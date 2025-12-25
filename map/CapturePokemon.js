import { getSpawnedPokemons } from "../store/SpawnStore.js";

export function capturePokemon(pokemonCaptured) {
    if(pokemonCaptured){
        console.log("Pokémon capturé :", pokemonCaptured.nameFr);

        localStorage.setItem(
            "lastCapturedPokemon",
            JSON.stringify({
                id: pokemonCaptured.id,
                name: pokemonCaptured.nameFr
            })
        );

        const pokedex = JSON.parse(localStorage.getItem("Pokedex"));
        pokedex.push({
            id: pokemonCaptured.id,
            nameFr: pokemonCaptured.nameFr
        });

        localStorage.setItem("Pokedex", JSON.stringify(pokedex));

    }
}

export function battlePokemon(pokemon){
    const map = document.getElementById("map");
    const mapSave = map.outerHTML;
    console.log(mapSave);
}