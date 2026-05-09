
  let clientes = [
    {cedula: "123", nombre: "Mario", apellido: "Rojas", ingresos: 800, egresos: 600},
    {cedula: "456", nombre: "Xavier", apellido: "Velez", ingresos: 1500, egresos: 500},
    {cedula: "789", nombre: "Dario", apellido: "Mena", ingresos: 1110, egresos: 200},
  ];
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

function buscarClienteCredito() {

    // 1. Recuperar cédula ingresada
    let cedulaBuscada = recuperaraTexto("buscarCedulaCredito");

    // 2. Buscar cliente
    let cliente = buscarCliente(cedulaBuscada);

    // 3. Verificar si existe
    if (cliente != null) {
       clienteSeleccionado = cliente;
        // Mostrar datos
        let contenido = "";

        contenido += "<h3>Datos del Cliente</h3>";
        contenido += "<p><strong>Cédula:</strong> " + cliente.cedula + "</p>";
        contenido += "<p><strong>Nombre:</strong> " + cliente.nombre + "</p>";
        contenido += "<p><strong>Apellido:</strong> " + cliente.apellido + "</p>";
        contenido += "<p><strong>Ingresos:</strong> " + cliente.ingresos + "</p>";
        contenido += "<p><strong>Egresos:</strong> " + cliente.egresos + "</p>";

        document.getElementById("datosClienteCredito").innerHTML = contenido;

    } else {

        // Cliente no encontrado
        document.getElementById("datosClienteCredito").innerHTML =
            "<p>Cliente no encontrado</p>";
    }
}

//Reutilizacion de funciones del simulador de credito 1
//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
//perfect
function calcularDisponible(ingresos,egresos){
    let valorDisponible;
    valorDisponible=ingresos-egresos;
    if(valorDisponible<0){
        return 0;
    }
    return valorDisponible;
}
//perfect 1 cambio 
function calcularCapacidadPago(montoDisponible){
    return montoDisponible*0.5;
}
//perfect con 2 cambios
function calcularInteresSimple(monto,tasa,plazoAnios){
    let interes; 
    interes = monto*(tasa/100)*plazoAnios;//aqui cambia
    return interes;
}
//perfect
function calcularTotalPagar(monto,interes){
    let total;
    total=monto+interes+100;
    return total;
}
//perfect
function calcularCuotaMensual(total,plazoAnios){
    let meses=plazoAnios*12;
    if(meses <= 0){
        return 0;
    }

    let cuota=total/meses;

    return cuota;
}
//perfect
function aprobarCredito(capacidadPago,cuotaMensual){
    if(capacidadPago>cuotaMensual){
        return true;
    }else {
        return false;
    }
}

function mostrarResultado(){
    let resultadoCredito = document.getElementById("resultadoCredito");
    let contenido = "";
    let montoDisponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);

    let capacidadPago = calcularCapacidadPago(montoDisponible);
    //calcular total a pagar 1
    let interes = calcularInteresSimple(
        montoCalculado, 
        tasaInteres, 
        plazoCalculado
    );

    let totalPagar = calcularTotalPagar(montoCalculado, interes);//calcular total a pagar 2

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoCalculado); //calcular cuota Mensual a pagar 1

    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);//Resultado: Aprobado o rechazado 1
    //6. aplicar estilos segun el resultado.
    if(aprobado){
        resultadoCredito.className = "aprobado";
    }else{
    resultadoCredito.className = "rechazado";
    }

    let resultado = aprobado ? "APROBADO" : "RECHAZADO"; //Resultado: Aprobado o rechazado 2

    contenido += `<br>Capacidad De Pago: ${calcularCapacidadPago(montoDisponible)}<br>`
    contenido += `<br>Total a pagar: ${totalPagar}<br>`;//calcular total a pagar 3
    contenido += `<br>Cuota mensual: ${cuotaMensual}<br>`; //calcular cuota Mensual a pagar 2
    contenido += `<br>Resultado: ${resultado}<br>`;//Resultado: Aprobado o rechazado 3

    resultadoCredito.innerHTML = contenido;

}

//calcular cuota Mensual a pagar 3
function calcularCredito(){
    montoCalculado = recuperarFloat("montoCredito");
    plazoCalculado = recuperarInt("plazoCredito");

    mostrarResultado();
}