// ────────────────────────────────────────────────────────
//  detail.js — Pagina dettaglio film o serie (?id=X&type=Y)
// ────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  const params    = new URLSearchParams(window.location.search);
  const id        = params.get("id");
  const mediaType = params.get("type"); // "movie" o "tv"

  const container = document.getElementById("detail-container");

  // Controllo parametri mancanti
  if (!id || !mediaType) {
    window.utils.showError(container, "Parametri non validi. Torna alla home.");
    return;
  }

  window.utils.showLoading(container);

  try {
    // GET /movie/{id} oppure /tv/{id}
    const item = await window.api.fetchTMDB(`/${mediaType}/${id}`);

    const title    = item.title || item.name || "Titolo sconosciuto";
    const date     = item.release_date || item.first_air_date;
    const year     = window.api.getYear(date);
    const poster   = window.api.getPosterUrl(item.poster_path);
    const overview = item.overview || "Nessuna descrizione disponibile.";
    const rating   = item.vote_average ? item.vote_average.toFixed(1) : "N/D";
    const genres   = item.genres ? item.genres.map(g => g.name).join(", ") : "N/D";

    container.innerHTML = `
      <div class="detail">
        <div class="detail__poster-wrap">
          <img
            class="detail__poster"
            src="${poster}"
            alt="Poster di ${title}"
          />
        </div>
        <div class="detail__info">
          <h1 class="detail__title">${title}</h1>
          <div class="detail__meta">
            <span class="detail__year">${year}</span>
            <span class="detail__rating">⭐ ${rating}</span>
            <span class="detail__genres">${genres}</span>
          </div>
          <p class="detail__overview">${overview}</p>
          <a class="btn-back" href="javascript:history.back()">← Indietro</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    window.utils.showError(container, "Impossibile caricare i dettagli. Riprova più tardi.");
  }
});
