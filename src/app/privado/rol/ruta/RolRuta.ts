import { Router } from "express";
import rolControlador from "../controlador/RolControlador";

class RolRuta {

    public apiRutaRol: Router;

    constructor() {
        this.apiRutaRol = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void {
        this.apiRutaRol.get("/all", rolControlador.obtenerRoles);
        this.apiRutaRol.get("/one/:codigo", rolControlador.obtenerRol);
        this.apiRutaRol.post("/add", rolControlador.crearRol);
        this.apiRutaRol.put("/update", rolControlador.editarRol);
        this.apiRutaRol.delete("/delete/:codigo", rolControlador.eliminarRol);
    }


}

const rolRuta = new RolRuta();
export default rolRuta.apiRutaRol;