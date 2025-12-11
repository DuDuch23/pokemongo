import { getPokemonById, getPokemonSpecies } from "../api/Api.js";

export async function randomSpawnPokemon(map, centre) {
    const minSpawn = 900;
    const maxSpawn = 1000;
    const spawnCount = Math.floor(Math.random() * (maxSpawn - minSpawn + 1)) + minSpawn;

    console.log("Nombre de Pokémon à faire spawn :", spawnCount);

    for (let i = 0; i < spawnCount; i++) {
        const randomId = Math.floor(Math.random() * 1025) + 1;

        const [pokemon, species] = await Promise.all([
            getPokemonById(randomId),
            getPokemonSpecies(randomId)
        ]);
        
        const frenchName =
            species.names.find(n => n.language.name === "fr")?.name ??
            pokemon.name;

        const icon = {
            url: pokemon.sprites.front_default,
            scaledSize: new google.maps.Size(75, 75)
        };

        // Position autour du centre (rayon de 0.002° ≈ 200m)
        const spawnPos = {
            lat: centre.lat + (Math.random() - 0.5) * 50,
            lng: centre.lng + (Math.random() - 0.5) * 500
        };

        // Marqueur Pokémon
        new google.maps.Marker({
            position: spawnPos,
            map: map,
            title: frenchName,
            icon: icon
        });
    }
}