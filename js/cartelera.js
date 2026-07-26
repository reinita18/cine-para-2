import {
  branding,
  mensajes,
  obtenerPelicula,
  peliculas
} from "../data/contenido.js";

const estados = {
  disponible: {
    texto: "Disponible",
    clase: ""
  },
  agotada: {
    texto: "Agotada",
    clase: "status-badge--sold"
  },
  proximamente: {
    texto: "Próximamente",
    clase: "status-badge--soon"
  }
};

function prepararSeleccion(contexto, peliculaId) {
  if (contexto.estado.peliculaId !== peliculaId) {
    contexto.estado.peliculaId = peliculaId;
    contexto.estado.horarioId = null;
    contexto.estado.asientos = [];
    contexto.estado.pedidoAntes = {};
    contexto.persistir();
  }
}

export function renderBienvenida(contenedor, contexto) {
  contenedor.innerHTML = `
    <section class="view hero" aria-labelledby="welcome-title">
      <div class="hero__content">
        <p class="hero__kicker">${branding.eslogan}</p>
        <p class="hero__lead">
          <strong>${mensajes.bienvenidaTitulo}</strong><br />
          ${mensajes.bienvenidaFrase}
        </p>
        <div class="hero__actions">
          <button class="button button--primary" type="button" data-action="movies">
            Ver cartelera
          </button>
          <button class="button button--secondary" type="button" data-action="saved-ticket">
            Ver boleto guardado
          </button>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <div class="hero__badge">
          <strong>Función privada</strong>
          <span></span>
        </div>
      </div>
    </section>
  `;

  contenedor.querySelector('[data-action="movies"]').addEventListener("click", () => {
    contexto.navegar("movies");
  });

  contenedor
    .querySelector('[data-action="saved-ticket"]')
    .addEventListener("click", () => {
      contexto.navegar("saved-ticket");
    });
}

export function renderCartelera(contenedor, contexto) {
  const tarjetas = peliculas
    .map((pelicula) => {
      const estado = estados[pelicula.estado];
      const seleccionable = pelicula.estado === "disponible";
      const textoBoton = seleccionable
        ? "Ver sinopsis"
        : pelicula.estado === "proximamente"
          ? "Muy pronto"
          : "Función agotada";

      return `
        <article class="movie-card ${seleccionable ? "" : "movie-card--disabled"}">
          <div class="movie-card__poster-wrap">
            <img
              class="movie-card__poster"
              src="${pelicula.poster}"
              alt="Póster ilustrativo de ${pelicula.titulo}"
              loading="lazy"
              width="600"
              height="800"
            />
            <span class="movie-card__status status-badge ${estado.clase}">
              ${estado.texto}
            </span>
          </div>
          <div class="movie-card__body">
            <h2 class="movie-card__title">${pelicula.titulo}</h2>
            <div class="movie-card__meta" aria-label="Información de la película">
              <span>${pelicula.genero}</span>
              <span>${pelicula.duracion}</span>
              <span>Clas. ${pelicula.clasificacion}</span>
            </div>
            <p class="movie-card__synopsis">${pelicula.sinopsis}</p>
            <button
              class="button ${seleccionable ? "button--primary" : "button--secondary"}"
              type="button"
              data-movie-id="${pelicula.id}"
              ${seleccionable ? "" : "disabled"}
            >
              ${textoBoton}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="movies-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">Cartelera de la casa</p>
          <h1 id="movies-title">${mensajes.carteleraTitulo}</h1>
          <p class="view__lead">${mensajes.carteleraDescripcion}</p>
        </div>
      </header>
      <div class="movie-grid">${tarjetas}</div>
    </section>
  `;

  contenedor.querySelectorAll("[data-movie-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const peliculaId = boton.dataset.movieId;
      prepararSeleccion(contexto, peliculaId);
      contexto.navegar("movie-detail", { id: peliculaId });
    });
  });
}

export function renderDetallePelicula(contenedor, contexto, parametros = {}) {
  const pelicula = obtenerPelicula(parametros.id ?? contexto.estado.peliculaId);

  if (!pelicula) {
    contexto.navegar("movies", {}, { reemplazar: true });
    return;
  }

  const seleccionable = pelicula.estado === "disponible";
  prepararSeleccion(contexto, pelicula.id);

  contenedor.innerHTML = `
    <section class="view movie-detail" aria-labelledby="movie-detail-title">
      <div class="movie-detail__poster-frame">
        <img
          class="movie-detail__poster"
          src="${pelicula.poster}"
          alt="Póster ilustrativo de ${pelicula.titulo}"
          width="600"
          height="900"
        />
      </div>
      <div class="movie-detail__copy">
        <p class="view__eyebrow">Selección de cartelera</p>
        <h1 id="movie-detail-title">${pelicula.titulo}</h1>
        <div class="movie-detail__meta" aria-label="Información de la película">
          <span>${pelicula.genero}</span>
          <span>${pelicula.duracion}</span>
          <span>Clasificación ${pelicula.clasificacion}</span>
        </div>
        <p class="movie-detail__synopsis">${pelicula.sinopsis}</p>
        <p class="movie-detail__note">${pelicula.informacionAdicional}</p>
        <div class="button-row">
          <button class="button button--secondary" type="button" data-action="back">
            Regresar a cartelera
          </button>
          <button
            class="button button--primary"
            type="button"
            data-action="showtimes"
            ${seleccionable ? "" : "disabled"}
          >
            Seleccionar función
          </button>
        </div>
      </div>
    </section>
  `;

  contenedor.querySelector('[data-action="back"]').addEventListener("click", () => {
    contexto.navegar("movies");
  });

  const botonFunciones = contenedor.querySelector('[data-action="showtimes"]');

  if (botonFunciones) {
    botonFunciones.addEventListener("click", () => {
      contexto.navegar("showtimes");
    });
  }
}
