import { Response } from "express";
import AccesoEsquema from "../../acceso/esquema/AccesoEsquema";

import RolEsquema from "../../../compartido/esquema/RolEsquema";
import RegistroControladorVerificar from "../controlador/RegistroControladorVerificar";

import UsuarioEsquema from "../../../compartido/esquema/UsuarioEsquema";
import Acceso from "../../acceso/entidad/Acceso";
import cifrar from "bcryptjs";
import CiudadEsquema from "../../../compartido/esquema/CiudadEsquema";


class RegistroDAO {

    protected static async registrar(parametros: any, res: Response): Promise<any> {
        const verificarCorreo = await AccesoEsquema.findOne({ correoAcceso: parametros.correoAcceso });
        if (verificarCorreo == null) {
            const rol = await RolEsquema.findOne({ nombreRol: "Invitado" });
            const ciudad = await CiudadEsquema.findOne({ nombreCiudad: "BOGOTÁ, D.C." });
            const usuRegistro = RegistroControladorVerificar.usuarioRegisto(parametros, ciudad, rol);
            const nuevoUsuario = new UsuarioEsquema(usuRegistro);

            await nuevoUsuario.save();

            const claveCifrada = cifrar.hashSync(parametros.claveAcceso);
            const nuevoAcceso = new AccesoEsquema(new Acceso(parametros.correoAcceso,
                claveCifrada, nuevoUsuario));
            nuevoAcceso.save()
                .then((respuesta) => {
                    const respuestaRegistro = RegistroControladorVerificar.procesarRespuesta(respuesta.codUsuario, respuesta.correoAcceso);
                    res.status(200).json(respuestaRegistro);
                })
                .catch((miError) => {
                    console.log(miError);
                    res.status(400).json({ respuesta: "Fallo al registrar el usuario" })
                })
        } else {
            res.status(400).json({ respuesta: "Correo ya registrado" })

        }

    }

}

export default RegistroDAO;