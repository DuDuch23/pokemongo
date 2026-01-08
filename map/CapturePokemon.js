import { getPokemonData } from "../api/Api.js";
import { getSpawnedPokemons } from "../store/SpawnStore.js";

export async function capturePokemon(pokemonCaptured) {
    if(pokemonCaptured){
        const team = JSON.parse(localStorage.getItem("Equipe"));
        const pokedex = JSON.parse(localStorage.getItem("Pokedex"));

        const pokemon = await getPokemonData(pokemonCaptured.id);

        if(team.length < 6){
            team.push(pokemon);
            localStorage.setItem("Equipe", JSON.stringify(team));
        }else{
            pokedex.push(pokemon);
            localStorage.setItem("Pokedex", JSON.stringify(pokedex));
        }

        localStorage.setItem(
            "lastCapturedPokemon",
            JSON.stringify(pokemon)
        );
    }
}