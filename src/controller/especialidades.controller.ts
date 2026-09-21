import { arrayEspecialidades } from "../resources.js"
import type { Especialidad } from "../resources.js"
import { type Response, type Request } from "express"

export class EspecialidadesController {
    // getAll - findById, create, modify, delete
    static getAll = async (req: Request, res: Response) => {
        
        try {
            const especialidadesActivas = arrayEspecialidades.filter((esp: any) => esp.activa === true)

            if (!especialidadesActivas) {
                throw new Error("No hay especialidades activas en este momento")
            }
            return res.status(200)
                .json(especialidadesActivas)
        } catch (error) {
            return res.status(400)
                .json({ success: false, message: "Ha ocurrido un error al obtener las especialidades" });
        }
    }

    static findById = async (req: Request, res: Response) => {
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
                return res.status(200)
                    .json(especialidadSolicitada);
            }

        } catch (error) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const { nombreEspecialidad, activa } = req.body
    
    
            if (!nombreEspecialidad || !activa) {
                throw new Error("Verifique los datos enviados para la nueva especialidad")
            }
    
            const nuevaEspecialidad: Especialidad = {
                especialidadId: arrayEspecialidades.length + 1,
                nombreEspecialidad: nombreEspecialidad,
                activa: Boolean(activa)
    
            }
            arrayEspecialidades.push(nuevaEspecialidad)
    
    
            return res.status(201)
                .json(nuevaEspecialidad)
    
    
    
    
        } catch (error) {
            return res.status(400).json({ success: false, mesaje: (error as Error).message });
        }
    }

    static delete = async (req: Request, res: Response) => {
    try {
        const especialidadId: number = Number(req.params.id as string)

        if (!especialidadId) {
            throw new Error("Verifica el codigo o ID de la especialidad ")
        }

        const indice: number = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === especialidadId)

        if (!especialidadId) {
            throw new Error("No se encontro especialidad con el codigo indicado ")
        }


        arrayEspecialidades[indice].activa = false;

        return res.status(204)
            .json({});



    } catch (error) {
        return res.status(500).json({ error: 'Verifica el codigo o ID de la especialidad' });
    }

}




}