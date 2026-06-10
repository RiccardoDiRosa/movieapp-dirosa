# CineVault 🎬

App web in stile Netflix che mostra film e serie TV usando l'API pubblica di TMDB (https://www.themoviedb.org).

**Autori:** Riccardo Di Rosa 
**Corso:** Front-End

---

## Endpoint TMDB usati

| Pagina | Endpoint | Note |
|---|---|---|
| Home — Film trending | `GET /trending/movie/day` | Lingua: it-IT |
| Home — Serie trending | `GET /trending/tv/day` | Lingua: it-IT |
| `/movies` | `GET /movie/popular` | Film popolari |
| `/series` | `GET /tv/popular` | Serie popolari |
| `/detail` (bonus) | `GET /movie/{id}` o `/tv/{id}` | Dettaglio singolo |

---
