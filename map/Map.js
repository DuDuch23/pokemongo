import { randomSpawnPokemon } from "./Spawn.js";
import { setSpawnedPokemons } from "../store/SpawnStore.js";

export function loadGoogleMaps() {
    return new Promise((resolve, reject) => {
        // Déjà chargé ?
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=cléapi";
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject("Erreur chargement Google Maps");

        document.head.appendChild(script);
    });
}

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

        loadMap({
            lat: 48.8566,
            lng: 2.3522
        });
    }

    navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
        : handleError();
}

export async function loadMap(centre) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: centre,
    });

    const pokemons = await randomSpawnPokemon(map, centre);
    setSpawnedPokemons(pokemons);
}