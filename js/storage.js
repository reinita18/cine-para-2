const CLAVES = {
  borrador: "cinePara2:borrador:v1",
  reservacion: "cinePara2:reservacion:v1"
};

function guardarJson(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.warn(`No fue posible guardar ${clave}.`, error);
    return false;
  }
}

function obtenerJson(clave) {
  try {
    const valor = localStorage.getItem(clave);

    if (!valor) {
      return null;
    }

    const datos = JSON.parse(valor);
    return datos && typeof datos === "object" ? datos : null;
  } catch (error) {
    console.warn(`No fue posible leer ${clave}.`, error);
    return null;
  }
}

function eliminarClave(clave) {
  try {
    localStorage.removeItem(clave);
  } catch (error) {
    console.warn(`No fue posible eliminar ${clave}.`, error);
  }
}

export function guardarBorrador(borrador) {
  return guardarJson(CLAVES.borrador, borrador);
}

export function obtenerBorrador() {
  const borrador = obtenerJson(CLAVES.borrador);

  if (!borrador) {
    return null;
  }

  return {
    peliculaId: typeof borrador.peliculaId === "string" ? borrador.peliculaId : null,
    horarioId: typeof borrador.horarioId === "string" ? borrador.horarioId : null,
    asientos: Array.isArray(borrador.asientos)
      ? borrador.asientos.filter((asiento) => typeof asiento === "string")
      : [],
    pedidoAntes:
      borrador.pedidoAntes && typeof borrador.pedidoAntes === "object"
        ? borrador.pedidoAntes
        : {},
    pedidoDurante:
      borrador.pedidoDurante && typeof borrador.pedidoDurante === "object"
        ? borrador.pedidoDurante
        : {}
  };
}

export function eliminarBorrador() {
  eliminarClave(CLAVES.borrador);
}

export function guardarReservacion(reservacion) {
  if (!reservacion || typeof reservacion !== "object" || !reservacion.folio) {
    return false;
  }

  return guardarJson(CLAVES.reservacion, reservacion);
}

export function obtenerReservacion() {
  const reservacion = obtenerJson(CLAVES.reservacion);

  if (
    !reservacion ||
    typeof reservacion.folio !== "string" ||
    !reservacion.pelicula ||
    !Array.isArray(reservacion.asientos)
  ) {
    return null;
  }

  return {
    ...reservacion,
    pedidoAntes: Array.isArray(reservacion.pedidoAntes) ? reservacion.pedidoAntes : [],
    pedidosDurante: Array.isArray(reservacion.pedidosDurante)
      ? reservacion.pedidosDurante
      : []
  };
}

export function actualizarPedidoDuranteFuncion(pedido) {
  const reservacion = obtenerReservacion();

  if (!reservacion || !pedido || !Array.isArray(pedido.items)) {
    return null;
  }

  const actualizada = {
    ...reservacion,
    pedidosDurante: [...reservacion.pedidosDurante, pedido]
  };

  guardarReservacion(actualizada);
  return actualizada;
}

export function eliminarReservacion() {
  eliminarClave(CLAVES.reservacion);
}
