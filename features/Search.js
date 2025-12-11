import { getPokemonByName } from "../api/Api.js";
import { displayPokemon } from "../components/DisplayPokemon.js";

export const stateSearch = { active: false };

let backupHTML = null;
let searchTimer = null;

export function initSearch(formsearch, pokemonsList){

    formsearch.addEventListener('input', (evt) => {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(async () => {
            const q = evt.target.value.trim();
    
            if (q === '') {
                if (backupHTML !== null) {
                    pokemonsList.innerHTML = backupHTML;
                    backupHTML = null;
                }
                return;
            }
    
            if (backupHTML === null) backupHTML = pokemonsList.innerHTML;
    
            pokemonsList.innerHTML = '';
            try {
                const pokemonData = await searchPoke(q, true);
                displayPokemon(pokemonData, pokemonsList);
            } catch (err) {
                console.error('Recherche échouée', err);
                pokemonsList.innerHTML = '<div class="error">Aucun résultat</div>';
            }
        }, 500);
    })
}
