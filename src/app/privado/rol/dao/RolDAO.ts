import { Response } from "express";
import UsuarioEsquema from "../../../compartido/esquema/UsuarioEsquema";
import RolEsquema from "../../../compartido/esquema/RolEsquema";
import { Types } from "mongoose";
import Rol from "../../../compartido/entidad/Rol";

class RolDAO {
    protected static async consultar(res: Response): Promise<any> {
        const roles = await RolEsquema.find();
        const arrRol: Rol[] = [];

        roles.map(async (rol: any) => {
            arrRol.push(new Rol(rol._id, rol.nombreRol, rol.estadoRol));
        })
        res.status(200).json(arrRol);
    }

    protected static async consultarRol(codigoRol: string, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(codigoRol)) {
            await RolEsquema.findById(codigoRol)
                .then((respuesta: any) => {
                    res.status(200).json(new Rol(respuesta._id, respuesta.nombreRol, respuesta.estadoRol));
                })
                .catch((err) => {
                    res.status(400).json({ mensaje: "Fallo al consultar el Rol" });
                });

        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }

    protected static async agregarRol(res: Response, parametros: any): Promise<any> {
        delete parametros.datosUsuario;
        const nuevoRol = new RolEsquema(parametros);
        nuevoRol.save()
            .then((objRol) => {
                res.status(200).json({
                    "Mensaje": "Rol creado",
                    "objeto": objRol
                })
            }).catch((miErrorsito) => {
                console.log(miErrorsito);
                res.status(400).json({ "respuesta": "Fallo el rol" });

            });
    }

    protected static async actualizar(res: Response, identificador: string, parametros: any): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;

        const existe = await RolEsquema.findById(identificador).exec();

        if (existe) {
            await RolEsquema.findByIdAndUpdate({ _id: identificador }, { $set: parametros })
                .then((objeto: any) => {
                    res.status(200).json({ antiguo: objeto, nuevo: parametros });
                }).catch((miErrosito) => {
                    console.log(miErrosito);
                    res.status(400).json({ respuesta: "Error al actualizar el  Rol" });

                })

        } else {
            res.status(400).json({ respuesta: "el Rol que desea editar no existe" });
        }
    }


    protected static async borrar(res: Response, identificador: string): Promise<any> {
        const existe = await RolEsquema.findById(identificador).exec();
        if (existe) {
            const llave = { _id: identificador };
            const cantidad = await UsuarioEsquema.find({ codRol: llave }).count();
            if (cantidad == 0) {
                RolEsquema.findByIdAndDelete(identificador)
                    .then((objeto: any) => {
                        res.status(200).json({ eliminado: objeto });

                    }).catch((miErrorsito) => {
                        console.log(miErrorsito);
                        res.status(400).json({ respuesta: "Error al eliminar el  Rol" });
                    })
            } else {
                res.status(400).json({ respuesta: "el Rol con Usuarios" });
            }
        } else {
            res.status(400).json({ respuesta: "el Rol no existe" });
        }
    }


}

export default RolDAO;
