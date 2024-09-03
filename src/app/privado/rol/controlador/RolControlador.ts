import { Request, Response } from "express";
import RolDAO from "../dao/RolDAO";


class RolControlador extends RolDAO {

    public obtenerRoles(req: Request, res: Response): void {
        RolControlador.consultar(res);
    }
    public obtenerRol(req: Request, res: Response): void {
        RolControlador.consultarRol(req.params.codigo, res);
    }

    public crearRol(req: Request, res: Response): void {
        RolControlador.agregarRol(res, req.body);
    }

    public editarRol(req: Request, res: Response): void {
        RolControlador.actualizar(res, req.body.codRol, req.body);
    }

    public eliminarRol(req: Request, res: Response): void {
        RolControlador.borrar(res, req.params.codigo);
    }

}

const rolControlador = new RolControlador();
export default rolControlador;