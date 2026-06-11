//  movies.js — Pagina /movies
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("movies-grid");

  window.utils.showLoading(grid);

  try {
    // Endpoint: film popolari
    const data = await window.api.fetchTMDB("/movie/popular");
    window.utils.renderCards(grid, data.results, "movie");
  } catch (error) {
    console.error(error);
    window.utils.showError(grid, "Impossibile caricare i film. Riprova più tardi.");
  }
});
