import {
  configuracion,
  obtenerHorarios,
  obtenerPelicula
} from "../data/contenido.js";

export function renderFunciones(contenedor, contexto) {
  const pelicula = obtenerPelicula(contexto.estado.peliculaId);

  if (!pelicula) {
    contexto.navegar("movies", {}, { reemplazar: true });
    return;
  }

  const horarios = obtenerHorarios(pelicula.id);
  const opciones = horarios
    .map((horario) => {
      const disponible = horario.estado === "disponible";
      const seleccionado = contexto.estado.horarioId === horario.id;

      return `
        <button
          class="showtime-option"
          type="button"
          data-showtime-id="${horario.id}"
          aria-pressed="${seleccionado}"
          ${disponible ? "" : "disabled"}
        >
          <span>
            <span class="showtime-option__time">${horario.hora}</span>
            <span class="showtime-option__label">${configuracion.fechaFuncion}</span>
          </span>
          <span class="status-badge ${disponible ? "" : "status-badge--sold"}">
            ${disponible ? "Disponible" : "Agotado"}
          </span>
        </button>
      `;
    })
    .join("");

  const horarioActual = horarios.find(
    (horario) => horario.id === contexto.estado.horarioId
  );

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="showtimes-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">Paso 1 de 3</p>
          <h1 id="showtimes-title">Selecciona la función</h1>
          <p class="view__lead">
            Solo una función conserva dos lugares disponibles para esta noche.
          </p>
        </div>
      </header>

      <div class="showtime-layout">
        <div class="showtime-list" role="group" aria-label="Horarios disponibles">
          ${opciones}
        </div>

        <aside class="selection-card" aria-label="Resumen de selección">
        
          <img
            class="selection-card__poster"
            src="${pelicula.poster}"
            alt=""
            width="600"
            height="900"
          />
          <h2>${pelicula.titulo}</h2>
          <dl>
            <dt>Fecha</dt>
            <dd>${configuracion.fechaFuncion}</dd>
            <dt>Horario</dt>
            <dd id="selected-showtime">${horarioActual?.hora ?? "Sin seleccionar"}</dd>
          </dl>
          <div class="button-row">
            <button class="button button--secondary" type="button" data-action="back">
              Regresar
            </button>
            <button
              class="button button--primary"
              type="button"
              data-action="continue"
              ${horarioActual ? "" : "disabled"}
            >
              Elegir asientos
            </button>
          </div>
        </aside>
      </div>
    </section>
  `;

  const salidaHorario = contenedor.querySelector("#selected-showtime");
  const botonContinuar = contenedor.querySelector('[data-action="continue"]');

  contenedor.querySelectorAll("[data-showtime-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const horarioId = boton.dataset.showtimeId;
      const horario = horarios.find((item) => item.id === horarioId);

      if (!horario || horario.estado !== "disponible") {
        return;
      }

      const cambioHorario = contexto.estado.horarioId !== horarioId;
      contexto.estado.horarioId = horarioId;

      if (cambioHorario) {
        contexto.estado.asientos = [];
        contexto.estado.pedidoAntes = {};
      }

      contexto.persistir();

      contenedor.querySelectorAll("[data-showtime-id]").forEach((opcion) => {
        opcion.setAttribute(
          "aria-pressed",
          String(opcion.dataset.showtimeId === horarioId)
        );
      });

      salidaHorario.textContent = horario.hora;
      botonContinuar.disabled = false;
    });
  });

  contenedor.querySelector('[data-action="back"]').addEventListener("click", () => {
    contexto.navegar("movie-detail", { id: pelicula.id });
  });

  botonContinuar.addEventListener("click", () => {
    contexto.navegar("seats");
  });
}
