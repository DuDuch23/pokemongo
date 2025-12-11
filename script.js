import { initSearch } from "./features/Search.js";
import { getPokemonByScroll } from "./features/InfiniteScroll.js";
import { initMap } from "./map/Map.js";

document.addEventListener('DOMContentLoaded', () => {
    const formsearch = document.getElementById('search-pokemon');
    const pokemonsList = document.getElementById('pokemon-liste');

    initSearch(formsearch, pokemonsList);
    getPokemonByScroll(pokemonsList);
});