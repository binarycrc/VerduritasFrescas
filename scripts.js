const form = document.getElementById('form');
const identificacion = document.getElementById('identificacion');
const tipoIdentificacion = document.getElementById('tipoIdentificacion');
const labelPatron = document.getElementById('labelPatron');
const divTable = document.getElementById('divTable');

let sumCantidades = 0;
let porcDescuento = 5/100;
let porcIva = 13/100;
let sumTotalVerduras=0;
let sumTotalSubTotal=0;
let sumTotalDescuento=0;
let sumTotalIva=0;
let patronIdentificacion= /[1-9]\d{8}/; //fisica nacional

identificacion.oninput = validaIdentificacion;
form.onsubmit = submit;

cargaVerduras();

function submit(event) {
    cambiaPatron();
    if((tipoIdentificacion.value==="fisica") && (patronIdentificacion.test(identificacion.value))){
        form.setAttribute('hidden', '');
        divTable.removeAttribute('hidden');    
    }else if((tipoIdentificacion.value==="juridica") && (patronIdentificacion.test(identificacion.value))){
        form.setAttribute('hidden', '');
        divTable.removeAttribute('hidden');    
    }else if((tipoIdentificacion.value==="dimex") && (patronIdentificacion.test(identificacion.value))){
        form.setAttribute('hidden', '');
        divTable.removeAttribute('hidden');    
    }else{alert("Tipo de identificación y formato de identificación no corresponden.");}
    event.preventDefault();
}

function validaIdentificacion(event) {
    event.target.setCustomValidity('');
    console.log(event.target.validity);
    if (event.target.value === '') {
        event.target.setCustomValidity('Identificación invalida');
    } else if (!(patronIdentificacion.test(event.target.value))){
        event.target.setCustomValidity('Formato de Identificación invalido');
    }
    else {
        event.target.setCustomValidity('');
    } 
}

tipoIdentificacion.addEventListener('change', cambiaPatron());

function cambiaPatron() {
    switch (tipoIdentificacion.value) {
        case "fisica":
            labelPatron.innerText="ex. 102340567  debe de contener 9 dígitos, sin cero al inicio y sin guiones ";
            patronIdentificacion= /[1-9]\d{8}/; //fisica nacional
            break;
        case "juridica":
            labelPatron.innerText="ex. 3045607891  debe contener 10 dígitos y sin guiones";
            patronIdentificacion= /[1-9]\d{9}/; //juridica nacional
            break;
        case "dimex":
            labelPatron.innerText="ex. 155663045607 debe contener 12 dígitos, sin ceros al inicio y sin guiones";
            patronIdentificacion= /[1-9]\d{11}/; //juridica nacional
            break;
        default:
            break;
    }
}

document.querySelectorAll('[id^="cantidad_"]').forEach(item => {
    item.addEventListener('input', event => {
        console.log(event);
        sumaCantidades();
        let idverdura = item.id.split("_");
        let idprecio = '[id="precio_'+idverdura[1]+'"]';
        let idsubtotal = '[id="subtotal_'+idverdura[1]+'"]';
        
        let idiva = '[id="iva_'+idverdura[1]+'"]';
        let calculaSubtotal = 0;

        calculaSubtotal = parseInt(event.target.value)*parseInt(document.querySelector(idprecio).innerText);
        document.querySelector(idsubtotal).innerText=calculaSubtotal;
       
        calDescuentos();
        sumaTotales();
    })
})

function sumaCantidades() {
    sumCantidades=0;
    document.querySelectorAll('[id^="cantidad"]').forEach(item => {
        sumCantidades+=parseInt(item.value);
    })
    document.querySelector("[id='TotalVerduras']").innerText=sumCantidades.toFixed(0);
}

function sumaTotales() {
    sumTotalVerduras=0;
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
    console.log(sumTotalIva);
}

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
        if(parseInt(sumCantidades) >= 5){
            calculaDescuento = calculaSubtotal-(calculaSubtotal*porcDescuento);
            calculaIva = calculaDescuento+(calculaDescuento*porcIva);
        }else{
            calculaIva = calculaSubtotal+(calculaSubtotal*porcIva);
        }
        document.querySelector(iddescuento).innerText=calculaDescuento.toFixed(2);
        document.querySelector(idiva).innerText=calculaIva.toFixed(2);
    })
}

function cargaVerduras() {
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

    //Create a HTML Table element.
    let table = document.createElement("TABLE");
    table.border = "1";

    //Get the count of columns.
    let columnCount = verdurasData[0].length;

    //Add the header row.
    let row = table.insertRow(-1);
    for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = verdurasData[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (let i = 1; i < verdurasData.length; i++) {
        row = table.insertRow(-1);
        for (let j = 0; j < columnCount; j++) {
            let cell = row.insertCell(-1);
            if (j==1){
                let imgVerdura = document.createElement("img");
                imgVerdura.src = verdurasData[i][j];
                imgVerdura.className="imgverdura";
                cell.appendChild(imgVerdura);
            }else if (j==3){
                let labelPrecio = document.createElement("label");
                labelPrecio.name = "precio";
                labelPrecio.id = "precio_"+verdurasData[i][0];
                labelPrecio.innerText = verdurasData[i][j];
                cell.className="cellDer";
                cell.appendChild(labelPrecio);
            }else if (j==6){
                let inputCantidad = document.createElement("input");
                inputCantidad.name = "cantidad";
                inputCantidad.id = "cantidad_"+verdurasData[i][0];
                inputCantidad.value = 0;
                inputCantidad.required;
                inputCantidad.type="number";
                inputCantidad.min=0;
                inputCantidad.max=verdurasData[i][4];
                cell.appendChild(inputCantidad);
            } else if (j==7){
                let labelSubtotal = document.createElement("label");
                labelSubtotal.name = "subtotal";
                labelSubtotal.id = "subtotal_"+verdurasData[i][0];
                labelSubtotal.innerText = 0;
                cell.className="cellDer";
                cell.appendChild(labelSubtotal);
            } else if (j==8){
                let labelDescuento = document.createElement("label");
                labelDescuento.name = "descuento";
                labelDescuento.id = "descuento_"+verdurasData[i][0];
                labelDescuento.innerText = 0;
                cell.className="cellDer";
                cell.appendChild(labelDescuento);
            }else if (j==9){
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

    let divTable = document.getElementById("divTable");
    //Add the footer row.
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

    divTable.innerHTML = "";
    divTable.appendChild(table);
}
