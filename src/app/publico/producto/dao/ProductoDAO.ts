import { Response } from "express";
import ProductoEsquema from "../../../compartido/esquema/ProductoEsquema";

class ProductoDAO {
    protected static async consultarProductos(res: Response): Promise<any> {
        const misProductitos = await ProductoEsquema.find();
        res.status(200).json(misProductitos);
    }

}

export default ProductoDAO;
