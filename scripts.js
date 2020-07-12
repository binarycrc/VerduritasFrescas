// Cátedra de Ingeniería de Software
// Código Asignatura: 03075
// Asignatura: Fundamentos de Programación Web
// Cuatrimestre: II Cuatrimestre 2020
// Proyectos y Tarea
// Resolución de problema    
// Pablo Ugalde
/*
--- tipos de identificacion.xlsx ---
TipoIdentificacion	Formato	Longitud
Cédula Identidad	0#-####-####	12
Cédula Jurídica	3-###-######	9
DIMEX-Documento Único de Identificación	199999999999	12
DIDI-Documento de Identificación para Diplomáticos	599999999999	12
Pasaportes		50
Cédula (Personas Naturales)	##-aa-####-#####	16

fisica nacional /(^0(?:[1-9]{1}-))((?:[1-9]{4}-))((?:[1-9]{4}$))/gm
Juridica /(^3-)((?:[1-9]{3}-))((?:[1-9]{6}$))/gm
dimex /(^1)(?:[0-9]{5})(?:[0-9]{6}$)/gm
DIDI /(^5)(?:[0-9]{5})(?:[0-9]{6}$)/gm
pasaporte /(?:[0-9]{50})$/gm
naturales /(?:[0-9]{2}-)(?:[a-z]{2}-)(?:[1-9]{4}-)(?:[1-9]{4}$)/gm

*/

"use strict"; /* Define que el código JavaScript debe ejecutarse en "modo estricto", 
por ejemplo, uso de variables no declaradas.  */

/* *** DECLARACION DE CONSTANTES GLOBALES ***
-- El método de documento.querySelector() devuelve el primer elemento dentro del documento 
que coincide con el selector o grupo de selectores especificado. Si no se encuentran 
coincidencias, se devuelve un valor nulo. 
-- Las constantes tienen un alcance de bloque, al igual que las variables definidas usando 
la palabra clave let. El valor de una constante no se puede cambiar mediante la 
reasignación, y no se puede volver a declarar.
*/
const form = document.querySelector('#form'); // constante del formulario
const identificacion = document.querySelector('#identificacion'); // constante del input de identificacion
const tipoIdentificacion = document.querySelector('#tipoIdentificacion'); // constante del selection del tipo identificacion
const labelPatron = document.querySelector('#labelPatron'); // constante para la etiqueta del mensajes
const divTable = document.querySelector('#divTable'); // constante de bloque principal para insertar la tabla
const divCliente = document.querySelector('#divCliente'); // constante bloque para la cedula seleccionada 
const enviarPedido = document.querySelector('#enviarPedido'); // constante para el boton de enviar pedido
const modal = document.querySelector("#myModal"); // constante para la ventana modal de enviar pedido
const spanClose = document.querySelector("#spanClose"); // contante para la X de la ventana modal
const modalMsg = document.querySelector("#modalMsg"); // constante para el mensaje en la ventana modal
const porcDescuento = 5/100; // constante para el porcentaje de descuento
const porcIva = 13/100; // constante para el porcentaje de IVA

/* *** DECLARACION DE VARIABLES GLOBALES ***
-- La instrucción let declara una variable local de ámbito de bloque, 
opcionalmente inicializándola en un valor.
*/
let sumCantidades = 0; // variable global para el total de cantidades de productos
let sumTotalSubTotal = 0; // variable global para el total de cantidades de productos por precio
let sumTotalDescuento = 0; // variable global para el total del descuento de cantidades de productos por precio
let sumTotalIva = 0; // variable global para el total de cantidades de productos por precio mas el IVA
let patronIdentificacion= /(^0(?:[1-9]{1}-))((?:[1-9]{4}-))((?:[1-9]{4}$))/gm; // por defecto se define la fisica nacional

/* *** DECLARACION DE EVENTOS PARA ELEMENTOS ***
-- El método EventTarget addEventListener () configura una función que se llamará cada vez que el 
evento especificado se entregue al destino. Los objetivos comunes son Elemento, Documento y Ventana, 
pero el objetivo puede ser cualquier objeto que admita eventos (como XMLHttpRequest).
-- addEventListener () funciona agregando una función o un objeto que implementa EventListener a 
la lista de oyentes de eventos para el tipo de evento especificado en EventTarget en el que se llama.
*/
form.addEventListener("submit", submit, false); // Evento submit para el form principal
tipoIdentificacion.addEventListener("change", cambiaPatron, false); // Evento change para el select tipo de identificacion cuando se cambia la seleccion
identificacion.addEventListener("input", validaIdentificacion, false); // Envento input para identificacion cuando se valida la entrada
enviarPedido.addEventListener("click", enviaPedido, false); // Evento click para el boton de enviar pedido
spanClose.addEventListener("click", closeModal, false); // Evento para la X en la ventana modal

/*
-- El evento DOMContentLoaded se desencadena cuando el documento HTML inicial se ha cargado 
y analizado por completo, sin esperar a que las hojas de estilo, las imágenes y los 
subtramas terminen de cargarse.
-- Ejecuta la funcion cargaVerduras al finalizar la carga de todo el documento
*/
document.addEventListener('DOMContentLoaded', cargaVerduras, false); 

// Funcion para cerrar la ventana modal
function closeModal() {modal.style.display = "none";}

// Funcion para validar que existan productos pedidos y los muestra
function enviaPedido() {
    if (sumCantidades>0){
        form.removeAttribute('hidden'); // mostramos el formulario
        divTable.setAttribute('hidden',''); // ocultamos el bloque principal
        divCliente.setAttribute('hidden',''); // ocultamos el bloque para la cedula seleccionada
        lableIdentificacion.innerText=""; // Limpiamos la etiqueta de identificacion seleccionada
        identificacion.value=""; // Limpiamos el input de la identificacion seleccionada
        modalMsg.innerHTML ="El pedido por el monto de "+ sumTotalIva.toFixed(2) +" ha sido enviado."; // Mensaje a desplegar en la ventana modal
        modal.style.display = "block"; // mostramos la ventana modal
        
        // ponemos variables globables en cero
        sumCantidades = 0;
        sumTotalSubTotal = 0;
        sumTotalDescuento = 0;
        sumTotalIva = 0;
        patronIdentificacion= /(^0(?:[1-9]{1}-))((?:[1-9]{4}-))((?:[1-9]{4}$))/gm; //fisica nacional
        // limpiaVerduras(); // Limpiamos los inputs de la tabla
        divTable.innerText=""; // eliminamos la tabla
    }else{ // sino hay cantidades seleccionadas en la tabla
        modalMsg.innerHTML ="No se puede enviar el pedido!";
        modal.style.display = "block";
    }
    return true;
}
// Funcion para validar el formulario
function submit(event) {
    cambiaPatron(); // Seleciona el patron segun la seleccion del tipo de identificacion
    if (patronIdentificacion.test(identificacion.value)){
        form.setAttribute('hidden', '');
        divTable.removeAttribute('hidden');
        divCliente.removeAttribute('hidden');
        cargaVerduras();
    }else{
        modalMsg.innerHTML ="Tipo de identificación y formato de identificación no corresponden.";
        modal.style.display = "block";
    }
    event.preventDefault();
}
// Funcion para la identificacion ingresada segun el tipo de identificacion seleccionada
function validaIdentificacion(event) {
    cambiaPatron();
    event.target.setCustomValidity('');
    if (event.target.value === '') {
        event.target.setCustomValidity('Identificación invalida');
    } else if (!(patronIdentificacion.test(event.target.value))){
        event.target.setCustomValidity('Formato de Identificación invalido');
    }
    else {
        event.target.setCustomValidity('');
    } 
}
// Funcion para selecionar el patron segun la seleccion del tipo de identificacion 
function cambiaPatron() {
    switch (tipoIdentificacion.value) {
        case "fisica":
            labelPatron.innerText="ex. 01-0234-0567  debe de contener 12 dígitos, con cero al inicio y 2 guiones ";
            patronIdentificacion= /(^0(?:[1-9]{1}-))((?:[1-9]{4}-))((?:[1-9]{4}$))/gm; //fisica nacional
            break;
        case "juridica":
            labelPatron.innerText="ex. 3-456-789121 debe contener 12 dígitos, iniciar en 3 y 2 guiones";
            patronIdentificacion= /(^3-)((?:[1-9]{3}-))((?:[1-9]{6}$))/gm; //juridica nacional
            break;
        case "dimex":
            labelPatron.innerText="ex. 199999999999 debe contener 12 dígitos, sin ceros al inicio y sin guiones";
            patronIdentificacion= /(^1)(?:[0-9]{5})(?:[0-9]{6}$)/gm; //dimex
            break;
        case "didi":
            labelPatron.innerText="ex. 599999999999 debe contener 12 dígitos,  iniciar en 5 y sin guiones";
            patronIdentificacion= /(^5)(?:[0-9]{5})(?:[0-9]{6}$)/gm; //didi
            break;
        case "pasaporte":
            labelPatron.innerText="ex. 99999999999999999999 debe contener 50 dígitos, sin ceros al inicio y sin guiones";
            patronIdentificacion= /(?:[0-9]{50})$/gm; //pasaporte
            break;
        case "naturales":
            labelPatron.innerText="ex. ##-aa-####-##### debe contener 16 dígitos, contiene 2 aa y 3 guiones";
            patronIdentificacion= /(?:[0-9]{2}-)(?:[a-z]{2}-)(?:[1-9]{4}-)(?:[1-9]{4}$)/gm; //naturales
            break;                                    
        default:
            break;
    }
}
// Funcion para sumar todas las cantidades de verduras 
function sumaCantidades() {
    sumCantidades=0;
    document.querySelectorAll('[id^="cantidad"]').forEach(item => {
        sumCantidades+=parseInt(item.value);
    })
    document.querySelector("[id='TotalVerduras']").innerText=sumCantidades.toFixed(0);
}
// Funcion para sumar todos los correspondientes a subtotales, descuentos y precios con IVA
function sumaTotales() {
    sumTotalSubTotal=0;
    sumTotalDescuento=0;
    sumTotalIva=0;
    document.querySelectorAll('[id^="subtotal"]').forEach(item => {
        sumTotalSubTotal+=parseFloat(item.innerText);
    })
    document.querySelectorAll('[id^="descuento"]').forEach(item => {
        sumTotalDescuento+=parseFloat(item.innerText);
    })
    document.querySelectorAll('[id^="iva"]').forEach(item => {
        sumTotalIva+=parseFloat(item.innerText);
    })
    document.querySelector("[id='TotalSubTotal']").innerText=sumTotalSubTotal.toFixed(2);
    document.querySelector("[id='TotalDescuento']").innerText=sumTotalDescuento.toFixed(2);
    document.querySelector("[id='TotalIva']").innerText=sumTotalIva.toFixed(2);
}
// Funcion para calcular el descuento de cada linea 
function calDescuentos() {
    document.querySelectorAll('[id^="descuento"]').forEach(item => {
        let idverdura = item.id.split("_");
        let idsubtotal = '[id="subtotal_'+idverdura[1]+'"]';
        let iddescuento = '[id="descuento_'+idverdura[1]+'"]';
        let idiva = '[id="iva_'+idverdura[1]+'"]';
        let calculaSubtotal = 0;
        let calculaDescuento = 0;
        let calculaIva = 0;
        calculaSubtotal=parseInt(document.querySelector(idsubtotal).innerText);
        // aplicamos el criterio que si el total de productos es mayor o igual a 5
        // se aplica el descuento
        if(parseInt(sumCantidades) >= 5){
            calculaDescuento = calculaSubtotal-(calculaSubtotal*porcDescuento);
            calculaIva = calculaDescuento+(calculaDescuento*porcIva);
        }else{
            calculaIva = calculaSubtotal+(calculaSubtotal*porcIva);
        }
        document.querySelector(iddescuento).innerText=calculaDescuento.toFixed(2);
        document.querySelector(idiva).innerText=calculaIva.toFixed(2);

        // Cambiamos el estilo de las celdas correspondientes si el total de productos
        // es mayor o igual a 5
        if((calculaDescuento>0) && (calculaSubtotal>0)){
            document.querySelector(idsubtotal).parentElement.className="descuentoGreen";
            document.querySelector(iddescuento).parentElement.className="descuentoGreen";
            document.querySelector(idiva).parentElement.className="descuentoGreen";
        }
        else if((calculaDescuento==0) && (calculaSubtotal>0)){
            document.querySelector(idsubtotal).parentElement.className="ivaBlue";
            document.querySelector(iddescuento).parentElement.className="ivaBlue";
            document.querySelector(idiva).parentElement.className="ivaBlue";
        }else{
            document.querySelector(idsubtotal).parentElement.className="cellDer";
            document.querySelector(iddescuento).parentElement.className="cellDer";
            document.querySelector(idiva).parentElement.className="cellDer";
        }
    })
}

//
function cargaVerduras() {
    cambiaPatron(); // selecionar el patron segun la seleccion del tipo de identificacion 
    lableIdentificacion.innerText=identificacion.value;

    // arreglo de datos para generar la tabla principal
    let verdurasData = new Array();
    verdurasData.push(["Id","Imagen","Descripción","Precio","Inventario","Fecha Expiracion","Cantidad", "Subtotal","Descuento","+IVA" ]);
    verdurasData.push([1,"images/banano.png","Banano",5,10,"01/07/2020",0]);
    verdurasData.push([2,"images/chayote.png","Chayote",10,10,"01/07/2020",0]);
    verdurasData.push([3,"images/pina.png","Piña",15,10,"01/07/2020",0]);
    verdurasData.push([4,"images/tomate.png","Tomate",20,10,"01/07/2020",0]);
    verdurasData.push([5,"images/camote.png","Camote",25,10,"01/07/2020",0]);
    verdurasData.push([6,"images/yuca.png","Yuca",30,10,"01/07/2020",0]);
    verdurasData.push([7,"images/papa.png","Papa",35,10,"01/07/2020",0]);
    verdurasData.push([8,"images/pepino.png","Pepino",40,10,"01/07/2020",0]);
    verdurasData.push([9,"images/remolacha.png","Remolacha",45,10,"01/07/2020",0]);
    verdurasData.push([10,"images/cebolla.png","Cebolla",50,10,"01/07/2020",0]);

    // creamos la tabla me memoria
    let table = document.createElement("TABLE");
    table.id="verdurasTable";
    table.className="verdurasTable";
    table.border = "1";

    let columnCount = verdurasData[0].length;

    // agregamos todos los encabezados de las columnas
    let row = table.insertRow(-1);
    for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = verdurasData[0][i];
        row.appendChild(headerCell);
    }

    // recorremos el arreglo de datos para cargarlo agregarlo a la tabla 
    for (let i = 1; i < verdurasData.length; i++) {
        // recorremos linea por linea
        row = table.insertRow(-1);
        for (let j = 0; j < columnCount; j++) {
            // recorremos campo por campo
            let cell = row.insertCell(-1);
            // segun cada campo le agregamos los atributos necesarios
            if (j==1){
                let imgVerdura = document.createElement("img");
                imgVerdura.src = verdurasData[i][j];
                imgVerdura.className="imgverdura";
                cell.appendChild(imgVerdura);
            }else if (j==3){ // agregamos lables con un ID especifico para poder manipularlo segun los eventos
                let labelPrecio = document.createElement("label");
                labelPrecio.name = "precio";
                labelPrecio.id = "precio_"+verdurasData[i][0];
                labelPrecio.innerText = verdurasData[i][j];
                cell.className="cellDer";
                cell.appendChild(labelPrecio);
            }else if (j==4){
                cell.className="cellDer";
                cell.innerHTML = verdurasData[i][j];
            }else if (j==6){ // agregamos input con un ID especifico para poder manipularlo segun los eventos
                let inputCantidad = document.createElement("input");
                inputCantidad.name = "cantidad";
                inputCantidad.id = "cantidad_"+verdurasData[i][0];
                inputCantidad.value = 0;
                inputCantidad.required;
                inputCantidad.type="number";
                inputCantidad.min=0;
                inputCantidad.max=verdurasData[i][4];
                cell.appendChild(inputCantidad);
            } else if (j==7){ // agregamos lables con un ID especifico para poder manipularlo segun los eventos
                let labelSubtotal = document.createElement("label");
                labelSubtotal.name = "subtotal";
                labelSubtotal.id = "subtotal_"+verdurasData[i][0];
                labelSubtotal.innerText = 0;
                cell.className="cellDer";
                cell.appendChild(labelSubtotal);
            } else if (j==8){ // agregamos lables con un ID especifico para poder manipularlo segun los eventos
                let labelDescuento = document.createElement("label");
                labelDescuento.name = "descuento";
                labelDescuento.id = "descuento_"+verdurasData[i][0];
                labelDescuento.innerText = 0;
                cell.className="cellDer";
                cell.appendChild(labelDescuento);
            }else if (j==9){ // agregamos lables con un ID especifico para poder manipularlo segun los eventos
                let labelIVA = document.createElement("label");
                labelIVA.name = "iva";
                labelIVA.id = "iva_"+verdurasData[i][0];
                labelIVA.innerText = 0;
                cell.className="cellDer";
                cell.appendChild(labelIVA);
            }
            else{
                cell.innerHTML = verdurasData[i][j];
            }            
        }
    }

    // agregamos el footer de la tabla para los campos de totales
    let footerrow = table.insertRow(-1);
    for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        if(i<5){
            headerCell.innerHTML = "";
            footerrow.appendChild(headerCell);    
        }else if(i==5){
            headerCell.innerHTML = "TOTALES:";
            footerrow.appendChild(headerCell);
        }else if(i==6){
            let labelTotalVerduras = document.createElement("label");
            labelTotalVerduras.name = "TotalVerduras";
            labelTotalVerduras.id = "TotalVerduras";
            labelTotalVerduras.innerText = 0;
            headerCell.appendChild(labelTotalVerduras);
            footerrow.appendChild(headerCell);
        }else if(i==7){
            let labelTotalSubTotal = document.createElement("label");
            labelTotalSubTotal.name = "TotalSubTotal";
            labelTotalSubTotal.id = "TotalSubTotal";
            labelTotalSubTotal.innerText = 0;
            headerCell.appendChild(labelTotalSubTotal);
            footerrow.appendChild(headerCell);
        }else if(i==8){
            let labelTotalDescuento = document.createElement("label");
            labelTotalDescuento.name = "TotalDescuento";
            labelTotalDescuento.id = "TotalDescuento";
            labelTotalDescuento.innerText = 0;
            headerCell.appendChild(labelTotalDescuento);
            footerrow.appendChild(headerCell);
        }else if(i==9){
            let labelTotalIva = document.createElement("label");
            labelTotalIva.name = "TotalIva";
            labelTotalIva.id = "TotalIva";
            labelTotalIva.innerText = 0;
            headerCell.appendChild(labelTotalIva);
            footerrow.appendChild(headerCell);
        }
    }

    // agregamos la tabla generada al bloque respectivo
    divTable.innerHTML = "";
    divTable.appendChild(table);

    // despues de creada la tabla 
    // agregarmos los eventos a cada uno de los inputs 
    // correspondientes a la cantidad de verduras
    document.querySelectorAll('[id^="cantidad_"]').forEach(item => {
        item.addEventListener('input', event => {
            // para que los datos ingresados sean 
            // unicamente numeros enteros sino se deja en cero
            event.target.value = event.target.value.length==0 ? 0 : parseInt(event.target.value);
            event.target.value = isNaN(event.target.value) ? 0 : parseInt(event.target.value);
            
            // verificamos que la cantidad de producto seleccionado no sea mayor al existente
            // si es mayor dejamos la cantidad maxima en existencia
            if(parseInt(event.target.value) > parseInt(event.target.max)){
                event.target.value=event.target.max;
            }
            // actualizamos la sumatoria de productos 
            sumaCantidades();

            // buscamos el id correspondiente al subtotal
            let idverdura = item.id.split("_");
            let idprecio = '[id="precio_'+idverdura[1]+'"]';
            let idsubtotal = '[id="subtotal_'+idverdura[1]+'"]';
           
            let calculaSubtotal = 0;

            // calculamos el subtotal
            calculaSubtotal = parseInt(event.target.value)*parseInt(document.querySelector(idprecio).innerText);
            // asignamos el subtotal
            document.querySelector(idsubtotal).innerText=calculaSubtotal;
    
            calDescuentos(); // calculamos los descuentos segun los criterios
            sumaTotales(); // actualizamos todos los totales
        })
    });
}

// Evento para cerrar la ventana modal si se da click fuera de la ventana
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

