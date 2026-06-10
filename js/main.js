// ──────────────────────────────────────────────────────
//  main.js — Logica homepage (trending film + trending serie)
// ──────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  const movieGrid  = document.getElementById("trending-movies-grid");
  const seriesGrid = document.getElementById("trending-series-grid");

  // Mostra "Caricamento…" in entrambe le sezioni
  window.utils.showLoading(movieGrid);
  window.utils.showLoading(seriesGrid);

  // ── Trending film del giorno ──────────────────────────
  try {
    const movieData = await window.api.fetchTMDB("/trending/movie/day");
    window.utils.renderCards(movieGrid, movieData.results, "movie");
  } catch (error) {
    console.error(error);
    window.utils.showError(movieGrid, "Impossibile caricare i film. Controlla la tua API key o la connessione.");
  }

  // ── Trending serie del giorno ─────────────────────────
  try {
    const seriesData = await window.api.fetchTMDB("/trending/tv/day");
    window.utils.renderCards(seriesGrid, seriesData.results, "tv");
  } catch (error) {
    console.error(error);
    window.utils.showError(seriesGrid, "Impossibile caricare le serie. Controlla la tua API key o la connessione.");
  }
});
