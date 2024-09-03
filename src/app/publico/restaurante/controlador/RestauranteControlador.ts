import { Request, Response } from "express";
import RestauranteDAO from "../dao/RestauranteDAO";

class RestauranteControlador extends RestauranteDAO {
    public obtenerRestaurantes(req: Request, res: Response): void {
        RestauranteControlador.consultar(res);
    }

    public obtenerRestauranteCiudad(req: Request, res: Response): void {
        RestauranteControlador.consultarXCiudad(req.params.codigo, res);
    }
}
const restauranteControlador = new RestauranteControlador();
export default restauranteControlador;