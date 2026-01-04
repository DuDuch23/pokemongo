import { initSearch } from "./features/Search.js";
import { getPokemonByScroll } from "./features/InfiniteScroll.js";
import { initMap } from "./map/Map.js";
import { capturePokemon } from "./map/CapturePokemon.js";
import { loadGoogleMaps } from "./map/Map.js";
import { ChooseFirstPokemon, PitchProfessorChen } from "./features/ChooseFirstPokemon.js";


const root = document.getElementById("root");

export function init(){
    localStorage.setItem("Game started", true);
    root.innerHTML = `
        <div id="map" style="height: 500px; width: 100%;"></div>
            <audio id="bg-music" src="./song/004 New Bark Town.mp3" loop></audio>
            <div class="container">
                <div class="container__main">
                    <form action="">
                        <input type="text" id="search-pokemon" placeholder="Rechercher un pokémon">
                    </form>
                    <button id="logout btn">Déconnexion</button>
                    <div id="pokemon-liste"></div>
                </div>
            </div>
        `;
    const music = document.getElementById("bg-music");

    music.volume = 0.005;
    music.play();
    loadGoogleMaps();

    initMap();
    
    const formsearch = document.getElementById('search-pokemon');
    const pokemonsList = document.getElementById('pokemon-liste');
    let pokedex = new Array();
    const pokedexLocalsorage = localStorage.getItem("Pokedex");
    if (!pokedexLocalsorage) {
        localStorage.setItem("Pokedex", JSON.stringify(pokedex));
    }

    initSearch(formsearch, pokemonsList);
    getPokemonByScroll(pokemonsList);
    capturePokemon();
    document.getElementById("logout").addEventListener("click",() => {
        localStorage.clear();
        console.log('fezf');
    });
}
document.addEventListener('DOMContentLoaded', () => {

    const gameStarted = localStorage.getItem("Game started");
    if (!gameStarted) {
        // root.innerHTML = `
        //     <div id="container-start-game">
        //         <img class="prof-chen" src="professeur-chen.png">
        //         <button id="start-game">Pokémon GO !!</button>
        //         <audio id="bg-music" src="./song/003 An Adventure Begins!.mp3" loop>
        //     </div>
        // `;
        PitchProfessorChen();

        const music = document.getElementById("bg-music");

        music.volume = 0.005;
        music.play();

    } else {
        init();
    }
});