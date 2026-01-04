import { getPokemonById, getPokemonSpecies } from "../api/Api.js";
import { musicFight } from "../features/BackgroundMusic.js";
import { capturePokemon } from "./CapturePokemon.js";

export async function randomSpawnPokemon(map, centre) {
    const minSpawn = 100;
    const maxSpawn = 100;
    const spawnCount = Math.floor(Math.random() * (maxSpawn - minSpawn + 1)) + minSpawn;

    console.log("Nombre de Pokémon à faire spawn :", spawnCount);

    const pokemonSpawn = [];

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

        const position = {
            lat: centre.lat + (Math.random() - 0.5) * 1,
            lng: centre.lng + (Math.random() - 0.5) * 1
        };

        const marker = new google.maps.Marker({
            position,
            map,
            title: frenchName,
            icon
        });

        const pokemonSpawned = {
            id: pokemon.id,
            nameFr: frenchName,
            nameEn: pokemon.name,
            icon,
            data: pokemon,
            crie: pokemon.cries.latest,
            position,
            marker,
            captured: false
        };

        marker.addListener("click", () => {
            if (pokemonSpawned.captured) return;

            const containerBattle = document.createElement("div");
            containerBattle.classList.add("container-battle");

            containerBattle.innerHTML = `
                <div class="battle-screen">
                    <div class="battle-ui">
                        <div class="pokemon-info">
                            <p class="pokemon-name">${pokemonSpawned.nameFr}</p>
                            <div class="hp-bar">
                                <div class="hp-fill"></div>
                            </div>
                        </div>

                        <div class="pokemon-sprite">
                            <img src="${pokemonSpawned.icon.url}">
                        </div>

                        <div class="battle-actions">
                            <button id="capture" class="btn capture">Capturer</button>
                            <button id="fight" class="btn fight">Vaincre</button>
                        </div>

                        <audio id="bg-crie-pokemon" src="${pokemonSpawned.crie}"></audio>
                    </div>
                </div>
            `;

            document.body.appendChild(containerBattle);

            // Musique du combat
            const musicPlay = document.getElementById("bg-music");
            const fightMusic = musicFight(pokemonSpawned);

            musicPlay.src = `./song/${fightMusic}`;
            musicPlay.volume = 0.05;
            musicPlay.currentTime = 0;
            musicPlay.play();

            // Cri du pokémon pendant le combat
            setTimeout(() => {
                const cry = document.getElementById("bg-crie-pokemon");
                if (!cry) return;

                cry.volume = 0.10;
                cry.currentTime = 0;
                cry.play();
            }, 5000);

            // Capture
            document.getElementById("capture").addEventListener("click", () => {
                pokemonSpawned.captured = true;
                marker.setMap(null);
                const battleActions = containerBattle.querySelector(".battle-actions");
                console.log(battleActions);

                battleActions.innerHTML = `
                    <button class="victory">
                        <p>${pokemonSpawned.nameFr} a été capturé avec succès <span>></span></p>
                    </button>
                `;

                musicPlay.src = "./song/victory.mp3";
                musicPlay.volume = 0.05;
                musicPlay.currentTime = 0;
                musicPlay.play();

                const victory = battleActions.querySelector(".victory");
                console.log(victory);
                victory.addEventListener("click", () => {
                    containerBattle.remove();
                    musicPlay.src = "./song/004 New Bark Town.mp3";
                    musicPlay.volume = 0.05;
                    musicPlay.currentTime = 0;
                    musicPlay.play();
                });

                capturePokemon(pokemonSpawned);
            });

            // Combat
            document.getElementById("fight").addEventListener("click", () => {
                marker.setMap(null);
                const battleActions = containerBattle.querySelector(".battle-actions");
                console.log(battleActions);

                musicPlay.src = "./song/victory.mp3";
                musicPlay.volume = 0.05;
                musicPlay.currentTime = 0;
                musicPlay.play();

                battleActions.innerHTML = `
                    <button class="victory">
                        <p>${pokemonSpawned.nameFr} a été vaincu avec succès <span>></span></p>
                    </button>
                `;

                musicPlay.src = "./song/victory.mp3";
                musicPlay.volume = 0.05;
                musicPlay.currentTime = 0;
                musicPlay.play();

                const victory = battleActions.querySelector(".victory");
                console.log(victory);
                victory.addEventListener("click", () => {
                    containerBattle.remove();
                    musicPlay.src = "./song/004 New Bark Town.mp3";
                    musicPlay.volume = 0.001;
                    musicPlay.currentTime = 0;
                    musicPlay.play();
                });
            });
        });


        pokemonSpawn.push(pokemonSpawned);
    }

    return pokemonSpawn;
}
