document.addEventListener('DOMContentLoaded', () => {
    console.log(window);
    // const getAllPokemon = async() => {
    //     const response = await fetch(
    //         'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    //     )

    //     const data = await response.json();

    //     // console.log(data);
    // }
    const getPokemonByScroll = async(offset, limit) => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        )

        const data = await response.json();
        // console.log(data);
        const pokemonsList = document.getElementById('pokemon-liste');
        for (const pokemon of data.results) {
            try{
                const pokemonData = await getPokemonByName(pokemon.name);
                console.log(pokemonData);
                displayPokemon(pokemonData, pokemonsList);
            } catch(error){
                console.error('Erreur avec le pokemon ', pokemon.name);
            }
        };
        // return how many were fetched so caller can detect end
        return data.results.length;
    }

    // pagination state for infinite scroll
    let currentOffset = 0;
    const limit = 9;
    let isLoading = false;
    let noMore = false;

    // initial load
    (async () => {
        isLoading = true;
        const fetched = await getPokemonByScroll(currentOffset, limit);
        if (fetched < limit) noMore = true;
        isLoading = false;
    })();

    // scroll listener - loads next page when reaching bottom
    window.addEventListener('scroll', () => {
        if (isLoading || noMore) return;

        const scrollTop = window.scrollY;
        const listePokemon = document.getElementById('pokemon-liste');
        const heightWindow = window.innerHeight;
        const heightListe = listePokemon.clientHeight;

        if (scrollTop + heightWindow >= heightListe - 10) { // small threshold
            isLoading = true;
            currentOffset += limit;
            (async () => {
                const fetched = await getPokemonByScroll(currentOffset, limit);
                if (fetched < limit) noMore = true;
                isLoading = false;
            })();
        }
    })

    const searchPoke = async(pokemon) => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        )

        const data = await response.json();
        console.log(data);
        return data;
    }

    const formsearch = document.getElementById('search-pokemon');
    const pokemonsList = document.getElementById('pokemon-liste');
    // backup of current list HTML (saved once, restored when search cleared)
    let backupHTML = null;
    // debounce timer
    let searchTimer = null;

    formsearch.addEventListener('input', (evt) => {
        // debounce so we don't fire a request on every keystroke
        clearTimeout(searchTimer);
        searchTimer = setTimeout(async () => {
            const q = evt.target.value.trim();

            // if query is empty -> restore backup if present
            if (q === '') {
                if (backupHTML !== null) {
                    pokemonsList.innerHTML = backupHTML;
                    // optionally clear backup so next search will re-save the current state
                    backupHTML = null;
                }
                return;
            }

            // save the current content only once (before first search)
            if (backupHTML === null) backupHTML = pokemonsList.innerHTML;

            // show only the search result: clear list then append found pokemon
            pokemonsList.innerHTML = '';
            try {
                const pokemonData = await searchPoke(q);
                displayPokemon(pokemonData, pokemonsList);
            } catch (err) {
                console.error('Recherche échouée', err);
                pokemonsList.innerHTML = '<div class="error">Aucun résultat</div>';
            }
        }, 500);
    })

    // const searchPoke = async(pokemon) => {
    //     const response = await fetch(
    //         `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    //     )

    //     const data = await response.json();
    //     console.log(data);
    //     return data;
    // }

    // const formsearch = document.getElementById('search-pokemon');
    // const pokemonsList = document.getElementById('pokemon-liste');
    // formsearch.addEventListener('input', (value) => {
    //     if(dataSave !== null && value.target.value !== ''){
    //         var dataSave = null;
    //         console.log(dataSave);
    //     }
    //     console.log(dataSave);
    //     setTimeout(
    //         async () => {
    //             if(value.target.value === ''){
    //                 pokemonsList.innerHTML = dataSave;
    //                 console.log(dataSave);
    //             }else if(value.target.value !== ''){
    //                 console.log('recherche');
    //                 const dataSave = pokemonsList.outerHTML;
    //                 console.log(dataSave);
    //                 const pokemonData = await searchPoke(value.target.value);
    //                 const dataSearch = displayPokemon(pokemonData, pokemonsList);
    //                 pokemonsList.innerHTML = dataSearch;
    //                 console.log("dataSave");
    //             }
    //         }, 2000
    //     )
    // })

    const getPokemonByName = async(name) => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`,
        )

        const data = await response.json();
        return data;
    }

    const displayPokemon = (pokemonData, pokemonsList) => {
        const itemPokemon = document.createElement('div');
        itemPokemon.classList.add('item-pokemon');
        const namePokemon = document.createElement('h3');

        // Types
        const containerTypesPokemon = document.createElement('div');
        containerTypesPokemon.classList.add('container-tyes');

        const types = pokemonData.types;
        const typesArray = Object.values(types);
        const typesArrayFiltered = typesArray.filter(type => typeof type === 'string');
        typesArrayFiltered.map(crie => {
            const typePokemon = document.createElement('img');
            containerTypesPokemon.appendChild(typePokemon);
            typePokemon.src = crie;
        })

        // Cries
        const containerCriesPokemon = document.createElement('div');
        containerCriesPokemon.classList.add('container-cries');

        const cries = pokemonData.cries;
        const criesArray = Object.values(cries);
        const criesArrayFiltered = criesArray.filter(crie => typeof crie === 'string');
        criesArrayFiltered.map(crie => {
            const criePokemon = document.createElement('audio');
            criePokemon.controls = true;
            criePokemon.volume = 0.05;
            containerCriesPokemon.appendChild(criePokemon);
            criePokemon.src = crie;
        })

        // Sprites
        const containerSpritePokemon = document.createElement('div');
        containerSpritePokemon.classList.add('container-sprites');

        const sprites = pokemonData.sprites;
        const spritesArray = Object.values(sprites);
        const arraySprites = spritesArray.filter(sprite => typeof sprite === 'string');
        arraySprites.map(sprite => {
            const imgPokemon = document.createElement('img');
            containerSpritePokemon.appendChild(imgPokemon);
            imgPokemon.src = sprite;
        })

        itemPokemon.appendChild(namePokemon);
        namePokemon.textContent = pokemonData.name;
        itemPokemon.appendChild(containerTypesPokemon);
        itemPokemon.appendChild(containerSpritePokemon);
        itemPokemon.appendChild(containerCriesPokemon);
        pokemonsList.appendChild(itemPokemon);
    }

    const filterByType = async(type) => {

    }

    // const getPoke = async () => {
    //     const response = await fetch(
    //         'https://pokeapi.co/api/v2/pokemon/xerneas',
    //     );

    //     const data = await response.json();
    //     // console.log(data);

    //     const containerSpritePokemon = document.getElementById('all-sprites');
    //     const sprites = data.sprites;
    //     const spritesArray = Object.values(sprites);
    //     const arraySprites = spritesArray.filter(sprite => typeof sprite === 'string');
    //     // console.log(arraySprites);
    //     arraySprites.map(sprite => {
    //         const imgPokemon = document.createElement('img');
    //         containerSpritePokemon.appendChild(imgPokemon);
    //         imgPokemon.src = sprite;
    //     })
    // }
    // getAllPokemon();
    // getPoke();
});