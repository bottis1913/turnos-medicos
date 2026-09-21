import { json } from "node:stream/consumers";
import { configuracionAgenda } from "./resources.js";
import { arrayEspecialidades, arrayProfesionales } from "./resources.js";
import { ProfesionalesController } from "./controller/profesionales.controller.js";
import { GeneralController } from "./controller/general.controller.js";
import { EspecialidadesController } from "./controller/especialidades.controller.js";
import type { Especialidad, Profesional } from "./resources.js";
import express, { type Request, type Response } from 'express';
import { error } from "node:console";
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.use(express.json());


//ENDPOINTS
//HELLO WORLD

app.get("/", GeneralController.helloWorld)

// ==========================================
// ESPECIALIDADES
// ==========================================

// GET /especialidades
app.get('/especialidades', EspecialidadesController.getAll);

// GET /especialidades/:id
app.get('/especialidades/:id', EspecialidadesController.findById);

// POST /especialidades
app.post('/especialidades', EspecialidadesController.create);

// DELETE /especialidades/:id
app.delete('/especialidades/:id', EspecialidadesController.delete);

// ==========================================
// PROFESIONALES MÉDICOS
// ==========================================

// GET /profesionales
app.get('/profesionales', ProfesionalesController.getAll);

// GET /profesionales/:id
app.get('/profesionales/:id', ProfesionalesController.findById);

// POST /profesionales
app.post('/profesionales', ProfesionalesController.create);

// PUT /profesionales/:id
app.put('/profesionales/:profesionalId', ProfesionalesController.modify);

// DELETE /profesionales/:id
app.delete('/profesionales/:profesionalId', ProfesionalesController.delete,);

app.use( GeneralController.notFound);