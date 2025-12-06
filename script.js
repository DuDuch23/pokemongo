// const getAllPokemon = async() => {
//     const response = await fetch(
//         'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
//     )

//     const data = await response.json();

//     // console.log(data);
// }

const getPokemonByName = async(name) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    const data = await response.json();
    return data;
}

const displayPokemon = (pokemonData, pokemonsList) => {
    const itemPokemon = document.createElement('div');
    const namePokemon = document.createElement('h3');
    const containerSpritePokemon = document.createElement('div');

    containerSpritePokemon.classList.add('container-sprites');
    
    itemPokemon.appendChild(namePokemon);
    namePokemon.textContent = pokemonData.name;
    itemPokemon.appendChild(containerSpritePokemon);

    const sprites = pokemonData.sprites;
    const spritesArray = Object.values(sprites);
    const arraySprites = spritesArray.filter(sprite => typeof sprite === 'string');
    arraySprites.map(sprite => {
        const imgPokemon = document.createElement('img');
        containerSpritePokemon.appendChild(imgPokemon);
        imgPokemon.src = sprite;
    })

    pokemonsList.appendChild(itemPokemon);
}

const getPokemonByScroll = async(offset, limit) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    )

    const data = await response.json();
    console.log(data);
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
}

getPokemonByScroll(0, 50);
document.addEventListener('DOMContentLoaded', () => {
    const formsearch = document.getElementById('search-pokemon');
    formsearch.addEventListener('input', (value) => {
        setTimeout(
            () => {
                searchPoke(value.target.value);
            }, 2000
        )
        console.log(value.target.value);
    })
});

const searchPoke = async(pokemon) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    )

    const data = await response.json();
    console.log(data);
    return data;
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