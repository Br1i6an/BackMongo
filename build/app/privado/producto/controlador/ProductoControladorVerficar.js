"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ImagenMiniatura_1 = __importDefault(require("../../../../configuracion/utilidades/ImagenMiniatura"));
const var_imagenes_1 = __importDefault(require("../../../../configuracion/dominios/var_imagenes"));
class ProductoControladorVerificar {
    static obtenerBase64(privadoProducto, tamanoImagen) {
        let base = '';
        const rutaImagenSistema = var_imagenes_1.default.fotoProductoDefecto;
        const rutaImagenPrivada = var_imagenes_1.default.rutaImagenProducto + privadoProducto;
        if (fs_1.default.existsSync(rutaImagenPrivada)) {
            const imagenMiniatura = var_imagenes_1.default.rutaImagenTemporal + privadoProducto;
            ImagenMiniatura_1.default.crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamanoImagen);
            base = fs_1.default.readFileSync(imagenMiniatura, 'base64');
            fs_1.default.unlinkSync(imagenMiniatura);
        }
        else {
            base = fs_1.default.readFileSync(rutaImagenSistema, 'base64');
        }
        return base;
    }
    static construirBase64(nombrePrivado, base64Producto) {
        let decodificacion = base64Producto.replace(/^data:image\/\w+;base64,/, '');
        fs_1.default.readdir(var_imagenes_1.default.rutaImagenProducto, (err) => {
            if (err) {
                fs_1.default.mkdirSync(var_imagenes_1.default.rutaImagenProducto, { recursive: true });
            }
            fs_1.default.writeFile(var_imagenes_1.default.rutaImagenProducto + nombrePrivado, decodificacion, { encoding: 'base64' }, function () {
            });
        });
    }
    static borrarImagen(nombrePrivado) {
        fs_1.default.unlink(var_imagenes_1.default.rutaImagenProducto + nombrePrivado, function (error) {
            if (error) {
                console.log('Error en eliminar imagen');
            }
            else {
                console.log('imagen eliminada con exito');
            }
        });
    }
}
exports.default = ProductoControladorVerificar;
