import { Router } from "express";
import ciudadControlador from "../controlador/CiudadControlador";
class CiudadRuta {

    public apiRutaCiudad: Router;

    constructor() {
        this.apiRutaCiudad = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void {
        this.apiRutaCiudad.get("/all", ciudadControlador.obtenerCiudades);
    }


}

const ciudadRuta = new CiudadRuta();
export default ciudadRuta.apiRutaCiudad;