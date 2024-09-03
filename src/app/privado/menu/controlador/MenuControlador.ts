import { Request, Response } from "express";
import MenuDAO from "../dao/MenuDAO";

class MenuControlador extends MenuDAO {

    public obtenerMenus(req: Request, res: Response): void {
        MenuControlador.consultar(res);
    }
    public obtenerMenu(req: Request, res: Response): void {
        MenuControlador.consultarMenu(req.params.codigo, res);
    }

}

const menuControlador = new MenuControlador();
export default menuControlador;