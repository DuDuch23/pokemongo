import { getPokemonData } from "../api/Api.js";
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

        const pokemonData = await getPokemonData(randomId);

        const position = {
            lat: centre.lat + (Math.random() - 0.5) * 1,
            lng: centre.lng + (Math.random() - 0.5) * 1
        };
        const icon = {
            url: pokemonData.sprites.front,
            scaledSize: new google.maps.Size(75, 75)
        };

        const marker = new google.maps.Marker({
            position,
            map,
            title: pokemonData.nameFr,
            icon
        });


        const pokemonSpawned = {
            ...pokemonData,
            position,
            marker,
            captured: false
        };

        marker.addListener("click", () => {
            if (pokemonSpawned.captured) return;

            const team = JSON.parse(localStorage.getItem("Equipe"));
            console.log(team);

            const containerBattle = document.createElement("div");
            containerBattle.classList.add("container-battle");
            containerBattle.innerHTML = `
                <div class="battle-screen">
                    <div class="battle-ui">

                        <div class="pokemon-user">
                            <div class="pokemon-info">
                                <p class="pokemon-name">${team[0].nameFr}</p>
                                <p>Niveau ${team[0].level}</p>
                                <div class="hp-bar">
                                    <div class="hp-fill"></div>
                                    <p>${team[0].stats.hp}/${team[0].stats.hp}</p>
                                </div>
                            </div>
                            <div class="pokemon-sprite">
                                <img src="${team[0].sprites.front}">
                            </div>
                        </div>

                        <div class="pokemon-enemy">
                            <div class="pokemon-info">
                                <p class="pokemon-name">${pokemonSpawned.nameFr}</p>
                                <p>Niveau ${pokemonSpawned.level}</p>
                                <div class="hp-bar">
                                    <div class="hp-fill"></div>
                                    <p>${pokemonSpawned.stats.hp}/${pokemonSpawned.stats.hp}</p>
                                </div>
                            </div>

                            <div class="pokemon-sprite">
                                <img src="${pokemonSpawned.sprites.front}">
                            </div>

                        </div>

                        <div class="battle-actions">
                            <button id="capture" class="btn capture">Capturer</button>
                            <button id="fight" class="btn fight">Vaincre</button>
                        </div>

                        <audio id="bg-crie-pokemon" src="${pokemonSpawned.cries}"></audio>
                    </div>
                </div>
            `;

            document.body.appendChild(containerBattle);

            // Musique du combat
            const musicPlay = document.getElementById("bg-music");
            const fightMusic = musicFight(pokemonSpawned);

            musicPlay.src = `./song/${fightMusic}`;
            musicPlay.volume = 0.005;
            musicPlay.currentTime = 0;
            musicPlay.play();

            // Cri du pokémon pendant le combat
            setTimeout(() => {
                const crie = document.getElementById("bg-crie-pokemon");
                if (!crie) return;

                crie.volume = 0.05;
                crie.currentTime = 0;
                crie.play();
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
                musicPlay.volume = 0.005;
                musicPlay.currentTime = 0;
                musicPlay.play();

                const victory = battleActions.querySelector(".victory");
                console.log(victory);
                victory.addEventListener("click", () => {
                    containerBattle.remove();
                    musicPlay.src = "./song/004 New Bark Town.mp3";
                    musicPlay.volume = 0.005;
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
                musicPlay.volume = 0.005;
                musicPlay.currentTime = 0;
                musicPlay.play();

                battleActions.innerHTML = `
                    <button class="victory">
                        <p>${pokemonSpawned.nameFr} a été vaincu avec succès <span>></span></p>
                    </button>
                `;

                musicPlay.src = "./song/victory.mp3";
                musicPlay.volume = 0.005;
                musicPlay.currentTime = 0;
                musicPlay.play();

                const victory = battleActions.querySelector(".victory");
                console.log(victory);
                victory.addEventListener("click", () => {
                    containerBattle.remove();
                    musicPlay.src = "./song/004 New Bark Town.mp3";
                    musicPlay.volume = 0.005;
                    musicPlay.currentTime = 0;
                    musicPlay.play();
                });
            });
        });


        pokemonSpawn.push(pokemonSpawned);
    }

    return pokemonSpawn;
}
