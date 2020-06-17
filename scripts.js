var identificacion = document.getElementById('identificacion');

function identificacionInvalido(textbox) {
    if (textbox.value === '') {
        textbox.setCustomValidity('Identificación de persona física invalida');
    } else if (textbox.validity.typeMismatch){
        textbox.setCustomValidity('Identificación de persona física invalida');
    } else if (textbox.validity.patternMismatch){
        textbox.setCustomValidity('Formato de Identificación de persona física invalida');
    }
    else {
       textbox.setCustomValidity('');
    }

    return true;
}