export function displayPokemon (pokemonData, pokemonsList){
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
        criePokemon.volume = 0.005;
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
