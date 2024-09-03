import { Router } from "express";
import registroControlador from "../controlador/RegistroControlador";
class RegistroRuta {
    public rutaRegistroAPI: Router;

    constructor() {
        this.rutaRegistroAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaRegistroAPI.post("/user", registroControlador.registrarUsuario);
    }
} // End class
const registroRuta = new RegistroRuta();
export default registroRuta.rutaRegistroAPI;
