// Non committare questo file su repository pubblici (vedi .gitignore)
const API_KEY = "b5e912ee3fa4fa2026803ea04bddb840";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER = "https://via.placeholder.com/500x750/1a1a2e/e0e0e0?text=Nessuna+immagine";

/**
 * Funzione base per tutte le chiamate TMDB.
 * @param {string} endpoint - es. "/trending/movie/day"
 * @param {Object} params   - parametri aggiuntivi (opzionali)
 * @returns {Promise<Object>} - il JSON della risposta
 */
async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "it-IT");

  // Aggiunge eventuali parametri extra
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Errore API TMDB: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Restituisce l'URL completo del poster, o un placeholder se assente.
 * @param {string|null} posterPath
 * @returns {string}
 */
function getPosterUrl(posterPath) {
  return posterPath ? `${IMG_BASE}${posterPath}` : PLACEHOLDER;
}

/**
 * Estrae l'anno da una stringa data "YYYY-MM-DD".
 * @param {string|undefined} dateString
 * @returns {string}
 */
function getYear(dateString) {
  if (!dateString) return "Anno N/D";
  return dateString.split("-")[0];
}

// Esporta come proprietà globali (no moduli ES6 per semplicità vanilla)
window.api = { fetchTMDB, getPosterUrl, getYear };
