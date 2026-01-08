import { getPokemonData, getPokemonByName } from "../api/Api.js";
import { init } from "../script.js";

export function PitchProfessorChen(){
    // const songStartGame =  new Audio("./song/003 An Adventure Begins!.mp3");
    // songStartGame.volume = 0.005;
    // songStartGame.play();

    const root = document.getElementById("root");

    const containerPitch = document.createElement('div');
    containerPitch.classList.add("pitch-professeur-chen");

    const audioBegin = document.createElement('audio');
    audioBegin.classList.add("audio-start");
    audioBegin.src = "./song/003 An Adventure Begins!.mp3";
    audioBegin.setAttribute("loop", true)
    audioBegin.volume = 0.005;
    audioBegin.play();

    const profChen = document.createElement('img');
    profChen.src = "professeur-chen.png";
    profChen.classList.add("prof-chen");

    const containerTextPitch = document.createElement('div');
    containerTextPitch.classList.add("container-text-pitch");
    const textPitch = document.createElement('p');
    textPitch.classList.add("text-pitch");
    containerTextPitch.appendChild(textPitch);

    containerPitch.appendChild(profChen);
    containerPitch.appendChild(containerTextPitch);
    containerPitch.appendChild(audioBegin);

    root.appendChild(containerPitch);

    const messages = [
        "Salut jeune dresseur, tu es en train de rentrer dans le monde de pokémon go.",
        "Peuplé par pleins de pokémons, tu peux découvrir un tas de pokémon blablabla",
        "Choisis un pokémon de départ"
    ];

    let idx = 0;
    let finish = false;
    textPitch.innerText = messages[idx];

    containerTextPitch.addEventListener('click', () => {
        idx = Math.min(idx + 1, messages.length - 1);
        textPitch.innerText = messages[idx];
        if(idx === messages.length - 1 && finish != true){
            ChooseFirstPokemon();
            finish = true;
        }
    });
}

export async function ChooseFirstPokemon(){
    const nameChoice = [
        "Bulbasaur",
        "Charmander",
        "Squirtle",

        "Chikorita",
        "Cyndaquil",
        "Totodile",

        "Treecko",
        "Torchic",
        "Mudkip",

        "Turtwig",
        "Chimchar",
        "Piplup",

        "Snivy",
        "Tepig",
        "Oshawott",

        "Chespin",
        "Fennekin",
        "Froakie",

        "Rowlet",
        "Litten",
        "Popplio",

        "Grookey",
        "Scorbunny",
        "Sobble",

        "Sprigatito",
        "Fuecoco",
        "Quaxly",
    ];
    const pokemonChoice = await Promise.all(
        nameChoice.map(name => getPokemonByName(name))
    );

    pokemonChoice.forEach(pokemon => {
        console.log(pokemon);
    });

    const root = document.getElementById("root");
    const containerPitch = document.querySelector(".pitch-professeur-chen");
    const containerStarter = document.createElement("div");
    containerStarter.classList.add("container-starter");


    pokemonChoice.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("starter-card");

        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}">
            <h3>${pokemon.name}</h3>
        `;

        card.addEventListener("click", () => {
            console.log("Starter choisi :", pokemon.name);
            const containerAcceptChoice = document.createElement('div');
            containerAcceptChoice.classList.add("accept-choice");

            const textChoice = document.createElement('p');
            textChoice.innerText = `Choisis tu vraiment ${pokemon.name}`;

            const containerBtnChoice = document.createElement('div');
            containerBtnChoice.classList.add("container-btn-choice");

            const btnAccept = document.createElement('button');
            btnAccept.classList.add("btn-accept","btn");
            btnAccept.innerText = "Oui";

            const btnDeny = document.createElement('button');
            btnDeny.classList.add("btn-deny","btn");
            btnDeny.innerText = "Non";

            containerBtnChoice.appendChild(btnAccept);
            containerBtnChoice.appendChild(btnDeny);

            containerAcceptChoice.appendChild(textChoice);
            containerAcceptChoice.appendChild(containerBtnChoice);
            const containerPokeball = document.createElement('div');
            containerPokeball.classList.add("container-pokeball");
            containerAcceptChoice.appendChild(containerPokeball);
            containerPokeball.innerHTML = `

            `;

            containerPitch.appendChild(containerAcceptChoice);

            // Equipe du joueur
            // let team = new Array();
            const teamLocalstorage = localStorage.getItem("Equipe");
            // if (!teamLocalstorage) {
            //     localStorage.setItem("Equipe", JSON.stringify(team));
            // }

            if (!localStorage.getItem("Equipe")) {
                localStorage.setItem("Equipe", JSON.stringify([]));
            }

            btnAccept.addEventListener('click', async () => {
                const pokemonData = await getPokemonData(pokemon.id);

                const teamLocal = JSON.parse(localStorage.getItem("Equipe")) || [];
                teamLocal.push(pokemonData);

                localStorage.setItem("Equipe", JSON.stringify(teamLocal));

                containerAcceptChoice.remove();
                containerStarter.remove();

                // const textPitch = document.getElementById("container-text-pitch p");
                const textPitch = document.querySelector(".text-pitch");
                textPitch.innerText = "Maintenant que tu as choisi ton Pokémon...";
                const btnStartGame = document.createElement('button');
                btnStartGame.setAttribute('id', 'start-game');
                btnStartGame.innerText = "Commencer à jouer";
                containerPitch.appendChild(btnStartGame);

                document.getElementById("start-game").addEventListener("click", init);
            });

            btnDeny.addEventListener('click', () => {
                containerAcceptChoice.remove();
            });
        });

        containerPitch.appendChild(containerStarter);
        containerStarter.appendChild(card);
    });

    return pokemonChoice;
}