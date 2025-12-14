import { initSearch } from "./features/Search.js";
import { getPokemonByScroll } from "./features/InfiniteScroll.js";
import { initMap } from "./map/Map.js";
import { capturePokemon } from "./map/CapturePokemon.js";
import { loadGoogleMaps } from "./map/Map.js";


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root");

    function init(){
        localStorage.setItem("Game started", true);
        root.innerHTML = `
            <div id="map" style="height: 500px; width: 100%;"></div>
                <audio id="bg-music" src="./004 New Bark Town.mp3" loop></audio>
                <div class="container">
                    <div class="container__main">
                        <form action="">
                            <input type="text" id="search-pokemon" placeholder="Rechercher un pokémon">
                        </form>
                        <div id="pokemon-liste"></div>
                    </div>
                </div>
            `;
        const music = document.getElementById("bg-music");

        music.volume = 0.05;
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
    }

    const gameStarted = localStorage.getItem("Game started");
    if (!gameStarted) {
        root.innerHTML = `
            <div id="container-start-game">
                <img src="professeur-chen.png">
                <button id="start-game">Pokémon GO !!</button>
                <audio id="bg-music" src="./003 An Adventure Begins!.mp3" loop>
            </div>
        `;

        const music = document.getElementById("bg-music");

        music.volume = 0.05;
        music.play();

        document
            .getElementById("start-game")
            .addEventListener("click", init);
    } else {
        init();
    }
});