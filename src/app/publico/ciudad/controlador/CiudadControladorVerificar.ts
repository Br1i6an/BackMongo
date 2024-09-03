import fs from 'fs';
import ImagenMinuatura from '../../../../configuracion/utilidades/ImagenMiniatura';
import rutasImagenes from '../../../../configuracion/dominios/var_imagenes';

class CiudadControladorVerificar {

    public static obtenerBase64(privadoCiudad: string, tamanoImagen: number): any {
        let base = '';
        const rutaImagenSistema = rutasImagenes.fotoCiudadDefecto;
        const rutaImagenPrivada = rutasImagenes.rutaImagenCiudad + privadoCiudad;

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
}
export default CiudadControladorVerificar;