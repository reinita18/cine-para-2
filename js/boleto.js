import {
  branding,
  configuracion,
  mensajes,
  obtenerHorarios,
  obtenerPelicula,
  productos
} from "../data/contenido.js";
import {
  calcularTotalSeleccion,
  convertirSeleccionAItems,
  formatearMoneda,
  generarPatronQR,
  normalizarCodigo
} from "./utils.js";

function crearLineasPedido(items) {
  if (!items?.length) {
    return '<p class="notice">Sin alimentos agregados. Todo listo para la función.</p>';
  }

  return items
    .map(
      (item) => `
        <div class="checkout-line">
          <span>${item.cantidad} × ${item.nombre}</span>
          <strong>${formatearMoneda(item.subtotal)}</strong>
        </div>
      `
    )
    .join("");
}

function crearListaBoleto(items) {
  if (!items?.length) {
    return "<li>Sin alimentos previos.</li>";
  }

  return items
    .map((item) => `<li>${item.cantidad} × ${item.nombre}</li>`)
    .join("");
}

function crearPedidosDurante(pedidos) {
  if (!pedidos?.length) {
    return "";
  }

  const elementos = pedidos
    .flatMap((pedido) => pedido.items)
    .map((item) => `<li>${item.cantidad} × ${item.nombre}</li>`)
    .join("");

  return `
    <div class="ticket__orders">
      <h2>Pedidos durante la función</h2>
      <ul>${elementos}</ul>
    </div>
  `;
}

export function renderConfirmacion(contenedor, contexto) {
  const pelicula = obtenerPelicula(contexto.estado.peliculaId);
  const horario = obtenerHorarios(contexto.estado.peliculaId).find(
    (opcion) => opcion.id === contexto.estado.horarioId
  );
  const productosAntes = productos.filter((producto) => producto.momento === "antes");
  const items = convertirSeleccionAItems(
    productosAntes,
    contexto.estado.pedidoAntes
  );
  const total = calcularTotalSeleccion(
    productosAntes,
    contexto.estado.pedidoAntes
  );

  if (
    !pelicula ||
    !horario ||
    contexto.estado.asientos.length !== configuracion.maximoAsientos
  ) {
    contexto.navegar("movies", {}, { reemplazar: true });
    return;
  }

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="checkout-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">Confirmación</p>
          <h1 id="checkout-title">Revisa tu reservación</h1>
          <p class="view__lead">
            Confirma los detalles y utiliza el código especial para generar el boleto.
          </p>
        </div>
      </header>

      <div class="checkout-layout">
        <div class="checkout-summary">
          <section class="checkout-section" aria-labelledby="checkout-movie-title">
            <h2 id="checkout-movie-title">Función</h2>
            <div class="checkout-line">
              <span>Película</span>
              <strong>${pelicula.titulo}</strong>
            </div>
            <div class="checkout-line">
              <span>Fecha</span>
              <strong>${configuracion.fechaFuncion}</strong>
            </div>
            <div class="checkout-line">
              <span>Horario</span>
              <strong>${horario.hora}</strong>
            </div>
            <div class="checkout-line">
              <span>Asientos</span>
              <strong>${contexto.estado.asientos.join(" y ")}</strong>
            </div>
          </section>

          <section class="checkout-section" aria-labelledby="checkout-food-title">
            <h2 id="checkout-food-title">Dulcería</h2>
            ${crearLineasPedido(items)}
            <div class="checkout-line">
              <span>Total</span>
              <strong>${formatearMoneda(total)}</strong>
            </div>
          </section>

          <button class="button button--secondary" type="button" data-action="back">
            Modificar pedido
          </button>
        </div>

        <form class="payment-card" id="confirmation-form" novalidate>
          <h2>Tu código especial</h2>
          <p>Ingresa el código preparado para esta función privada.</p>
          <div class="form-field">
            <label for="confirmation-code">Código de confirmación</label>
            <input
              id="confirmation-code"
              name="confirmationCode"
              type="text"
              autocomplete="off"
              spellcheck="false"
              inputmode="text"
              aria-describedby="confirmation-error"
              required
            />
            <p id="confirmation-error" class="form-error" role="alert"></p>
          </div>
          <button class="button button--primary" type="submit">
            Confirmar función
          </button>
        </form>
      </div>
    </section>
  `;

  const formulario = contenedor.querySelector("#confirmation-form");
  const campoCodigo = contenedor.querySelector("#confirmation-code");
  const mensajeError = contenedor.querySelector("#confirmation-error");
  const botonConfirmar = formulario.querySelector('button[type="submit"]');

  contenedor.querySelector('[data-action="back"]').addEventListener("click", () => {
    contexto.navegar("concessions-before");
  });

  campoCodigo.addEventListener("input", () => {
    campoCodigo.setAttribute("aria-invalid", "false");
    mensajeError.textContent = "";
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const codigo = normalizarCodigo(campoCodigo.value);
    const codigoValido = normalizarCodigo(configuracion.codigoConfirmacion);

    if (!codigo || codigo !== codigoValido) {
      campoCodigo.setAttribute("aria-invalid", "true");
      mensajeError.textContent = mensajes.codigoIncorrecto;
      campoCodigo.focus();
      return;
    }

    botonConfirmar.disabled = true;
    botonConfirmar.textContent = "Generando boleto…";

    const reservacion = contexto.confirmarReservacion();

    if (!reservacion) {
      botonConfirmar.disabled = false;
      botonConfirmar.textContent = "Confirmar función";
      mensajeError.textContent = "No fue posible confirmar. Inténtalo nuevamente.";
      return;
    }

    contexto.notificar("Reservación confirmada. Tu boleto está listo.", "success");
    contexto.navegar("ticket");
  });
}

export function renderBoleto(contenedor, contexto, { guardado = false } = {}) {
  const reservacion = contexto.obtenerReservacionActual();

  if (!reservacion) {
    renderBoletoVacio(contenedor, contexto);
    return;
  }

  const patron = generarPatronQR(reservacion.folio)
    .map((relleno) => `<i class="${relleno ? "is-filled" : ""}"></i>`)
    .join("");

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="ticket-page-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">${guardado ? "Boleto guardado" : "Todo listo"}</p>
          <h1 id="ticket-page-title">Tu entrada para esta función</h1>
          <p class="view__lead">Presenta este boleto al entrar a la sala.</p>
        </div>
      </header>

      <div class="ticket-stage">
        <article class="ticket" aria-label="Boleto digital confirmado">
          <div class="ticket__main">
            <div class="ticket__brand">
              <img
                src="${branding.submarca}"
                alt=""
                width="256"
                height="256"
              />
              <div>
                <strong>${branding.nombre}</strong>
                <span>${branding.eslogan}</span>
              </div>
            </div>

            <div class="ticket__movie">
              <img
                class="ticket__poster"
                src="${reservacion.pelicula.poster}"
                alt="Póster de ${reservacion.pelicula.titulo}"
                width="600"
                height="900"
              />
              <div>
                <span class="ticket__status">${reservacion.estado}</span>
                <h1>${reservacion.pelicula.titulo}</h1>
                <p>${reservacion.pelicula.genero} · ${reservacion.pelicula.duracion}</p>
              </div>
            </div>

            <div class="ticket__details">
              <div class="ticket__detail">
                <span>Fecha</span>
                <strong>${reservacion.fecha}</strong>
              </div>
              <div class="ticket__detail">
                <span>Horario</span>
                <strong>${reservacion.horario.hora}</strong>
              </div>
              <div class="ticket__detail">
                <span>Asientos</span>
                <strong>${reservacion.asientos.join(" · ")}</strong>
              </div>
            </div>

            <div class="ticket__orders">
              <h2>Pedido previo</h2>
              <ul>${crearListaBoleto(reservacion.pedidoAntes)}</ul>
            </div>

            ${crearPedidosDurante(reservacion.pedidosDurante)}

            <p class="ticket__message">${reservacion.mensaje}</p>
          </div>

          <aside class="ticket__stub" aria-label="Folio del boleto">
            <div class="qr-grid" aria-label="Código QR decorativo">${patron}</div>
            <p class="ticket__folio-label">Folio</p>
            <p class="ticket__folio">${reservacion.folio}</p>
            <span class="status-badge">Confirmado</span>
          </aside>
        </article>

        <div class="ticket-actions">
          <button class="button button--primary" type="button" data-action="save">
            Guardar boleto
          </button>
          <button class="button button--secondary" type="button" data-action="during-order">
            Ordenar durante la película
          </button>
          <button class="button button--ghost" type="button" data-action="home">
            Volver al inicio
          </button>
        </div>
      </div>
    </section>
  `;

  contenedor.querySelector('[data-action="save"]').addEventListener("click", () => {
    contexto.guardarBoleto(reservacion);
    contexto.notificar("Boleto guardado en este dispositivo.", "success");
  });

  contenedor
    .querySelector('[data-action="during-order"]')
    .addEventListener("click", () => {
      contexto.navegar("concessions-during");
    });

  contenedor.querySelector('[data-action="home"]').addEventListener("click", () => {
    contexto.navegar("home");
  });
}

export function renderBoletoVacio(contenedor, contexto) {
  contenedor.innerHTML = `
    <section class="view empty-state" aria-labelledby="empty-ticket-title">
      <div>
        <div class="empty-state__icon" aria-hidden="true">🎟️</div>
        <h1 id="empty-ticket-title">${mensajes.sinBoleto}</h1>
        <p>${mensajes.sinBoletoDetalle}</p>
        <button class="button button--primary" type="button" data-action="movies">
          Ir a cartelera
        </button>
      </div>
    </section>
  `;

  contenedor.querySelector('[data-action="movies"]').addEventListener("click", () => {
    contexto.navegar("movies");
  });
}
