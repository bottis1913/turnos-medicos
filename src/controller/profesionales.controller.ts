import { arrayProfesionales } from "../resources.js"
import type { Profesional } from "../resources.js"
import { type Response, type Request } from "express"

export class ProfesionalesController {
    static statusCode = 200

    static getAll = async (req: Request, res: Response) => {
        this.statusCode = 200
        try {
            const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any) => prof.activo === true);

            if (!profesionalesFiltrados) {
                throw new Error("No hay profesionales activos en este momento")
            }

            return res.status(200)
                .json(profesionalesFiltrados);
        } catch (error) {
            this.statusCode = 400
            return res.status(this.statusCode)
                .json({ status: false, errorMessage: "Verifica el código de especialidad enviado." });
        }

    }

    static findById = async (req: Request, res: Response) => {
        this.statusCode = 200
        try {
            const profesionalId = req.params.id;

            if (!profesionalId) {
                this.statusCode = 400
                throw new Error("Verifica el codigo o ID del profesional")
            }

            const profesionalSeleccionado = arrayProfesionales.find((prof: any) => prof.profesionalId === Number(profesionalId));

            if (!profesionalSeleccionado) {
                this.statusCode = 404
                throw new Error("Error al buscar un profesional médico")
            }


            return res.status(200)
                .json(arrayProfesionales);

        } catch (error) {
            return res.status(this.statusCode)
                .json({ status: false, errorMessage: (error as Error).message || "Error buscando un profesional." });
        }
    }

    static create = async (req: Request, res: Response) => {
        this.statusCode = 201
        try {
            const { nombre, especialidad, activo } = req.body

            if (!nombre || !especialidad || !activo) {
                this.statusCode = 400
                throw new Error("Verifica los datos del nuevo profesional a crear")
            }

            const nuevoProfesional: Profesional = {
                profesionalId: arrayProfesionales.length + 1,
                nombre: nombre,
                especialidad: especialidad,
                activo: Boolean(activo)
            }

            arrayProfesionales.push(nuevoProfesional)

            return res.status(this.statusCode)
                .json(nuevoProfesional)


        } catch (error) {
            return res.status(this.statusCode)
                .json({ status: false, message: "error al crear el nuevo profesional" }
                )
        }


    }

    static modify = async (req: Request, res: Response) => {
        this.statusCode = 200
        try {
            const profesionalId = req.params.profesionalId


            if (!profesionalId) {
                this.statusCode = 400
                throw new Error("Verifica el codigo o ID del profesional a buscar")
            }
            const { nombre, especialidad, activo } = req.body

            if (!nombre || !especialidad || !activo) {
                this.statusCode = 400
                throw new Error("Verifica los datos del profesional a modificar ")
            }

            const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))

            if (indice === -1) {
                this.statusCode = 404
                throw new Error("No se encontro un profesional con el codigo indicado")
            }

            arrayProfesionales[indice].nombre = nombre
            arrayProfesionales[indice].especialidad = especialidad
            arrayProfesionales[indice].activo = Boolean(activo)

            // PARA QUE APAREZCA EN LA TERMINAL
            console.log("--- Profesional Modificado ---");
            console.table(arrayProfesionales);

            return res.status(this.statusCode)
                .json(arrayProfesionales[indice])




        } catch (error) {
            return res.status(this.statusCode)
                .json({ status: false, errorMessage: (error as Error).message || "Error al modificar el profesional." })
        }
    }

    static delete = async (req: Request, res: Response) => {
        this.statusCode = 204
        try {
            const profesionalId = req.params.profesionalId

            if (!profesionalId) {
                this.statusCode = 400
                throw new Error("Verifica el codigo o ID del profesional a buscar")
            }


            const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))

            if (indice === -1) {
                this.statusCode = 404
                throw new Error('Error al intentar cambiar el estado activo de un profesional.')
            }

            arrayProfesionales[indice].activo = false
            return res.status(this.statusCode)
                .json({})

        } catch (error) {
            return res.status(this.statusCode)
                .json({ status: false, errorMessage: (error as Error).message || "Error al intentar realizar la operación." })
        }
    }
}