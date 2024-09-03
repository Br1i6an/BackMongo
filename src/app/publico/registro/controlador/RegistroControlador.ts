
import { Request, Response } from "express";
import RegistroDAO from "../dao/RegistroDAO";
import Usuario from "../../../compartido/entidad/Usuario";
import { nanoid } from "nanoid";


class RegistroControlador extends RegistroDAO {

    public registrarUsuario(req: Request, res: Response): void {
        const usuarioCrear = req.body;
        RegistroControlador.registrar(usuarioCrear, res);
    }


} // end class

const registroControlador = new RegistroControlador();
export default registroControlador;
