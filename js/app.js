import { valida } from "./validaciones.js";

//Seleccionamos todos los inputs 
const inputs = document.querySelectorAll("input");

//agregamos a cada uno de los input el evento listener y llama a la funcion valida
inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});