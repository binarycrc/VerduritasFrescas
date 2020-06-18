let form = document.getElementById('form');
let identificacion = document.getElementById('identificacion');
let divTable = document.getElementById('divTable');

let sumCantidades = 0;
let porcDescuento = 5/100;
let porcIva = 13/100;
let sumTotalSubTotal=0;
let sumTotalDescuento=0;
let sumTotalIva=0;

identificacion.oninvalid= invalidIdentificacion;
form.onsubmit = submit;
cargaVerduras();
function submit(event) {
    form.setAttribute('hidden', '');
    divTable.removeAttribute('hidden');
    
    event.preventDefault();
  }

function invalidIdentificacion(event) {
    event.target.setCustomValidity('');
    if (event.target.value === '') {
        event.target.setCustomValidity('Identificación de persona física invalida');
    } else if (event.target.validity.patternMismatch){
        event.target.setCustomValidity('Formato de Identificación de persona física invalida');
    }
    else {
        event.target.setCustomValidity('');
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
}

function sumaTotales() {
    sumTotalSubTotal=0;
    sumTotalDescuento=0;
    sumTotalIva=0;
    document.querySelectorAll('[id^="subtotal"]').forEach(item => {
        sumTotalSubTotal+=parseFloat(item.innerText).toFixed(2);
    })
    document.querySelectorAll('[id^="descuento"]').forEach(item => {
        sumTotalDescuento+=parseFloat(item.innerText).toFixed(2);
    })
    document.querySelectorAll('[id^="iva"]').forEach(item => {
        sumTotalIva+=parseFloat(item.innerText).toFixed(2);
    })
    document.querySelector("[id='TotalSubTotal']").innerText=sumTotalSubTotal;
    document.querySelector("[id='TotalDescuento']").innerText=sumTotalDescuento;
    document.querySelector("[id='TotalIva']").innerText=sumTotalIva;
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
        document.querySelector(iddescuento).innerText=calculaDescuento;
        document.querySelector(idiva).innerText=calculaIva;
    })
}

function cargaVerduras() {
    let verdurasData = new Array();
    verdurasData.push(["Id","Imagen","Descripción","Precio","Inventario","Fecha Expiracion","Cantidad", "Subtotal","Descuento","+IVA" ]);
    verdurasData.push([1," ","Banano",5,10,"01/07/2020",0]);
    verdurasData.push([2," ","Chayote",10,10,"01/07/2020",0]);
    verdurasData.push([3," ","Piña",15,10,"01/07/2020",0]);
    verdurasData.push([4," ","Tomate",20,10,"01/07/2020",0]);
    verdurasData.push([5," ","Camote",25,10,"01/07/2020",0]);
    verdurasData.push([6," ","Yuca",30,10,"01/07/2020",0]);
    verdurasData.push([7," ","Papa nacional",35,10,"01/07/2020",0]);
    verdurasData.push([8," ","Tiquisque",40,10,"01/07/2020",0]);
    verdurasData.push([9," ","Remolacha",45,10,"01/07/2020",0]);
    verdurasData.push([10," ","Cebolla",50,10,"01/07/2020",0]);

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
            if (j==3){
                let labelPrecio = document.createElement("label");
                labelPrecio.name = "precio";
                labelPrecio.id = "precio_"+verdurasData[i][0];
                labelPrecio.innerText = verdurasData[i][j];
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
                cell.appendChild(labelSubtotal);
            } else if (j==8){
                let labelDescuento = document.createElement("label");
                labelDescuento.name = "descuento";
                labelDescuento.id = "descuento_"+verdurasData[i][0];
                labelDescuento.innerText = 0;
                cell.appendChild(labelDescuento);
            }else if (j==9){
                let labelIVA = document.createElement("label");
                labelIVA.name = "iva";
                labelIVA.id = "iva_"+verdurasData[i][0];
                labelIVA.innerText = 0;
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
        if(i<6){
            headerCell.innerHTML = "";
            footerrow.appendChild(headerCell);    
        }else if(i==6){
            headerCell.innerHTML = "TOTALES:";
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
