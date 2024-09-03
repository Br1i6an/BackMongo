import { Response } from "express";
import cifrar from "bcryptjs";

import AccesoEsquema from "../esquema/AccesoEsquema";
import UsuarioEsquema from "../../../compartido/esquema/UsuarioEsquema";
import AccesoControladorVerificar from "../controlador/AccesoVerificarControlador";

class AccesoDAO {

    protected static async sesion(correo: string, clave: string, res: Response): Promise<any> {
        const objAcceso = await AccesoEsquema.findOne({ correoAcceso: correo });
        if (objAcceso != null) {
            const verificarClave = cifrar.compareSync(clave, objAcceso.claveAcceso);
            if (verificarClave) {
                const usuario = await UsuarioEsquema.findById(objAcceso.codUsuario)
                    .populate({ path: "codRol", select: "nombreRol" })
                    .populate({ path: "codCiudad", select: "nombreCiudad" });
                const respuesta = AccesoControladorVerificar.procesarRespuesta(usuario, objAcceso.correoAcceso);
                res.status(200).json(respuesta);
            } else {
                res.status(401).json({ mensaje: "Contraseña no valida " });
            }
        } else {

            res.status(401).json({ mensaje: "Correo Eléctronico no valido " });
        }
    }

}

export default AccesoDAO;