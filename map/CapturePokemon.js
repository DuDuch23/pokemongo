import { getSpawnedPokemons } from "../store/SpawnStore.js";

export function capturePokemon(pokemonCaptured) {
    if(pokemonCaptured){
        console.log("Pokémon capturé :", pokemonCaptured.nameFr);
        const team = JSON.parse(localStorage.getItem("Equipe"));
        console.log(team.length);
        if(team.length <= 5){
            console.log("enregistré dans la team");
            team.push({
                id: pokemonCaptured.id,
                nameFr: pokemonCaptured.nameFr
            });
    
            localStorage.setItem("Equipe", JSON.stringify(team));
        }else{
            console.log("enregistré dans le pokédex");
            const pokedex = JSON.parse(localStorage.getItem("Pokedex"));
            pokedex.push({
                id: pokemonCaptured.id,
                nameFr: pokemonCaptured.nameFr
            });
    
            localStorage.setItem("Pokedex", JSON.stringify(pokedex));
        }
        localStorage.setItem(
            "lastCapturedPokemon",
            JSON.stringify({
                id: pokemonCaptured.id,
                name: pokemonCaptured.nameFr
            })
        );


    }
}

export function battlePokemon(pokemon){
    const map = document.getElementById("map");
    const mapSave = map.outerHTML;
    console.log(mapSave);
}