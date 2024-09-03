
import { Request, Response } from "express";
import AccesoDAO from '../dao/AccesoDAO';


class AccesoControlador extends AccesoDAO {

    public iniciarSesion(req: Request, res: Response): void {
        const correoAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        AccesoControlador.sesion(correoAcceso, claveAcceso, res);
    }
    

} // end class

const accesoControlador = new AccesoControlador();
export default accesoControlador;
