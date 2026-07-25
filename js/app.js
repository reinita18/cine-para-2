import {
  configuracion,
  obtenerHorarios,
  obtenerPelicula,
  productos
} from "../data/contenido.js";
import { renderAsientos } from "./asientos.js";
import {
  renderBienvenida,
  renderCartelera,
  renderDetallePelicula
} from "./cartelera.js";
import {
  renderBoleto,
  renderConfirmacion
} from "./boleto.js";
import { renderDulceria } from "./dulceria.js";
import { renderFunciones } from "./funciones.js";
import { crearRouter } from "./router.js";
import {
  actualizarPedidoDuranteFuncion,
  eliminarBorrador,
  eliminarReservacion,
  guardarBorrador,
  guardarReservacion,
  obtenerBorrador,
  obtenerReservacion
} from "./storage.js";
import {
  calcularTotalSeleccion,
  convertirSeleccionAItems,
  enfocarTitulo,
  generarFolio
} from "./utils.js";

const contenedorPrincipal = document.querySelector("#app-main");
const regionToast = document.querySelector("#toast-region");
const dialogoReinicio = document.querySelector("#reset-dialog");

const borradorGuardado = obtenerBorrador();

const estado = {
  peliculaId: borradorGuardado?.peliculaId ?? null,
  horarioId: borradorGuardado?.horarioId ?? null,
  asientos: borradorGuardado?.asientos ?? [],
  pedidoAntes: borradorGuardado?.pedidoAntes ?? {},
  pedidoDurante: borradorGuardado?.pedidoDurante ?? {},
  reservacion: obtenerReservacion()
};

let router;

function persistirBorrador() {
  guardarBorrador({
    peliculaId: estado.peliculaId,
    horarioId: estado.horarioId,
    asientos: estado.asientos,
    pedidoAntes: estado.pedidoAntes,
    pedidoDurante: estado.pedidoDurante
  });
}

function notificar(mensaje, tipo = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.setAttribute("role", "status");
  toast.textContent = mensaje;
  regionToast.append(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3800);
}

function confirmarReservacion() {
  const pelicula = obtenerPelicula(estado.peliculaId);
  const horario = obtenerHorarios(estado.peliculaId).find(
    (opcion) => opcion.id === estado.horarioId
  );
  const productosAntes = productos.filter((producto) => producto.momento === "antes");

  if (
    !pelicula ||
    !horario ||
    estado.asientos.length !== configuracion.maximoAsientos
  ) {
    return null;
  }

  const pedidoAntes = convertirSeleccionAItems(
    productosAntes,
    estado.pedidoAntes
  );

  const reservacion = {
    version: 1,
    folio: generarFolio(),
    creadaEn: new Date().toISOString(),
    estado: "Reservación confirmada",
    pelicula: {
      id: pelicula.id,
      titulo: pelicula.titulo,
      poster: pelicula.poster,
      genero: pelicula.genero,
      duracion: pelicula.duracion,
      clasificacion: pelicula.clasificacion
    },
    fecha: configuracion.fechaFuncion,
    horario: {
      id: horario.id,
      hora: horario.hora
    },
    asientos: [...estado.asientos],
    pedidoAntes,
    totalAntes: calcularTotalSeleccion(productosAntes, estado.pedidoAntes),
    pedidosDurante: [],
    mensaje: configuracion.mensajeBoleto
  };

  const guardada = guardarReservacion(reservacion);

  if (!guardada) {
    return null;
  }

  estado.reservacion = reservacion;
  eliminarBorrador();
  return reservacion;
}

function confirmarPedidoDurante(items) {
  if (!items.length) {
    return null;
  }

  const pedido = {
    id: generarFolio("PED"),
    creadoEn: new Date().toISOString(),
    items,
    total: items.reduce((acumulado, item) => acumulado + item.subtotal, 0),
    estado: "Enviado al asiento"
  };

  const actualizada = actualizarPedidoDuranteFuncion(pedido);

  if (!actualizada) {
    return null;
  }

  estado.reservacion = actualizada;
  return actualizada;
}

function guardarBoletoActual(reservacion) {
  const guardado = guardarReservacion(reservacion);

  if (guardado) {
    estado.reservacion = reservacion;
  }

  return guardado;
}

function obtenerReservacionActual() {
  const reservacion = obtenerReservacion();
  estado.reservacion = reservacion;
  return reservacion;
}

function crearContexto() {
  return {
    estado,
    persistir: persistirBorrador,
    notificar,
    navegar(vista, parametros = {}, opciones = {}) {
      router.navegar(vista, parametros, opciones);
    },
    confirmarReservacion,
    confirmarPedidoDurante,
    guardarBoleto: guardarBoletoActual,
    obtenerReservacionActual
  };
}

function actualizarNavegacion(vista) {
  const mapa = {
    home: "home",
    movies: "movies",
    "movie-detail": "movies",
    showtimes: "movies",
    seats: "movies",
    "concessions-before": "movies",
    checkout: "movies",
    ticket: "saved-ticket",
    "saved-ticket": "saved-ticket",
    "concessions-during": "saved-ticket"
  };

  const seccionActiva = mapa[vista];

  document.querySelectorAll("[data-nav]").forEach((boton) => {
    if (boton.dataset.nav === seccionActiva) {
      boton.setAttribute("aria-current", "page");
    } else {
      boton.removeAttribute("aria-current");
    }
  });
}

function tieneSeleccionDeFuncion() {
  return Boolean(
    estado.peliculaId &&
      estado.horarioId &&
      obtenerPelicula(estado.peliculaId)
  );
}

function resolverRuta(vista) {
  if (vista === "showtimes" && !estado.peliculaId) {
    return "movies";
  }

  if (vista === "seats" && !tieneSeleccionDeFuncion()) {
    return "showtimes";
  }

  if (
    ["concessions-before", "checkout"].includes(vista) &&
    estado.asientos.length !== configuracion.maximoAsientos
  ) {
    return "seats";
  }

  if (vista === "concessions-during" && !obtenerReservacionActual()) {
    return "saved-ticket";
  }

  return vista;
}

function renderRuta(vista, parametros = {}) {
  const rutaResuelta = resolverRuta(vista);

  if (rutaResuelta !== vista) {
    router.navegar(rutaResuelta, {}, { reemplazar: true });
    return;
  }

  const contexto = crearContexto();
  actualizarNavegacion(vista);

  switch (vista) {
    case "home":
      renderBienvenida(contenedorPrincipal, contexto);
      break;
    case "movies":
      renderCartelera(contenedorPrincipal, contexto);
      break;
    case "movie-detail":
      renderDetallePelicula(contenedorPrincipal, contexto, parametros);
      break;
    case "showtimes":
      renderFunciones(contenedorPrincipal, contexto);
      break;
    case "seats":
      renderAsientos(contenedorPrincipal, contexto);
      break;
    case "concessions-before":
      renderDulceria(contenedorPrincipal, contexto, "antes");
      break;
    case "checkout":
      renderConfirmacion(contenedorPrincipal, contexto);
      break;
    case "ticket":
      renderBoleto(contenedorPrincipal, contexto, { guardado: false });
      break;
    case "saved-ticket":
      renderBoleto(contenedorPrincipal, contexto, { guardado: true });
      break;
    case "concessions-during":
      renderDulceria(contenedorPrincipal, contexto, "durante");
      break;
    default:
      router.navegar("home", {}, { reemplazar: true });
      return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  enfocarTitulo(contenedorPrincipal);
}

function reiniciarExperiencia() {
  eliminarBorrador();
  eliminarReservacion();

  estado.peliculaId = null;
  estado.horarioId = null;
  estado.asientos = [];
  estado.pedidoAntes = {};
  estado.pedidoDurante = {};
  estado.reservacion = null;

  notificar("La experiencia quedó lista para comenzar de nuevo.", "success");
  router.navegar("home", {}, { reemplazar: true });
}

function configurarEventosGlobales() {
  document.querySelectorAll("[data-nav]").forEach((boton) => {
    boton.addEventListener("click", () => {
      router.navegar(boton.dataset.nav);
    });
  });

  document
    .querySelector('[data-action="open-reset"]')
    .addEventListener("click", () => {
      dialogoReinicio.showModal();
    });

  dialogoReinicio.addEventListener("close", () => {
    if (dialogoReinicio.returnValue === "confirm") {
      reiniciarExperiencia();
    }
  });
}

router = crearRouter({
  rutaInicial: "home",
  alCambiarRuta: renderRuta
});

configurarEventosGlobales();
router.iniciar();
