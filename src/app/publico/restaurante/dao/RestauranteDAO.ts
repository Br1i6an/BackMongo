import { Types } from "mongoose";
import { Response } from "express";
import RestauranteEsquema from "../../../compartido/esquema/RestauranteEsquema";

class RestauranteDAO {
    protected static async consultar(res: Response): Promise<any> {
        const restaurantes = await RestauranteEsquema.find().populate({ path: "codCiudad" });
        res.status(200).json(restaurantes);
    }

    protected static async consultarXCiudad(idCiudad: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(idCiudad)) {
            const llave = { _id: idCiudad };
            RestauranteEsquema.find({ codCiudad: llave })
                .populate({ path: "codCiudad" })
                .then((respuesta) => {
                    res.status(200).json(respuesta);
                }).catch((miErrosito) => {
                    console.log(miErrosito);
                    res.status(400).json({ mensaje: "Fallo al consultar los restaurantes" });
                })
        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }
}
export default RestauranteDAO;