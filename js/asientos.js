import {
  configuracion,
  obtenerHorarios,
  obtenerPelicula,
  sala
} from "../data/contenido.js";

function crearMapaAsientos() {
  return sala.filas.map((fila) => {
    const botones = Array.from({ length: sala.asientosPorFila }, (_, indice) => {
      const numero = indice + 1;
      const codigo = `${fila}${numero}`;
      return codigo;
    });

    return { fila, asientos: botones };
  });
}

export function renderAsientos(contenedor, contexto) {
  const pelicula = obtenerPelicula(contexto.estado.peliculaId);
  const horarios = obtenerHorarios(contexto.estado.peliculaId);
  const horario = horarios.find(
    (opcion) => opcion.id === contexto.estado.horarioId
  );

  if (!pelicula || !horario) {
    contexto.navegar("showtimes", {}, { reemplazar: true });
    return;
  }

  const seleccionados = new Set(contexto.estado.asientos);
  const disponibles = new Set(sala.disponibles);

  const filasHtml = crearMapaAsientos()
    .map(({ fila, asientos }) => {
      const asientosHtml = asientos
        .map((codigo) => {
          const disponible = disponibles.has(codigo);
          const seleccionado = seleccionados.has(codigo);
          const claseEstado = seleccionado
            ? "seat--selected"
            : disponible
              ? "seat--available"
              : "seat--sold";
          const estadoTexto = seleccionado
            ? "seleccionado"
            : disponible
              ? "disponible"
              : "vendido";

          return `
            <button
              class="seat ${claseEstado}"
              type="button"
              data-seat-code="${codigo}"
              aria-label="Asiento ${codigo}, ${estadoTexto}"
              aria-pressed="${seleccionado}"
              ${disponible ? "" : "disabled"}
            >
              ${disponible ? codigo : ""}
            </button>
          `;
        })
        .join("");

      return `
        <div class="seat-row">
          <span class="seat-row__label" aria-hidden="true">${fila}</span>
          ${asientosHtml}
        </div>
      `;
    })
    .join("");

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="seats-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">Paso 2 de 3</p>
          <h1 id="seats-title">Elige los dos asientos</h1>
          <p class="view__lead">
            Los lugares D5 y D6 están juntos y centrados para disfrutar mejor la función.
          </p>
        </div>
      </header>

      <div class="seat-page">
        <div class="seat-room" aria-label="Sala de cine">
          <div class="cinema-screen" aria-hidden="true"></div>
          <p class="cinema-screen__label">Pantalla</p>

          <div class="seat-grid" role="group" aria-label="Mapa de asientos">
            ${filasHtml}
          </div>

          <div class="seat-legend" aria-label="Leyenda de asientos">
            <span><i class="legend--available"></i> Disponible</span>
            <span><i class="legend--selected"></i> Seleccionado</span>
            <span><i class="legend--sold"></i> Vendido</span>
          </div>
        </div>

        <aside class="selection-card" aria-label="Resumen de asientos">
          <h2>Tu función</h2>
          <p
            id="seat-counter"
            class="seat-counter"
            aria-live="polite"
          >
            ${seleccionados.size} de ${configuracion.maximoAsientos} asientos seleccionados
          </p>
          <dl>
            <dt>Película</dt>
            <dd>${pelicula.titulo}</dd>
            <dt>Horario</dt>
            <dd>${horario.hora}</dd>
            <dt>Asientos</dt>
            <dd id="selected-seats">${
              seleccionados.size ? [...seleccionados].join(" y ") : "Sin seleccionar"
            }</dd>
          </dl>
          <div class="button-row">
            <button class="button button--secondary" type="button" data-action="back">
              Regresar
            </button>
            <button
              class="button button--primary"
              type="button"
              data-action="continue"
              ${seleccionados.size === configuracion.maximoAsientos ? "" : "disabled"}
            >
              Ir a dulcería
            </button>
          </div>
        </aside>
      </div>
    </section>
  `;

  const contador = contenedor.querySelector("#seat-counter");
  const salidaAsientos = contenedor.querySelector("#selected-seats");
  const botonContinuar = contenedor.querySelector('[data-action="continue"]');

  function actualizarInterfaz() {
    const total = seleccionados.size;
    contador.textContent = `${total} de ${configuracion.maximoAsientos} asientos seleccionados`;
    salidaAsientos.textContent = total
      ? [...seleccionados].sort().join(" y ")
      : "Sin seleccionar";
    botonContinuar.disabled = total !== configuracion.maximoAsientos;
  }

  contenedor.querySelectorAll("[data-seat-code]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const codigo = boton.dataset.seatCode;

      if (!disponibles.has(codigo)) {
        return;
      }

      if (seleccionados.has(codigo)) {
        seleccionados.delete(codigo);
        boton.classList.remove("seat--selected");
        boton.classList.add("seat--available");
        boton.setAttribute("aria-pressed", "false");
        boton.setAttribute("aria-label", `Asiento ${codigo}, disponible`);
      } else {
        if (seleccionados.size >= configuracion.maximoAsientos) {
          contexto.notificar("Solo puedes seleccionar dos asientos.", "warning");
          return;
        }

        seleccionados.add(codigo);
        boton.classList.remove("seat--available");
        boton.classList.add("seat--selected");
        boton.setAttribute("aria-pressed", "true");
        boton.setAttribute("aria-label", `Asiento ${codigo}, seleccionado`);
      }

      contexto.estado.asientos = [...seleccionados].sort();
      contexto.persistir();
      actualizarInterfaz();
    });
  });

  contenedor.querySelector('[data-action="back"]').addEventListener("click", () => {
    contexto.navegar("showtimes");
  });

  botonContinuar.addEventListener("click", () => {
    contexto.navegar("concessions-before");
  });
}
