export async function getPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.json();
}

// fonction principal de récupération des données du pokémon

export async function getPokemonData(id) {
    const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);

    const pokemon = await pokemonRes.json();
    const species = await speciesRes.json();

    const nameFr =
            species.names.find(n => n.language.name === "fr")?.name ??
            pokemon.name;

    return {
        id: pokemon.id,
        nameFr,
        nameEn: pokemon.name,
        level: Math.floor(Math.random() * 30) + 1,

        sprites: {
            front: pokemon.sprites.front_default,
            artwork: pokemon.sprites.other["official-artwork"].front_default
        },

        cries: pokemon.cries?.latest,

        types: pokemon.types.map(t => t.type.name),

        stats: {
            hp: pokemon.stats.find(s => s.stat.name === "hp").base_stat,
            attack: pokemon.stats.find(s => s.stat.name === "attack").base_stat,
            defense: pokemon.stats.find(s => s.stat.name === "defense").base_stat
        },

        position: null,
        captured: false,
        capturedAt: null
    };
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
