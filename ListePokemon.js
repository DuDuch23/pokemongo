const searchPoke = async(pokemon) => {
    try{
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        )  
        const data = await response.json();
        console.log(data);
        if(pokemon === "") {
            stateSearch = false;
        }else{
            stateSearch = true;
        }
        return data;
    } catch (error){
        console.error('Erreur avec la recherche du pokémon', pokemon);
        stateSearch = false;
    }
}
    
const getPokemonByName = async(name) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    const data = await response.json();
    return data;
}
export { getPokemonByName, displayPokemon, filterByType };