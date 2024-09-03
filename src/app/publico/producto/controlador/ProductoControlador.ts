import { Request, Response } from "express";
import ProductoDAO from "../dao/ProductoDAO";

class ProductoControlador extends ProductoDAO {

    public obtenerProductos(req: Request, res: Response): void {
        ProductoControlador.consultarProductos(res);
    }
}

const productoControlador = new ProductoControlador();
export default productoControlador;