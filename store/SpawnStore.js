let spawnedPokemons = [];

export function setSpawnedPokemons(pokemons) {
    spawnedPokemons = pokemons;
}

export function getSpawnedPokemons() {
    return spawnedPokemons;
}

export function clearSpawnedPokemons() {
    spawnedPokemons = [];
}
