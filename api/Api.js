export async function getPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.json();
}

export async function getPokemonSpecies(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return res.json();
}

export async function getPokemonByName(name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return res.json();
}

export async function getPokemonList(offset, limit) {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return res.json();
}
