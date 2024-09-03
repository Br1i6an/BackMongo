import { Request, Response } from "express";
import ProductoDAO from "../dao/ProductoDAO";


class ProductoControlador extends ProductoDAO {

    public obtenerProducto(req: Request, res: Response): void {
        ProductoControlador.consultarProducto(req.params.codProducto, res);
    }

    public obtenerProductos(req: Request, res: Response): void {
        ProductoControlador.consultar(res);
    }


    public obtenerProductosPaginar(req: Request, res: Response): void {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = ((paginaActual - 1) * cantidadMostrar);
        const parametros = [valorRegistro, cantidadMostrar];
        ProductoControlador.productosPaginar(parametros, res);

    }

    public crearProducto(req: Request, res: Response): void {
        ProductoControlador.agregarProducto(res, req.body);
    }

    public editarProducto(req: Request, res: Response): void {
        ProductoControlador.actualizarProducto(res, req.body.codProducto, req.body);
    }

    public editarFotoProducto(req: Request, res: Response): void {
        ProductoControlador.actualizarFotoProducto(res, req.body.codProducto, req.body);
    }

    public eliminarProducto(req: Request, res: Response): void {
        ProductoControlador.borrarProducto(res, req.params.codProducto);
    }

}

const productoControlador = new ProductoControlador();
export default productoControlador;