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
    id: "obsession",
    titulo: "Obsession",
    poster: "./assets/peliculas/obsession-poster.jpg",
    genero: "Terror · suspenso",
    duracion: "1 h 48 min",
    clasificacion: "B",
    sinopsis:
    "El anhelo romántico desesperado de un chico por su amor platónico de toda la vida desencadena un siniestro hechizo: Niki se vuelve irracionalmente obsesiva hasta convertirse en la sombra de Bear. Una fantasía aparentemente inofensiva que se convertirá en una perturbadora pesadilla.",
    informacionAdicional: "Audio en español · Subtítulos disponibles",
    estado: "disponible"
  },
  {
    id: "rata-con-thinner",
    titulo: "Rata con Thinner",
    poster: "./assets/peliculas/rata-con-thinner-poster.jpg",
    genero: "Terror",
    duracion: "2 h 15 min",
    clasificacion: "C",
    sinopsis:
      "La historia narra una experiencia extrema y bizarra de convivencia, donde el protagonista presencia los excéntricos encuentros sexuales de su primo con indigentes. El relato culmina en una caótica noche con un vagabundo yonqui que termina en una emergencia médica surrealista.",
    informacionAdicional: "Selección especial · Audio en español · Subtítulos disponibles",
    estado: "disponible"
  },
  {
    id: "bastardosSinGloria",
    titulo: "Bastardos sin gloria",
    poster: "./assets/peliculas/bastardos-sin-gloria-poster.jpg",
    genero: "Bélico · acción · drama · comedia negra.",
    duracion: "2 h 33 min",
    clasificacion: "B",
    sinopsis:
      "En la Francia ocupada por los nazis durante la Segunda Guerra Mundial, el plan para asesinar a líderes nazis por un grupo de soldados judíos de los Estados Unidos, coincide con el dueño de un teatro que planea lo mismo.",
    informacionAdicional: "Doblada al español",
    estado: "agotada"
  },
  {
    id: "maleficio",
    titulo: "Maleficio",
    poster: "./assets/peliculas/maleficio-poster.jpg",
    genero: "Aventura romántica",
    duracion: "1 h 56 min",
    clasificacion: "A",
    sinopsis:
      "Hace seis años, Li Ronan fue maldecido después de romper un tabú religioso. Ahora, debe proteger a su hija de las consecuencias de sus acciones.",
    informacionAdicional: "Función agotada · Audio en español",
    estado: "disponible"
  },
  {
    id: "rocky",
    titulo: "Rocky",
    poster: "./assets/peliculas/rocky-poster.jpg",
    genero: "Bélico · acción",
    duracion: "2 h 33 min",
    clasificacion: "B",
    sinopsis:
      "Relata la historia de Rocky Balboa, un boxeador de poca monta y cobrador de deudas en Filadelfia, que recibe la oportunidad única de luchar por el título mundial de los pesos pesados contra Apollo Creed. A la par, encuentra el amor con Adrian.",
    informacionAdicional: "Doblada al español",
    estado: "agotada"
  },
  {
    id: "avatar",
    titulo: "Avatar",
    poster: "./assets/peliculas/avatar-poster.jpg",
    genero: "Animación · Acción · Aventura · Fantasia",
    duracion: "1 h 39 min",
    clasificacion: "B",
    sinopsis:
      "Película de animación que seguirá a Aang y sus amigos, ahora como jóvenes adultos, varios años después de los acontecimientos del final de 'Avatar: The Last Airbender'.",
    informacionAdicional: "Recomendación de la casa · Audio original",
    estado: "disponible"
  },
  {
    id: "erase-una-vez-en-holliwood",
    titulo: "Erase una vez en holliwood",
    poster: "./assets/peliculas/erase-una-vez-en-hollywood-poster.jpg",
    genero: "Comedia · Drama · Suspenso",
    duracion: "2 h 42 min",
    clasificacion: "B",
    sinopsis:
      "Los Angeles, 1969. La estrella de televisión Rick Dalton, un actor en horas bajas especializado en westerns, y el doble de acción Cliff Booth, su mejor amigo, tratan de sobrevivir a una industria cinematográfica en constante cambio.",
    informacionAdicional: "Estreno en Cine para 2",
    estado: "disponible"
  },
  {
    id: "libre",
    titulo: "Pelicula libre",
    poster: "./assets/peliculas/libre-poster.jpg",
    genero: "",
    duracion: "",
    clasificacion: "",
    sinopsis:
      "",
    informacionAdicional: "",
    estado: "disponible"
  }
];

export const horariosPorPelicula = {
  "obsession": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
  "rata-con-thinner": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "agotado" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "agotado" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "agotado" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "agotado" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "agotado" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "agotado" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
  "avatar": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
  "erase-una-vez-en-holliwood": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
  "maleficio": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
  ],
   "libre": [
    { id: "nbe-2134", hora: "11:30 a. m.", estado: "agotado" },
    { id: "nbe-1700", hora: "12:30 p. m.", estado: "disponible" },
    { id: "nbe-1700", hora: "12:500 p. m.", estado: "disponible" },
    { id: "nbe-1830", hora: "01:00 p. m.", estado: "disponible" },
    { id: "nbe-2000", hora: "01:20 p. m.", estado: "disponible" },
    { id: "nbe-2130", hora: "01:30 p. m.", estado: "disponible" },
    { id: "nbe-2131", hora: "02:20 p. m.", estado: "disponible" },
    { id: "nbe-2132", hora: "02:40 p. m.", estado: "disponible" },
    { id: "nbe-2133", hora: "03:00 p. m.", estado: "agotado" }
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
  {  id: "combo-boneless",
    nombre: "Combo Boneless",
    descripcion: "Orden de Boneless con papas.",
    imagen: "./assets/alimentos/boneles.png",
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
    nombre: "Palomitas de queso y Doritos Nacho",
    descripcion: "Puede contener oalomitas,",
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
    id: "lechita",
    nombre: "Lechita de fresa",
    descripcion: "Lechita de fresa en carton.",
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
