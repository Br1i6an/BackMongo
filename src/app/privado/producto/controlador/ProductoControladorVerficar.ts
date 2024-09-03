import fs from 'fs';
import ImagenMinuatura from '../../../../configuracion/utilidades/ImagenMiniatura';
import rutasImagenes from '../../../../configuracion/dominios/var_imagenes';

class ProductoControladorVerificar {

    public static obtenerBase64(privadoProducto: string, tamanoImagen: number): any {
        let base = '';
        const rutaImagenSistema = rutasImagenes.fotoProductoDefecto;
        const rutaImagenPrivada = rutasImagenes.rutaImagenProducto + privadoProducto;

        if (fs.existsSync(rutaImagenPrivada)) {
            const imagenMiniatura = rutasImagenes.rutaImagenTemporal + privadoProducto;
            ImagenMinuatura.crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamanoImagen);
            base = fs.readFileSync(imagenMiniatura, 'base64')
            fs.unlinkSync(imagenMiniatura);
        } else {
            base = fs.readFileSync(rutaImagenSistema, 'base64');
        }

        return base;
    }

    public static construirBase64(nombrePrivado: string, base64Producto: string): any {
        let decodificacion = base64Producto.replace(/^data:image\/\w+;base64,/, '');
        fs.readdir(rutasImagenes.rutaImagenProducto, (err) => {
            if (err) {
                fs.mkdirSync(rutasImagenes.rutaImagenProducto, { recursive: true });
            }
            fs.writeFile(rutasImagenes.rutaImagenProducto + nombrePrivado, decodificacion, { encoding: 'base64' }, function () {
            });
        })
    }

    public static borrarImagen(nombrePrivado: string): void {
        fs.unlink(rutasImagenes.rutaImagenProducto + nombrePrivado, function (error) {
            if (error) {
                console.log('Error en eliminar imagen');
            } else {
                console.log('imagen eliminada con exito');
            }
        });
    }
}
export default ProductoControladorVerificar;