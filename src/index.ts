import { configuracionAgenda } from "./resources.js";
import { arrayEspecialidades, arrayProfesionales } from "./resources.js";

console.clear()
console.log('CONFIGURACION')
console.table(configuracionAgenda)
console.log('PROFESIONALES')
console.table(arrayProfesionales)
console.log('ESPECIALIDADES')
console.table(arrayEspecialidades)