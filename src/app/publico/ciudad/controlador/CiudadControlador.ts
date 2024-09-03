import { Request, Response } from "express";
import CiudadDAO from "../dao/CiudadDAO";

class CiudadControlador extends CiudadDAO {
    public obtenerCiudades(req: Request, res: Response): void {
        CiudadControlador.consultar(res);
    }
}
const ciudadControlador = new CiudadControlador();
export default ciudadControlador;