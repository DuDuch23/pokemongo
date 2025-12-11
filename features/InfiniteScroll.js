import { getPokemonList, getPokemonByName } from "../api/Api.js";
import { displayPokemon } from "../components/DisplayPokemon.js";
import { stateSearch } from "./Search.js";

// pagination state for infinite scroll
let offset = 0;
const limit = 9;
let isLoading = false;
let noMore = false;

export async function getPokemonByScroll(container){
    if (isLoading || noMore) return;
    if(stateSearch.active) return;

    isLoading = true;
    const data = await getPokemonList(offset, limit);

    // console.log(data);
    for (const p of data.results) {
        const fullData = await getPokemonByName(p.name);
        displayPokemon(fullData, container);
    }

    offset += limit;
    if (data.results.length < limit) noMore = true;

    isLoading = false;
}

export function initInfiniteScroll(container) {
    window.addEventListener("scroll", async () => {
        const bottom = window.scrollY + window.innerHeight >= container.clientHeight - 10;
        if (bottom) loadMorePokemon(container);
    });

    getPokemonByScroll(container); // première liste
}