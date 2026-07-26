import {
  categoriasOrden,
  configuracion,
  productos
} from "../data/contenido.js";
import {
  agruparPor,
  calcularTotalSeleccion,
  convertirSeleccionAItems,
  formatearMoneda,
  limitarNumero
} from "./utils.js";

function obtenerProductosPorMomento(momento) {
  return productos.filter((producto) => producto.momento === momento);
}

function crearTarjetaProducto(producto, seleccion) {
  const maximo = Math.min(producto.limite, producto.stock);
  const cantidad = limitarNumero(seleccion[producto.id], 0, maximo);
  const disponible = producto.disponible && producto.stock > 0;

  return `
    <article
      class="product-card ${disponible ? "" : "product-card--sold"}"
      data-product-card="${producto.id}"
    >
      <img
        class="product-card__image"
        src="${producto.imagen}"
        alt="${producto.nombre}"
        width="400"
        height="400"
        loading="lazy"
      />
      <div class="product-card__content">
        <div class="product-card__header">
          <div>
            <h3>${producto.nombre}</h3>
            <span class="product-card__price">${formatearMoneda(producto.precio)}</span>
          </div>
          ${
            disponible
              ? ""
              : '<span class="status-badge status-badge--sold">Agotado</span>'
          }
        </div>
        <p class="product-card__description">${producto.descripcion}</p>
        <p class="product-card__stock">
          ${
            disponible
              ? `Disponible: ${producto.stock} · Máximo: ${producto.limite}`
              : "No disponible para esta función"
          }
        </p>
        <div class="quantity-control" aria-label="Cantidad de ${producto.nombre}">
          <button
            type="button"
            data-quantity-action="decrease"
            data-product-id="${producto.id}"
            aria-label="Disminuir ${producto.nombre}"
            ${!disponible || cantidad <= 0 ? "disabled" : ""}
          >−</button>
          <output id="quantity-${producto.id}" aria-live="polite">${cantidad}</output>
          <button
            type="button"
            data-quantity-action="increase"
            data-product-id="${producto.id}"
            aria-label="Aumentar ${producto.nombre}"
            ${!disponible || cantidad >= maximo ? "disabled" : ""}
          >+</button>
        </div>
      </div>
    </article>
  `;
}

function crearCategorias(momento, seleccion) {
  const productosMomento = obtenerProductosPorMomento(momento);
  const grupos = agruparPor(productosMomento, (producto) => producto.categoria);
  const orden = categoriasOrden[momento] ?? [...grupos.keys()];

  return orden
    .filter((categoria) => grupos.has(categoria))
    .map((categoria) => {
      const tarjetas = grupos
        .get(categoria)
        .map((producto) => crearTarjetaProducto(producto, seleccion))
        .join("");

      return `
        <section class="category-block" aria-labelledby="category-${momento}-${categoria.replace(/\s+/g, "-")}">
          <h2
            id="category-${momento}-${categoria.replace(/\s+/g, "-")}"
            class="category-heading"
          >
            ${categoria}
          </h2>
          <div class="product-grid">${tarjetas}</div>
        </section>
      `;
    })
    .join("");
}

function crearResumenItems(productosMomento, seleccion) {
  const items = convertirSeleccionAItems(productosMomento, seleccion);

  if (!items.length) {
    return '<li class="order-summary__empty">Aún no has agregado productos.</li>';
  }

  return items
    .map(
      (item) => `
        <li class="order-summary__item">
          <span>
            <strong>${item.nombre}</strong>
            <span>${item.cantidad} × ${formatearMoneda(item.precio)}</span>
          </span>
          <strong>${formatearMoneda(item.subtotal)}</strong>
        </li>
      `
    )
    .join("");
}

export function renderDulceria(contenedor, contexto, momento = "antes") {
  const esDurante = momento === "durante";
  const seleccion = esDurante
    ? contexto.estado.pedidoDurante
    : contexto.estado.pedidoAntes;
  const productosMomento = obtenerProductosPorMomento(momento);
  const titulo = esDurante
    ? "Ordena durante la película"
    : "Elige algo de la dulcería";
  const descripcion = esDurante
    ? "Pide solo lo que necesites y continúa disfrutando la función."
    : " ";
  const etiquetaPaso = esDurante ? "Servicio a tu asiento" : "Paso 3 de 3";
  const textoBoton = esDurante ? "Enviar pedido" : "Continuar";
  const categoriasHtml = crearCategorias(momento, seleccion);
  const totalInicial = calcularTotalSeleccion(productosMomento, seleccion);
  const itemsIniciales = convertirSeleccionAItems(productosMomento, seleccion);

  contenedor.innerHTML = `
    <section class="view" aria-labelledby="concessions-title">
      <header class="view__header">
        <div>
          <p class="view__eyebrow">${etiquetaPaso}</p>
          <h1 id="concessions-title">${titulo}</h1>
          <p class="view__lead">${descripcion}</p>
        </div>
      </header>

      <div class="concessions-layout">
        <div>${categoriasHtml}</div>

        <aside class="summary-card order-summary" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">Resumen del pedido</h2>
          <ul id="order-summary-items" class="order-summary__items">
            ${crearResumenItems(productosMomento, seleccion)}
          </ul>
          <div class="order-summary__total">
            <span>Total</span>
            <strong id="order-total">${formatearMoneda(totalInicial)}</strong>
          </div>
          <button
            class="button button--primary"
            type="button"
            data-action="continue"
            ${esDurante && !itemsIniciales.length ? "disabled" : ""}
          >
            ${textoBoton}
          </button>
          <button class="button button--ghost" type="button" data-action="back">
            ${esDurante ? "Volver al boleto" : "Regresar a asientos"}
          </button>
        </aside>
      </div>
    </section>
  `;

  const listaResumen = contenedor.querySelector("#order-summary-items");
  const salidaTotal = contenedor.querySelector("#order-total");
  const botonContinuar = contenedor.querySelector('[data-action="continue"]');

  function actualizarResumen() {
    const total = calcularTotalSeleccion(productosMomento, seleccion);
    const items = convertirSeleccionAItems(productosMomento, seleccion);

    listaResumen.innerHTML = crearResumenItems(productosMomento, seleccion);
    salidaTotal.textContent = formatearMoneda(total);

    if (esDurante) {
      botonContinuar.disabled = items.length === 0;
    }
  }

  function actualizarControles(producto) {
    const tarjeta = contenedor.querySelector(
      `[data-product-card="${producto.id}"]`
    );

    if (!tarjeta) {
      return;
    }

    const maximo = Math.min(producto.limite, producto.stock);
    const cantidad = limitarNumero(seleccion[producto.id], 0, maximo);
    const salidaCantidad = tarjeta.querySelector("output");
    const botonMenos = tarjeta.querySelector('[data-quantity-action="decrease"]');
    const botonMas = tarjeta.querySelector('[data-quantity-action="increase"]');

    salidaCantidad.value = cantidad;
    salidaCantidad.textContent = cantidad;
    botonMenos.disabled = cantidad <= 0;
    botonMas.disabled = cantidad >= maximo;
  }

  contenedor.querySelectorAll("[data-quantity-action]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const producto = productosMomento.find(
        (item) => item.id === boton.dataset.productId
      );

      if (!producto || !producto.disponible || producto.stock <= 0) {
        return;
      }

      const maximo = Math.min(producto.limite, producto.stock);
      const actual = limitarNumero(seleccion[producto.id], 0, maximo);
      const cambio = boton.dataset.quantityAction === "increase" ? 1 : -1;
      const siguiente = limitarNumero(actual + cambio, 0, maximo);

      if (siguiente === 0) {
        delete seleccion[producto.id];
      } else {
        seleccion[producto.id] = siguiente;
      }

      if (esDurante) {
        contexto.estado.pedidoDurante = { ...seleccion };
      } else {
        contexto.estado.pedidoAntes = { ...seleccion };
      }

      contexto.persistir();
      actualizarControles(producto);
      actualizarResumen();
    });
  });

  contenedor.querySelector('[data-action="back"]').addEventListener("click", () => {
    contexto.navegar(esDurante ? "saved-ticket" : "seats");
  });

  botonContinuar.addEventListener("click", async () => {
    if (esDurante) {
      botonContinuar.disabled = true;
      const items = convertirSeleccionAItems(productosMomento, seleccion);

      if (!items.length) {
        return;
      }

      const resultado = contexto.confirmarPedidoDurante(items);

      if (!resultado) {
        botonContinuar.disabled = false;
        contexto.notificar("No fue posible guardar el pedido.", "warning");
        return;
      }

      contexto.estado.pedidoDurante = {};
      contexto.persistir();
      contexto.notificar(configuracion.mensajePedidoEnviado, "success");
      contexto.navegar("saved-ticket");
      return;
    }

    contexto.navegar("checkout");
  });
}
