import sharp from 'sharp';

class ImagenMinuatura {

    public static crearMiniatura(rutaImagenPrivada: string, imagenMiniatura: string, tamano: number): any {
        let esperar = true;
        const dataSharp = sharp(rutaImagenPrivada).resize({ width: tamano })
            .toFile(imagenMiniatura,
                (err) => { if (err) { } else { esperar = false; } });
        while (esperar) { require('deasync').sleep(200); }
        return dataSharp;
    }


}

export default ImagenMinuatura;

