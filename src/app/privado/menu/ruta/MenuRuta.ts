import { Router } from "express";
import menuControlador from "../controlador/MenuControlador";

class MenuRuta {

    public apiRutaMenu: Router;

    constructor() {
        this.apiRutaMenu = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void {
        this.apiRutaMenu.get("/all", menuControlador.obtenerMenus);
        this.apiRutaMenu.get("/one/:codigo", menuControlador.obtenerMenu);
    }


}

const menuRuta = new MenuRuta();
export default menuRuta.apiRutaMenu;