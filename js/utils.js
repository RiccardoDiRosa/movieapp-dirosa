//  utils.js — Helper DOM e formatting
/**
 * Crea e restituisce una card DOM per un film o una serie.
 * @param {Object} item       - oggetto TMDB (film o serie)
 * @param {string} mediaType  - "movie" oppure "tv"
 * @returns {HTMLElement}
 */
function createCard(item, mediaType) {
  const title = item.title || item.name || "Titolo sconosciuto";
  const date  = item.release_date || item.first_air_date;
  const year  = window.api.getYear(date);
  const poster = window.api.getPosterUrl(item.poster_path);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/D";

  const card = document.createElement("article");
  card.classList.add("card");
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-type", mediaType);

  card.innerHTML = `
    <div class="card__poster-wrap">
      <img
        class="card__poster"
        src="${poster}"
        alt="Poster di ${title}"
        loading="lazy"
      />
      <span class="card__rating">⭐ ${rating}</span>
    </div>
    <div class="card__info">
      <h3 class="card__title">${title}</h3>
      <span class="card__year">${year}</span>
    </div>
  `;

  // Click → pagina dettaglio
  card.addEventListener("click", () => {
    window.location.href = `detail.html?id=${item.id}&type=${mediaType}`;
  });

  return card;
}

/**
 * Mostra un messaggio di errore in un container.
 * @param {HTMLElement} container
 * @param {string} message
 */
function showError(container, message) {
  container.innerHTML = `<p class="error-msg">⚠️ ${message}</p>`;
}

/**
 * Mostra un testo di caricamento.
 * @param {HTMLElement} container
 */
function showLoading(container) {
  container.innerHTML = `<p class="loading-msg">Caricamento in corso…</p>`;
}

/**
 * Popola un container con un array di item TMDB.
 * @param {HTMLElement} container
 * @param {Array}       items
 * @param {string}      mediaType - "movie" o "tv"
 */
function renderCards(container, items, mediaType) {
  container.innerHTML = "";
  const cards = items.map(item => createCard(item, mediaType));
  cards.forEach(card => container.appendChild(card));
}

window.utils = { createCard, showError, showLoading, renderCards };
