import { json } from "node:stream/consumers";
import { configuracionAgenda } from "./resources.js";
import { arrayEspecialidades, arrayProfesionales } from "./resources.js";
import type { Especialidad, Profesional } from "./resources.js";
import express, { type Request, type Response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.use(express.json());

// ==========================================
// ESPECIALIDADES
// ==========================================

// GET /especialidades
app.get('/especialidades', (req: Request, res: Response) => {
    try {
        res.status(200)
            .json(arrayEspecialidades)
    } catch (error) {
        res.status(400)
            .json({ success: false, message: "Error al intentar enviar los datos de especialidades." });
    }
});

// GET /especialidades/:id
app.get('/especialidades/:id', (req: Request, res: Response) => {
    try {
        const especialidadId: number | undefined = Number(req.params.id)

        if (!especialidadId) {
            throw new Error('Error al obtener el codigo de la especialidad')

        }

        const especialidadSolicitada = arrayEspecialidades.find((esp: any) => esp.especialidadId === especialidadId);

        if (!especialidadSolicitada) {
            throw new Error('No se encontró la especialidad indicada.');
        } else {
            console.clear()
            console.table(especialidadSolicitada)
            res.status(200)
                .json(especialidadSolicitada);
        }

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST /especialidades
app.post('/especialidades', (req: Request, res: Response) => {
    try {
        const { nombreEspecialidad, activa } = req.body

        const nuevaEspecialidad: Especialidad = {
            especialidadId: arrayEspecialidades.length + 1,
            nombreEspecialidad: nombreEspecialidad,
            activa: Boolean(activa)

        }
        arrayEspecialidades.push(nuevaEspecialidad)

        console.clear()
        console.table(nuevaEspecialidad)
        res.status(201)
            .json(nuevaEspecialidad)




    } catch (error) {
        res.status(400).json({ success: false, mesaje: (error as Error).message });
    }
});

// DELETE /especialidades/:id
app.delete('/especialidades/:id', (req: Request, res: Response) => {
    try {
        const especialidadId: number = Number(req.params.id as string)

        const indice: number = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === especialidadId)

        if (indice > -1) {
            arrayEspecialidades[indice].activa = false;

            res.status(204)
                .json({});
        }


    } catch (error) {
        res.status(500).json({ error: 'error interno del servidor' });
    }

});

// ==========================================
// PROFESIONALES MÉDICOS
// ==========================================

// GET /profesionales
app.get('/profesionales', (req: Request, res: Response) => {
    try {
        const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any) => prof.activo === true);

        res.status(200)
            .json(profesionalesFiltrados);
    } catch (error) {
        res.status(400)
            .json({ status: false, errorMessage: "Verifica el código de especialidad enviado." });
    }

});

// GET /profesionales/:id
app.get('/profesionales/:id', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.id;
        const profesionalSeleccionado = arrayProfesionales.find((prof: any) => prof.profesionalId === Number(profesionalId));

        if (profesionalSeleccionado) {
            res.status(200)
                .json(arrayProfesionales);
        } else {
            throw new Error('Error al buscar un Profesional médico.');
        }
    } catch (error) {
        res.status(400)
            .json({ status: false, errorMessage: (error as Error).message || "Error buscando un profesional." });
    }
});

// POST /profesionales
app.post('/profesionales', (req: Request, res: Response) => {
    try {
        const { nombre, especialidad, activo } = req.body

        const nuevoProfesional: Profesional = {
            profesionalId: arrayProfesionales.length + 1,
            nombre: nombre,
            especialidad: especialidad,
            activo: Boolean(activo)
        }

        arrayProfesionales.push(nuevoProfesional)

        res.status(201)
            .json(nuevoProfesional)


    } catch (error) {
        res.status(400)
            .json({ status: false, errorMessage: (error as Error).message || 'Error creando un nuevo profesional' })
    }


});

// PUT /profesionales/:id
app.put('/profesionales/:profesionalId', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.profesionalId
        const { nombre, especialidad, activo } = req.body

        const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))
        if (indice > -1) {
            arrayProfesionales[indice].nombre = nombre
            arrayProfesionales[indice].especialidad = especialidad
            arrayProfesionales[indice].activo = Boolean(activo)

            res.status(200)
                .json(arrayProfesionales[indice])

        } else {
            throw new Error('No se encontró el profesional indicado.')
        }
    } catch (error) {
        res.status(400)
            .json({ status: false, errorMessage: (error as Error).message || "Error al modificar el profesional." })
    }
});

// DELETE /profesionales/:id
app.delete('/profesionales/:profesionalId', (req: Request, res: Response) => {
    try {
        const profesionalId = req.params.profesionalId
        const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))

        if (indice > -1) {
            arrayProfesionales[indice].activo = false
            res.status(204)
                .json({})
        } else {
            throw new Error('Error al intentar cambiar el estado activo de un profesional.')
        }

    } catch (error) {
        res.status(400)
            .json({ status: false, errorMessage: (error as Error).message || "Error al intentar realizar la operación." })
    }
});

app.use((req: Request, res: Response) => {
    try {
        res.status(404).json({
            error: 'Endpoint no encontrado',
            ruta: req.originalUrl,
            metodo: req.method
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});