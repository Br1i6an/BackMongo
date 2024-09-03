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
        this.apiRutaProducto.get("/one/:codProducto", productoControlador.obtenerProducto);
        this.apiRutaProducto.post("/paginate", productoControlador.obtenerProductosPaginar);
        this.apiRutaProducto.post("/add", productoControlador.crearProducto);
        this.apiRutaProducto.put("/updateinfo", productoControlador.editarProducto);
        this.apiRutaProducto.put("/updatephoto", productoControlador.editarFotoProducto);
        this.apiRutaProducto.delete("/delete/:codProducto", productoControlador.eliminarProducto);
    }


}

const productoRuta = new ProductoRuta();
export default productoRuta.apiRutaProducto;