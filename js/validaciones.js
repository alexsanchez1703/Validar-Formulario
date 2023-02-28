//funcion verifica el tipo de input a traves de dataset.tipo 
export function valida (input) {
    const tipoDeInput = input.dataset.tipo;
    //Si dentro del obejto validadores se encuentra el tipo de input, si existe se pasa como parametro el target de input
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    //Si el valid que se encuentra dentro de valdity en el input es verdadero entonces este quita la clase CSS caso contario la agrega. A la etiqueta span se le modifica el HTML 
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

//Creamos un arreglo que contengan los tipos de errores del validity input
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]


//Se crea un objeto con los diferentes tipos de input que tenemos segun su data para poder validar y mostrar el error
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo Email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo Contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "El campo Numero telefonico no puede estar vacio",
        patternMismatch: "El formato debe contener solo 10 numeros (XXXXXXXXXX)"
    },
    direccion: {
        valueMissing: "El campo Direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres. "
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 40 caracteres. "
    },
    provincia: {
        valueMissing: "El campo Provincia no puede estar vacio",
        patternMismatch: "La provincia debe contener entre 4 a 40 caracteres. "
    }  
}

//Se crea un objeto con los diferentes tipos de input que tenemos segun su data
const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

//Funcion que muestra el mensaje de error dependiendo del tipo input y del tipo de error
function mostrarMensajeDeError(tipoDeInput,input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

//Validar la fecha de nacimiento que coloca el usuario
function validarNacimiento(input) {
    const fechaCliente = new Date (input.value);
    let mensaje = '';
    fechaCliente.setMinutes(fechaCliente.getMinutes() + fechaCliente.getTimezoneOffset());
    
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad.";
    }
    input.setCustomValidity(mensaje);
}

//Funcion que obtiene la fecha actual y la fecha del cliente y les suma 18, luego las compara 
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
       );
    return (fechaActual >= diferenciaFechas);
}