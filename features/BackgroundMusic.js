export function musicFight(pokemon) {
    if (!pokemon?.nameFr) {
        return "10. Battle! (Wild Pokémon - Johto).mp3";
    }

    const specialMusics = {
        // ===== GEN 1 =====
        "Artikodin": "battle-artikodin.mp3",
        "Électhor": "battle-electhor.mp3",
        "Sulfura": "battle-sulfura.mp3",
        "Mewtwo": "battle-mewtwo.mp3",
        "Mew": "battle-mew.mp3",

        // ===== GEN 2 =====
        "Raikou": "battle-raikou.mp3",
        "Entei": "battle-entei.mp3",
        "Suicune": "battle-suicune.mp3",
        "Lugia": "battle-lugia.mp3",
        "Ho-Oh": "battle-ho-oh.mp3",
        "Celebi": "battle-celebi.mp3",

        // ===== GEN 3 =====
        "Regirock": "battle-regirock.mp3",
        "Regice": "battle-regice.mp3",
        "Registeel": "battle-registeel.mp3",
        "Latias": "battle-latias.mp3",
        "Latios": "battle-latios.mp3",
        "Kyogre": "battle-kyogre.mp3",
        "Groudon": "battle-groudon.mp3",
        "Rayquaza": "battle-rayquaza.mp3",
        "Jirachi": "battle-jirachi.mp3",
        "Deoxys": "battle-deoxys.mp3",

        // ===== GEN 4 =====
        "Créhelf": "battle-crehelf.mp3",
        "Créfollet": "battle-crefollet.mp3",
        "Créfadet": "battle-crefadet.mp3",
        "Dialga": "battle-dialga.mp3",
        "Palkia": "battle-palkia.mp3",
        "Giratina": "battle-giratina.mp3",
        "Heatran": "battle-heatran.mp3",
        "Regigigas": "battle-regigigas.mp3",
        "Cresselia": "battle-cresselia.mp3",
        "Phione": "battle-phione.mp3",
        "Manaphy": "battle-manaphy.mp3",
        "Darkrai": "battle-darkrai.mp3",
        "Shaymin": "battle-shaymin.mp3",
        "Arceus": "battle-arceus.mp3",

        // ===== GEN 5 =====
        "Victini": "battle-victini.mp3",
        "Cobaltium": "battle-cobaltium.mp3",
        "Terrakium": "battle-terrakium.mp3",
        "Viridium": "battle-viridium.mp3",
        "Boréas": "battle-boreas.mp3",
        "Fulguris": "battle-fulguris.mp3",
        "Démétéros": "battle-demeteros.mp3",
        "Reshiram": "battle-reshiram-zekrom.mp3",
        "Zekrom": "battle-reshiram-zekrom.mp3",
        "Kyurem": "battle-kyurem.mp3",
        "Keldeo": "battle-keldeo.mp3",
        "Meloetta": "battle-meloetta.mp3",
        "Genesect": "battle-genesect.mp3",

        // ===== GEN 6 =====
        "Xerneas": "battle-xerneas-yveltal.mp3",
        "Yveltal": "battle-xerneas-yveltal.mp3",
        "Zygarde": "battle-zygarde.mp3",
        "Diancie": "battle-diancie.mp3",
        "Hoopa": "battle-hoopa.mp3",
        "Volcanion": "battle-volcanion.mp3",

        // ===== GEN 7 =====
        "Type:0": "battle-type0.mp3",
        "Silvallié": "battle-silvalle.mp3",
        "Tokorico": "battle-tokorico.mp3",
        "Tokopiyon": "battle-tokopiyon.mp3",
        "Tokotoro": "battle-tokotoro.mp3",
        "Tokopisco": "battle-tokopisco.mp3",
        "Cosmog": "battle-cosmog.mp3",
        "Cosmovum": "battle-cosmovum.mp3",
        "Solgaleo": "battle-solgaleo-lunala.mp3",
        "Lunala": "battle-solgaleo-lunala.mp3",
        "Necrozma": "battle-necrozma.mp3",
        "Magearna": "battle-magearna.mp3",
        "Marshadow": "battle-marshadow.mp3",
        "Zeraora": "battle-zeraora.mp3",
        "Meltan": "battle-meltan.mp3",
        "Melmetal": "battle-melmetal.mp3",

        // ===== GEN 8 =====
        "Zacian": "battle-zacian.mp3",
        "Zamazenta": "battle-zamazenta.mp3",
        "Éthernatos": "battle-eternatos.mp3",
        "Wushours": "battle-wushours.mp3",
        "Shifours": "battle-shifours.mp3",
        "Zarude": "battle-zarude.mp3",
        "Regieleki": "battle-regieleki.mp3",
        "Regidrago": "battle-regidrago.mp3",
        "Spectreval": "battle-spectreval.mp3",
        "Blizzeval": "battle-blizzeval.mp3",

        // ===== GEN 9 =====
        "Chongjian": "battle-chongjian.mp3",
        "Baojian": "battle-baojian.mp3",
        "Dinglu": "battle-dinglu.mp3",
        "Yuyu": "battle-yuyu.mp3",
        "Koraidon": "battle-koraidon.mp3",
        "Miraidon": "battle-miraidon.mp3",
        "Ogerpon": "battle-ogerpon.mp3",
        "Terapagos": "battle-terapagos.mp3"
    };

    return (
        specialMusics[pokemon.nameFr] ??
        "10. Battle! (Wild Pokémon - Johto).mp3"
    );
}
