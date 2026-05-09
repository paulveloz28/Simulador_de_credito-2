
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

function guardarCliente() {

    // Obtener datos  
    let cmpcedula = recuperaraTexto("cedula");
    let cmpnombre = recuperaraTexto("nombre");
    let cmpapellido = recuperaraTexto("apellido");

    // Convertir números
    let cmpingresos = recuperarFloat("ingresos");
    let cmpegresos = recuperarFloat("egresos");

    // Crear objeto
    let cliente = {
        cedula: cmpcedula,
        nombre: cmpnombre,
        apellido: cmpapellido,
        ingresos: cmpingresos,
        egresos: cmpegresos
    };

    console.log(cliente);

    if (clienteSeleccionado == null) {

        // CREAR
        clientes.push(cliente);

    } else {

        // VALIDAR CÉDULA
        if (clienteSeleccionado.cedula != cliente.cedula) {
            alert("NO SE PERMITE MODIFICAR LA CÉDULA");
            return;
        }

        // ACTUALIZAR
        clienteSeleccionado.nombre = cliente.nombre;
        clienteSeleccionado.apellido = cliente.apellido;
        clienteSeleccionado.ingresos = cliente.ingresos;
        clienteSeleccionado.egresos = cliente.egresos;
    }

    pintarClientes();
    limpiar();
}

function pintarClientes() {

    let tabla = document.getElementById("tablaClientes");

    let contenidoTabla = "";

    for (let i = 0; i < clientes.length; i++) {

        let objCliente = clientes[i];

        contenidoTabla += "<tr>";

        contenidoTabla += "<td>" + objCliente.cedula + "</td>";
        contenidoTabla += "<td>" + objCliente.nombre + "</td>";
        contenidoTabla += "<td>" + objCliente.apellido + "</td>";
        contenidoTabla += "<td>" + objCliente.ingresos + "</td>";
        contenidoTabla += "<td>" + objCliente.egresos + "</td>";

        contenidoTabla += "<td>";
        contenidoTabla += "<button onclick=\"seleccionarCliente('" + objCliente.cedula + "')\">Actualizar</button>";
        contenidoTabla += "</td>";

        contenidoTabla += "</tr>";
    }

    tabla.innerHTML = contenidoTabla;
}

function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        let objCliente = clientes[i];
        if (objCliente.cedula == cedula) {
            return objCliente; //retorna el cliente
        }
    }
    return null
}

function seleccionarCliente(cedula) {

    let cliente = buscarCliente(cedula);

    if (cliente != null) {

        clienteSeleccionado = cliente;

        mostrarTextoEnCaja("cedula", cliente.cedula);
        mostrarTextoEnCaja("nombre", cliente.nombre);
        mostrarTextoEnCaja("apellido", cliente.apellido);
        mostrarTextoEnCaja("ingresos", cliente.ingresos);
        mostrarTextoEnCaja("egresos", cliente.egresos);
    }
}

function limpiar() {
    mostrarTextoEnCaja("cedula", "")
    mostrarTextoEnCaja("nombre", "")
    mostrarTextoEnCaja("apellido", "")
    mostrarTextoEnCaja("ingresos", "")
    mostrarTextoEnCaja("egresos", "")
    

    //Reset selección
    clienteSeleccionado = null;
}