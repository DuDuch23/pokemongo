import { randomSpawnPokemon } from "./Spawn.js";

export function initMap() {

    function handleSuccess(position) {
        const centre = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        loadMap(centre);
    }

    function handleError(error) {
        console.warn("Erreur de géolocalisation :", error);

        const fallbackPosition = {
            lat: 48.8566,
            lng: 2.3522
        };

        loadMap(fallbackPosition);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
        handleError();
    }
}

// Fonction qui initialise réellement la map
function loadMap(centre) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: centre,
    });

    new google.maps.Marker({
        position: centre,
        map: map,
        title: "Position détectée"
    });

    // 🎯 Spawn autour de la position récupérée (GPS ou fallback)
    randomSpawnPokemon(map, centre);
}

window.initMap = initMap;
