export function musicFight(pokemon) {
    if (!pokemon?.nameFr) {
        console.log("fezf");
        return "10. Battle! (Wild Pokémon - Johto).mp3";
    }

    const specialMusics = {
        "Artikodin": "battle-artikodin.mp3",
        "Électhor": "battle-électhor.mp3",
        "Sulfura": "battle-sulfura.mp3",
        "Mewtwo": "battle-mewtwo",
        
        "Entei": "battle-entei.mp3",
        "Raikou": "battle-raikou.mp3",
        "Suicune": "battle-suicune.mp3",
        "Ho-Oh": "battle-ho-oh.mp3",
        "Lugia": "battle-lugia.mp3",

        "Regirock": "battle-regirock.mp3",
        "Regice": "battle-regice.mp3",
        "Registeel": "battle-registeel.mp3",
        "Latias": "battle-latias.mp3",
        "Latios": "battle-latios.mp3",
        "Groudon": "battle-groudon.mp3",
        "Kyogre": "battle-kyogre.mp3",
        "Rayquaza": "battle-rayquaza.mp3",

        "Créhelf": "battle-crehelf.mp3",
        "Créfollet": "battle-crefollet.mp3",
        "Créfadet": "battle-crefadet.mp3",
        "Dialga": "battle-dialga.mp3",
        "Palkia": "battle-palkia.mp3",
        "Groudon": "battle-groudon.mp3",
        "Giratina": "battle-giratina.mp3",
        "Heatran": "battle-heatran.mp3",
        "Regigigas": "battle-regigigas.mp3",
        "Cresselia": "battle-cresselia.mp3",

        "Arceus": "battle-arceus.mp3",
        "Mew": "151 Mew.mp3",

        "Reshiram": "battle-reshiram-zekrom.mp3",
        "Zekrom": "battle-reshiram-zekrom.mp3",
        "Kyurem": "battle-kyurem.mp3",

        "Xerneas": "Battle Xerneas.mp3",
        "Yveltal": "Battle Yveltal.mp3",
        "Zygarde": "Battle Zygarde.mp3",

        "Solgaleo": "Battle Solgaleo.mp3",
        "Lunala": "Battle Lunala.mp3",
        "Necrozma": "Battle Necrozma.mp3",

        "Zacian": "Battle Zacian.mp3",
        "Zamazenta": "Battle Zamazenta.mp3",
        "Eternatus": "Battle Eternatus.mp3"
    };

    return (
        specialMusics[pokemon.nameFr] ??
        "10. Battle! (Wild Pokémon - Johto).mp3"
    );
}
