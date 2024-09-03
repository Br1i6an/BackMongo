import { Router } from "express";
import accesoControlador from "../controlador/AccesoControlador";

class AccesoRuta {
    public rutaAccesoAPI: Router;

    constructor() {
        this.rutaAccesoAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAccesoAPI.post("/singin", accesoControlador.iniciarSesion);
    }
} // End class
const accesoRuta = new AccesoRuta();
export default accesoRuta.rutaAccesoAPI;
