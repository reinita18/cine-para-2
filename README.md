# Cine para 2

Aplicación web estática para simular una reservación de cine romántico en casa. Está construida únicamente con HTML5, CSS3 y JavaScript vanilla mediante módulos ES (`import` / `export`).

## Funciones incluidas

- Pantalla de bienvenida con el branding de **Cine para 2**.
- Cartelera con películas disponibles, agotadas y próximas.
- Detalle de película sin recargar la página.
- Selección de una función disponible entre horarios agotados.
- Sala visual con solo dos asientos disponibles: D5 y D6.
- Dulcería antes de la película, con stock, límites y cantidades.
- Confirmación mediante un código especial configurable.
- Boleto digital guardado en `localStorage`.
- Recuperación del boleto después de recargar o cerrar el navegador.
- Dulcería durante la película con productos distintos.
- Pedidos durante la función agregados al boleto original.
- Diseño responsive para móvil, tableta vertical, tableta horizontal y computadora.
- Navegación por teclado, foco visible, textos alternativos y soporte para `prefers-reduced-motion`.

## Estructura

```text
cine-para-2/
│
├── index.html
├── README.md
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── cartelera.js
│   ├── funciones.js
│   ├── asientos.js
│   ├── dulceria.js
│   ├── boleto.js
│   ├── storage.js
│   └── utils.js
│
├── data/
│   └── contenido.js
│
└── assets/
    ├── branding/
    ├── peliculas/
    ├── alimentos/
    └── iconos/
```

## Importante: cómo ejecutarlo localmente

La aplicación usa módulos de JavaScript. Por esa razón **no debe abrirse con doble clic usando una dirección `file:///`**. Debe ejecutarse mediante un servidor local.

### Opción 1: Live Server en Visual Studio Code

1. Abre la carpeta `cine-para-2` en Visual Studio Code.
2. Instala la extensión **Live Server** de Ritwick Dey.
3. Haz clic derecho sobre `index.html`.
4. Selecciona **Open with Live Server**.
5. La dirección normalmente será parecida a `http://127.0.0.1:5500/`.

### Opción 2: servidor incluido en Python

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

## Código de confirmación de ejemplo

El código inicial es:

```text
CINEPARA2
```

Puedes cambiarlo en:

```js
// data/contenido.js
export const configuracion = {
  codigoConfirmacion: "CINEPARA2"
};
```

## Cómo cambiar películas

Edita el arreglo `peliculas` dentro de `data/contenido.js`:

```js
{
  id: "mi-pelicula",
  titulo: "Título de la película",
  poster: "./assets/peliculas/mi-pelicula.jpg",
  genero: "Romance",
  duracion: "1 h 45 min",
  clasificacion: "B",
  sinopsis: "Descripción breve.",
  informacionAdicional: "Audio en español",
  estado: "disponible"
}
```

Estados permitidos:

- `disponible`
- `agotada`
- `proximamente`

Después agrega sus horarios a `horariosPorPelicula`. El nombre de la propiedad debe coincidir con el `id` de la película:

```js
"mi-pelicula": [
  { id: "mi-pelicula-1700", hora: "5:00 p. m.", estado: "agotado" },
  { id: "mi-pelicula-2000", hora: "8:00 p. m.", estado: "disponible" }
]
```

## Cómo reemplazar imágenes

1. Copia la imagen nueva a la carpeta correspondiente:
   - Pósteres: `assets/peliculas/`
   - Alimentos: `assets/alimentos/`
   - Branding: `assets/branding/`
2. Usa nombres de archivo sencillos, sin espacios ni acentos.
3. Actualiza la ruta en `data/contenido.js`.
4. Conserva el prefijo relativo `./`.

Ejemplo correcto:

```text
./assets/peliculas/mi-pelicula.jpg
```

No uses una ruta que comience con `/`, porque podría romperse dentro de un repositorio de GitHub Pages.

## Cómo cambiar alimentos

Todos los productos están en el arreglo `productos` de `data/contenido.js`.

```js
{
  id: "mi-producto",
  nombre: "Mi producto",
  descripcion: "Descripción breve.",
  imagen: "./assets/alimentos/mi-producto.jpg",
  precio: 50,
  categoria: "Snacks",
  limite: 1,
  stock: 1,
  momento: "antes",
  disponible: true
}
```

Usa:

- `momento: "antes"` para la dulcería previa.
- `momento: "durante"` para el servicio durante la película.

El valor máximo seleccionable será el menor entre `limite` y `stock`.

## Cómo cambiar asientos

En `data/contenido.js`:

```js
export const sala = {
  filas: ["A", "B", "C", "D", "E", "F"],
  asientosPorFila: 10,
  disponibles: ["D5", "D6"]
};
```

Para mantener el flujo diseñado para dos personas, conserva exactamente dos códigos en `disponibles` y deja `maximoAsientos: 2` en `configuracion`.

## Cómo cambiar el branding

Los colores, fuentes, radios, sombras y espaciados principales están en:

```text
css/variables.css
```

Paleta aplicada:

- Burdeos: `#6B1D2A`
- Rojo cálido: `#B03A3A`
- Caramelo: `#C5844A`
- Dorado: `#D4B26A`
- Crema: `#F6EADD`
- Carbón: `#2E2A28`

Los archivos extraídos de la guía de marca están en `assets/branding/`:

- `logo-principal.png`
- `submarca-icono.png`
- `logo-monocromo.png`
- `guia-marca.jpg`

## Persistencia y pruebas

La aplicación utiliza estas claves de `localStorage`:

```text
cinePara2:borrador:v1
cinePara2:reservacion:v1
```

El botón **Reiniciar** elimina ambos datos después de mostrar una confirmación.

Para probar el flujo desde cero también puedes abrir las herramientas de desarrollo del navegador y borrar el almacenamiento del sitio.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `cine-para-2`.
2. Sube todo el contenido de esta carpeta. `index.html` debe quedar en la raíz del repositorio.
3. En GitHub abre **Settings**.
4. Entra a **Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Selecciona la rama `main` y la carpeta `/ (root)`.
7. Guarda los cambios.
8. Espera a que GitHub muestre la dirección pública.

No se necesita proceso de compilación, Node.js, paquetes ni base de datos.

## Archivos que normalmente editarás

Para personalizar la experiencia sin tocar la lógica:

1. `data/contenido.js`
2. `css/variables.css`
3. Las imágenes dentro de `assets/`

La lógica principal está separada por responsabilidad para evitar que `app.js` concentre toda la aplicación.
