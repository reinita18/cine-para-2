export const branding = {
  nombre: "Cine para 2",
  eslogan: "",
  logoPrincipal: "./assets/branding/logo-principal.png",
  submarca: "./assets/branding/submarca-icono.png",
  colores: {
    principal: "#6B1D2A",
    secundario: "#B03A3A",
    caramelo: "#C5844A",
    dorado: "#D4B26A",
    fondo: "#F6EADD",
    texto: "#2E2A28"
  }
};

export const configuracion = {
  fechaFuncion: "Domingo 26 de julio de 2026",
  codigoConfirmacion: "CINEPARA2",
  moneda: "MXN",
  maximoAsientos: 2,
  mensajeBoleto: "La mejor parte de esta función es compartirla contigo.",
  mensajePedidoEnviado: "Tu pedido ha sido enviado. En breve llegará a tu asiento."
};

export const mensajes = {
  bienvenidaTitulo: "Bienvenido a Cine para 2",
  bienvenidaFrase: "Una función especial, preparada solo para nosotros.",
  carteleraTitulo: "CARTELERA",
  carteleraDescripcion: "",
  codigoIncorrecto: "Ese código no coincide. Revísalo con calma e inténtalo otra vez.",
  sinBoleto: "Todavía no tienes una función reservada.",
  sinBoletoDetalle: "Cuando confirmes una película, aquí aparecerá tu entrada digital."
};

export const peliculas = [
  {
    id: "siniestro",
    titulo: "Siniestro",
    poster: "./assets/peliculas/siniestro-poster.jpg",
    genero: "Terror",
    duracion: "1 h 49 min",
    clasificacion: "B",
    sinopsis:
      " Ellison Oswalt, un novelista de crímenes reales en decadencia, muda a su familia a una casa donde ocurrió el atroz asesinato de los anteriores inquilinos para inspirar su próximo libro.",
    informacionAdicional: "Selección especial · Audio en español · Subtítulos disponibles",
    estado: "disponible"
  },
  {
    id: "noche-bajo-estrellas",
    titulo: "Noche bajo las estrellas",
    poster: "./assets/peliculas/siniestro-poster.jpg",
    genero: "Romance",
    duracion: "1 h 48 min",
    clasificacion: "B",
    sinopsis:
      "Dos personas convierten una noche sencilla en un recuerdo que parece escrito para la pantalla grande.",
    informacionAdicional: "Selección especial de la casa · Audio en español · Subtítulos disponibles",
    estado: "disponible"
  },
  {
    id: "bastardosSinGloria",
    titulo: "Bastardos sin gloria",
    poster: "./assets/peliculas/bastardos-sin-gloria-poster.jpg",
    genero: "Bélico, acción · drama · comedia negra.",
    duracion: "2 h 33 min",
    clasificacion: "B",
    sinopsis:
      "En la Francia ocupada por los nazis durante la Segunda Guerra Mundial, el plan para asesinar a líderes nazis por un grupo de soldados judíos de los Estados Unidos, coincide con el dueño de un teatro que planea lo mismo.",
    informacionAdicional: "Doblada al español",
    estado: "disponible"
  },
  {
    id: "viaje-de-nosotros",
    titulo: "El viaje de nosotros",
    poster: "./assets/peliculas/viaje-de-nosotros.svg",
    genero: "Aventura romántica",
    duracion: "1 h 56 min",
    clasificacion: "A",
    sinopsis:
      "Una escapada improvisada demuestra que el mejor destino puede ser la persona que viaja a tu lado.",
    informacionAdicional: "Función agotada · Audio en español",
    estado: "agotada"
  },
  {
    id: "ultima-funcion",
    titulo: "La última función",
    poster: "./assets/peliculas/ultima-funcion.svg",
    genero: "Comedia romántica",
    duracion: "1 h 42 min",
    clasificacion: "B",
    sinopsis:
      "Un viejo cine, una función inesperada y dos espectadores que llegan justo a tiempo.",
    informacionAdicional: "Función agotada · Audio original",
    estado: "agotada"
  },
  {
    id: "luz-de-invierno",
    titulo: "Luz de invierno",
    poster: "./assets/peliculas/luz-de-invierno.svg",
    genero: "Romance",
    duracion: "Próximamente",
    clasificacion: "B",
    sinopsis:
      "Una historia tranquila sobre volver a encontrarse cuando la ciudad enciende sus primeras luces de invierno.",
    informacionAdicional: "Próximo estreno en Cine para 2",
    estado: "proximamente"
  }
];

export const horariosPorPelicula = {
  "siniestro": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
  "bastardosSinGloria": [
    { id: "cdo-1730", hora: "05:30 p. m.", estado: "agotado" },
    { id: "cdo-1900", hora: "07:00 p. m.", estado: "agotado" },
    { id: "cdo-2030", hora: "08:30 p. m.", estado: "disponible" },
    { id: "cdo-2200", hora: "10:00 p. m.", estado: "agotado" }
  ]
};

export const sala = {
  filas: ["A", "B", "C", "D", "E", "F"],
  asientosPorFila: 10,
  disponibles: ["D5", "D6"]
};

export const productos = [
  {
    id: "palomitas-clasicas",
    nombre: "Palomitas clásicas",
    descripcion: "Recién preparadas para compartir.",
    imagen: "./assets/alimentos/palomitas-clasicas.svg",
    precio: 50,
    categoria: "Palomitas",
    limite: 1,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "palomitas-queso",
    nombre: "Palomitas con queso",
    descripcion: "Pueden contener queso.",
    imagen: "./assets/alimentos/palomitas-queso.svg",
    precio: 65,
    categoria: "Palomitas",
    limite: 1,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "coca-cola",
    nombre: "Coca Cola",
    descripcion: "Vaso de Coca Cola fría.",
    imagen: "./assets/alimentos/bebida.svg",
    precio: 35,
    categoria: "Bebidas",
    limite: 1,
    stock: 50,
    momento: "antes",
    disponible: true
  },
  {
    id: "Jaztea",
    nombre: "Jaztea",
    descripcion: "Vaso de té frio.",
    imagen: "./assets/alimentos/bebida.svg",
    precio: 20,
    categoria: "Bebidas",
    limite: 1,
    stock: 30,
    momento: "antes",
    disponible: true
  },
  {
    id: "chocolates",
    nombre: "Chocolates",
    descripcion: "Bocados pequeños para compartir durante la película.",
    imagen: "./assets/alimentos/chocolates.svg",
    precio: 30,
    categoria: "Dulces",
    limite: 2,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "gomitas",
    nombre: "Gomitas surtidas",
    descripcion: "Una mezcla dulce y ligeramente ácida.",
    imagen: "./assets/alimentos/gomitas.svg",
    precio: 28,
    categoria: "Dulces",
    limite: 2,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "combo-para-dos",
    nombre: "Combo para dos",
    descripcion: "Palomitas, dos bebidas y un dulce a elegir.",
    imagen: "./assets/alimentos/combo-para-dos.svg",
    precio: 120,
    categoria: "Combos",
    limite: 1,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "combo-hamburgesa",
    nombre: "Combo Hamburguesa",
    descripcion: "Hamburguesa especial con papas.",
    imagen: "./assets/alimentos/combo2.png",
    precio: 180,
    categoria: "Combos",
    limite: 1,
    stock: 1,
    momento: "antes",
    disponible: true
  },
  {
    id: "nachos-antes",
    nombre: "Nachos con queso",
    descripcion: "Crujientes, tibios y listos para compartir.",
    imagen: "./assets/alimentos/nachos.svg",
    precio: 55,
    categoria: "Snacks",
    limite: 1,
    stock: 0,
    momento: "antes",
    disponible: false
  },
  {
    id: "palomitas",
    nombre: "Palomitas",
    descripcion: "Palomitas naturales",
    imagen: "./assets/alimentos/palomitas-clasicas.svg",
    precio: 35,
    categoria: "Antojos",
    limite: 1,
    stock: 50,
    momento: "durante",
    disponible: false
  },
  {
    id: "palomitas-queso",
    nombre: "Palomitas de queso",
    descripcion: "Puede contener Doritos Nacho o Cheetos",
    imagen: "./assets/alimentos/palomitas-clasicas.svg",
    precio: 35,
    categoria: "Antojos",
    limite: 2,
    stock: 20,
    momento: "durante",
    disponible: true
  },
  {
    id: "refill-adicional",
    nombre: "Refil bebida",
    descripcion: "Refil de tu bebida, ya sea té o coca-cola.",
    imagen: "./assets/alimentos/bebida.svg",
    precio: 25,
    categoria: "Bebidas",
    limite: 1,
    stock: 28,
    momento: "durante",
    disponible: true
  },
  {
    id: "agua-fria",
    nombre: "Agua",
    descripcion: "Bien fría y entregada directamente en el asiento.",
    imagen: "./assets/alimentos/agua-fria.svg",
    precio: 15,
    categoria: "Bebidas",
    limite: 2,
    stock: 2,
    momento: "durante",
    disponible: true
  },
  {
    id: "takis",
    nombre: "Bowl de Takis",
    descripcion: "Bowl con takis Verdes.",
    imagen: "./assets/alimentos/takis.png",
    precio: 25,
    categoria: "Antojos",
    limite: 2,
    stock: 1,
    momento: "durante",
    disponible: true
  },
  {
    id: "postre-sorpresa",
    nombre: "Postre sorpresa",
    descripcion: "El detalle dulce de la función.",
    imagen: "./assets/alimentos/postre-sorpresa.svg",
    precio: 40,
    categoria: "Especiales",
    limite: 2,
    stock: 20,
    momento: "durante",
    disponible: true
  },
  {
    id: "salsa",
    nombre: "Salsa",
    descripcion: "Chamoy para tus takis, palomitas o cheetos.",
    imagen: "./assets/alimentos/salsa.png",
    precio: 5,
    categoria: "Extras",
    limite: 4,
    stock: 100,
    momento: "durante",
    disponible: true
  },
  {
    id: "cobija",
    nombre: "Cobija",
    descripcion: "Una cobija suave para ver la película más cómodos.",
    imagen: "./assets/alimentos/cobija.svg",
    precio: 0,
    categoria: "Comodidad",
    limite: 1,
    stock: 1,
    momento: "durante",
    disponible: true
  },
  {
    id: "pausa-bano",
    nombre: "Pausa para ir al baño",
    descripcion: "Pausa oficial sin perder ningún momento importante.",
    imagen: "./assets/alimentos/pausa.svg",
    precio: 0,
    categoria: "Comodidad",
    limite: 1,
    stock: 10,
    momento: "durante",
    disponible: true
  },
  {
    id: "beso-extra",
    nombre: "Beso extra",
    descripcion: "Producto simbólico, sujeto a disponibilidad de la otra persona.",
    imagen: "./assets/alimentos/beso-extra.svg",
    precio: 0,
    categoria: "Especiales",
    limite: 2,
    stock: 2,
    momento: "durante",
    disponible: true
  },
  {
    id: "hamburguesa",
    nombre: "Hamburguesa especial",
    descripcion: "Hamburgesa especial sin papas.",
    imagen: "./assets/alimentos/hamburguesa.png",
    precio: 110,
    categoria: "Especiales",
    limite: 2,
    stock: 15,
    momento: "durante",
    disponible: false
  },
  {
    id: "papas-fritas",
    nombre: "Papas fritas",
    descripcion: "Deliciosas papas fritas.",
    imagen: "./assets/alimentos/papas.png",
    precio: 40,
    categoria: "Especiales",
    limite: 2,
    stock: 23,
    momento: "durante",
    disponible: false
  }
];

export const categoriasOrden = {
  antes: ["Palomitas", "Bebidas", "Dulces", "Combos", "Snacks"],
  durante: ["Antojos", "Bebidas", "Especiales", "Comodidad", "Extras"]
};

export function obtenerPelicula(id) {
  return peliculas.find((pelicula) => pelicula.id === id) ?? null;
}

export function obtenerHorarios(idPelicula) {
  return horariosPorPelicula[idPelicula] ?? [];
}

export function obtenerProducto(id) {
  return productos.find((producto) => producto.id === id) ?? null;
}
