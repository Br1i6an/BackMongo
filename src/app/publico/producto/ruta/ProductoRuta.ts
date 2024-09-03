import { Router } from "express";
import productoControlador from "../controlador/ProductoControlador";

class ProductoRuta {

    public apiRutaProducto: Router;

    constructor() {
        this.apiRutaProducto = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void {
        this.apiRutaProducto.get("/all", productoControlador.obtenerProductos);
    }


}

const productoRuta = new ProductoRuta();
export default productoRuta.apiRutaProducto;