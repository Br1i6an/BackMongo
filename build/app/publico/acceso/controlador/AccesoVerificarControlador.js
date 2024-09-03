"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ImagenMiniatura_1 = __importDefault(require("../../../../configuracion/utilidades/ImagenMiniatura"));
const var_imagenes_1 = __importDefault(require("../../../../configuracion/dominios/var_imagenes"));
const fs_1 = __importDefault(require("fs"));
class AccesoControladorVerificar {
    static procesarRespuesta(objUsuario, correo) {
        const llavePrivada = String(process.env.SECRETA);
        const token = jsonwebtoken_1.default.sign({
            'id': objUsuario._id,
            'correoAcceso': correo,
            'nombreRol': objUsuario.codRol.nombreRol,
            'nombreCiudad': objUsuario.codCiudad.nombreCiudad,
            'nombresUsuario': objUsuario.nombresUsuario,
            'apellidosUsuario': objUsuario.apellidosUsuario
        }, llavePrivada, { expiresIn: '2h' });
        const base64 = this.obtenerBase64("nofoto", 300);
        return { token: token, base64Usuario: base64 };
    }
    static obtenerBase64(privadoCiudad, tamanoImagen) {
        let base = '';
        const rutaImagenSistema = var_imagenes_1.default.fotoCiudadDefecto;
        const rutaImagenPrivada = var_imagenes_1.default.rutaImagenUsuario + privadoCiudad;
        if (fs_1.default.existsSync(rutaImagenPrivada)) {
            const imagenMiniatura = var_imagenes_1.default.rutaImagenTemporal + privadoCiudad;
            ImagenMiniatura_1.default.crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamanoImagen);
            base = fs_1.default.readFileSync(imagenMiniatura, 'base64');
            fs_1.default.unlinkSync(imagenMiniatura);
        }
        else {
            base = fs_1.default.readFileSync(rutaImagenSistema, 'base64');
        }
        return base;
    }
}
exports.default = AccesoControladorVerificar;
