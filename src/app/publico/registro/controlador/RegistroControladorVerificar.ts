import { nanoid } from "nanoid";
import Usuario from "../../../compartido/entidad/Usuario";
import jwt from 'jsonwebtoken';


import ImagenMinuatura from '../../../../configuracion/utilidades/ImagenMiniatura';
import rutasImagenes from '../../../../configuracion/dominios/var_imagenes';
import fs from 'fs';

class RegistroControladorVerificar {

    public static procesarRespuesta(objUsuario: any, correo: any): any {
        const llavePrivada = String(process.env.SECRETA);

        const token = jwt.sign({
            'id': objUsuario._id,
            'correoAcceso': correo,
            'nombreRol': objUsuario.codRol.nombreRol,
            'nombreCiudad': objUsuario.codCiudad.nombreCiudad,
            'nombresUsuario': objUsuario.nombresUsuario,
            'apellidosUsuario': objUsuario.apellidosUsuario
        },
            llavePrivada, { expiresIn: '2h' }
        );

        const base64 = this.obtenerBase64("nofoto", 300);
        return { token: token, base64Usuario: base64 };
    }

    public static obtenerBase64(privadoCiudad: string, tamanoImagen: number): any {
        let base = '';
        const rutaImagenSistema = rutasImagenes.fotoCiudadDefecto;
        const rutaImagenPrivada = rutasImagenes.rutaImagenUsuario + privadoCiudad;

        if (fs.existsSync(rutaImagenPrivada)) {
            const imagenMiniatura = rutasImagenes.rutaImagenTemporal + privadoCiudad;
            ImagenMinuatura.crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamanoImagen);
            base = fs.readFileSync(imagenMiniatura, 'base64')
            fs.unlinkSync(imagenMiniatura);
        } else {
            base = fs.readFileSync(rutaImagenSistema, 'base64');
        }

        return base;
    }

    public static usuarioRegisto(parametros: any, ciudad: any, rol: any): Usuario {
        return new Usuario(
            parametros.nombresUsuario,
            parametros.apellidosUsuario,
            'DOC_USU' + nanoid(20),
            1,
            "No Disponible",
            "No Disponible",
            1,
            rol,
            ciudad
        );
    }


}

export default RegistroControladorVerificar;