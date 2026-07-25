export function crearRouter({ rutaInicial = "home", alCambiarRuta }) {
  if (typeof alCambiarRuta !== "function") {
    throw new TypeError("El router necesita una función alCambiarRuta.");
  }

  function navegar(vista, parametros = {}, opciones = {}) {
    const estado = {
      cinePara2: true,
      vista,
      parametros
    };

    const metodo = opciones.reemplazar ? "replaceState" : "pushState";
    window.history[metodo](estado, "", window.location.href);
    alCambiarRuta(vista, parametros);
  }

  function iniciar() {
    window.addEventListener("popstate", (evento) => {
      const estado = evento.state;

      if (estado?.cinePara2) {
        alCambiarRuta(estado.vista, estado.parametros ?? {});
        return;
      }

      alCambiarRuta(rutaInicial, {});
    });

    if (window.history.state?.cinePara2) {
      alCambiarRuta(
        window.history.state.vista,
        window.history.state.parametros ?? {}
      );
      return;
    }

    navegar(rutaInicial, {}, { reemplazar: true });
  }

  return {
    iniciar,
    navegar
  };
}
