export function formatearMoneda(valor, moneda = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0
  }).format(Number(valor) || 0);
}

export function normalizarCodigo(valor) {
  return String(valor ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

export function generarFolio(prefijo = "CP2") {
  const fecha = new Date();
  const marcaTiempo = fecha
    .toISOString()
    .replace(/\D/g, "")
    .slice(2, 12);
  const aleatorio = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${prefijo}-${marcaTiempo}-${aleatorio}`;
}

export function calcularTotalSeleccion(productos, seleccion) {
  return productos.reduce((total, producto) => {
    const cantidad = Number(seleccion[producto.id]) || 0;
    return total + producto.precio * cantidad;
  }, 0);
}

export function convertirSeleccionAItems(productos, seleccion) {
  return productos
    .map((producto) => {
      const cantidad = Number(seleccion[producto.id]) || 0;

      if (cantidad <= 0) {
        return null;
      }

      return {
        id: producto.id,
        nombre: producto.nombre,
        cantidad,
        precio: producto.precio,
        subtotal: producto.precio * cantidad
      };
    })
    .filter(Boolean);
}

export function agruparPor(lista, obtenerClave) {
  return lista.reduce((grupos, elemento) => {
    const clave = obtenerClave(elemento);

    if (!grupos.has(clave)) {
      grupos.set(clave, []);
    }

    grupos.get(clave).push(elemento);
    return grupos;
  }, new Map());
}

export function generarPatronQR(texto, lado = 9) {
  let semilla = 0;

  for (const caracter of String(texto)) {
    semilla = (semilla * 31 + caracter.charCodeAt(0)) >>> 0;
  }

  const celdas = [];

  for (let indice = 0; indice < lado * lado; indice += 1) {
    semilla = (1664525 * semilla + 1013904223) >>> 0;
    const fila = Math.floor(indice / lado);
    const columna = indice % lado;
    const esEsquina =
      (fila < 3 && columna < 3) ||
      (fila < 3 && columna >= lado - 3) ||
      (fila >= lado - 3 && columna < 3);

    celdas.push(esEsquina || semilla % 3 === 0);
  }

  return celdas;
}

export function enfocarTitulo(contenedor) {
  const titulo = contenedor.querySelector("h1");

  if (!titulo) {
    return;
  }

  titulo.setAttribute("tabindex", "-1");
  titulo.focus({ preventScroll: true });
}

export function limitarNumero(valor, minimo, maximo) {
  return Math.min(Math.max(Number(valor) || 0, minimo), maximo);
}
