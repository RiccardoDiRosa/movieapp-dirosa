// ──────────────────────────────
//  series.js — Pagina /series
// ──────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("series-grid");

  window.utils.showLoading(grid);

  try {
    // Endpoint: serie popolari
    const data = await window.api.fetchTMDB("/tv/popular");
    window.utils.renderCards(grid, data.results, "tv");
  } catch (error) {
    console.error(error);
    window.utils.showError(grid, "Impossibile caricare le serie. Riprova più tardi.");
  }
});
