import { getSpawnedPokemons } from "../store/SpawnStore.js";

export function capturePokemon() {
    const pokemons = getSpawnedPokemons();

    pokemons.forEach(pokemon => {
        if (!pokemon.marker) return;

        pokemon.marker.addListener("click", () => {
            const map = document.getElementById("map");
            const mapSave = map.outerHTML;
            console.log(mapSave);
            // console.log("Pokémon capturé :", pokemon.nameFr);

            // localStorage.setItem(
            //     "lastCapturedPokemon",
            //     JSON.stringify({
            //         id: pokemon.id,
            //         name: pokemon.nameFr
            //     })
            // );

            // const pokedex = JSON.parse(localStorage.getItem("Pokedex"));
            // pokedex.push({
            //     id: pokemon.id,
            //     nameFr: pokemon.nameFr
            // });

            // localStorage.setItem("Pokedex", JSON.stringify(pokedex));

            // pokemon.marker.setMap(null);
        });
    });
}

export function battlePokemon(pokemon){
    const map = document.getElementById("map");
    const mapSave = map.outerHTML;
    console.log(mapSave);
}