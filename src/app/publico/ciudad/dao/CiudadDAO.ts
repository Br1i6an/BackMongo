import { Response } from "express";
import CiudadControladorVerificar from "../controlador/CiudadControladorVerificar";

import * as  random from "nanoid";
import CiudadEsquema from "../../../compartido/esquema/CiudadEsquema";
import Ciudad from "../../../compartido/entidad/Ciudad";

class CiudadDAO {
    protected static async consultar(res: Response): Promise<any> {
        const respuesta = await CiudadEsquema.find();
        let base64 = "";
        let ciudades: Ciudad[] = [];
        respuesta.map((ciudad: any) => {
            base64 = CiudadControladorVerificar.obtenerBase64(ciudad.privadoFotoCiudad, 250);
            ciudades.push(new Ciudad(
                ciudad._id,
                ciudad.nombreCiudad,
                ciudad.publicoFotoCiudad,
                ciudad.privadoFotoCiudad,
                ciudad.estadoCiudad,
                base64
            ));

        })
        res.status(200).json(ciudades);
    }
}

export default CiudadDAO;