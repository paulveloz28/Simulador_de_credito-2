
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  //Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

  function ocultarSecciones() {
    let seccion1 = document.getElementById("clientes");
    let listaClases1 = seccion1.classList
    listaClases1.remove("activa");

    let seccion2 = document.getElementById("parametros");
    let listaClases2 = seccion2.classList
    listaClases2.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones()
    let seccion1 = document.getElementById(id);
    let listaClases1 = seccion1.classList //obtiene la lista de las clases del elemento
    listaClases1.add("activa")
    console.log(listaClases1)
}

function guardarTasa() {
    let cmpTasa = recuperarInt("tasaInteres");
    if (cmpTasa >= 10 && cmpTasa <= 20) {
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + cmpTasa + " %")
        tasaInteres = cmpTasa;
    } else {
        mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%")

    }
}