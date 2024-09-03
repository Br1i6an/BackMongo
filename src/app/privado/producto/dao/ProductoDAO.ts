import { Types } from "mongoose";
import { Response } from "express";

import Producto from "../../../compartido/entidad/Producto";
import ProductoEsquema from "../../../compartido/esquema/ProductoEsquema";
import ProductoControladorVerificar from "../controlador/ProductoControladorVerficar";
import { nanoid } from "nanoid";

class ProductoDAO {
    protected static async consultar(res: Response): Promise<any> {
        await ProductoEsquema.find().then((productos) => {
            const arregloProductos: Producto[] = [];
            productos.map((objProducto: any) => {
                const base64 = ProductoControladorVerificar.obtenerBase64(objProducto.privadoFotoProducto, 300);
                arregloProductos.push(new Producto(objProducto._id, objProducto.nombreProducto,
                    objProducto.detalleProducto, objProducto.valorProducto, objProducto.publicoFotoProducto, "", base64));
            });
            res.status(200).json(arregloProductos);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Fallo al consultar los Productos" });
        });
    }
    protected static async productosPaginar(parametros: any, res: Response): Promise<any> {
        await ProductoEsquema.find().skip(parametros[0]).limit(parametros[1])
            .then((productos) => {
                const arregloProductos: Producto[] = [];
                productos.map((objProducto: any) => {
                    const base64 = ProductoControladorVerificar.obtenerBase64(objProducto.privadoFotoProducto, 300);
                    arregloProductos.push(new Producto(objProducto._id, objProducto.nombreProducto,
                        objProducto.detalleProducto, objProducto.valorProducto, objProducto.publicoFotoProducto, "", base64));
                });
                res.status(200).json(arregloProductos);
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Fallo al consultar los Productos" });
            });
    }

    protected static async consultarProducto(identificador: string, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            await ProductoEsquema.findById(identificador)
                .then((respuesta: any) => {
                    const base64 = ProductoControladorVerificar.obtenerBase64(respuesta.privadoFotoProducto, 300);
                    const objProducto = new Producto(respuesta._id, respuesta.nombreProducto,
                        respuesta.detalleProducto, respuesta.valorProducto,
                        respuesta.publicoFotoProducto, "", base64);
                    res.status(200).json(objProducto);

                }).catch((miError) => {
                    console.log(miError);
                    res.status(400).json({ respuesta: "fallo al consultar el producto" })

                });
        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }

    protected static async agregarProducto(res: Response, parametros: any): Promise<any> {
        const privadoProducto = 'IMG_PROD_' + nanoid(20) + "." + parametros.publicoFotoProducto.split('.')[1];
        ProductoControladorVerificar.construirBase64(privadoProducto, parametros.base64Producto);
        parametros.privadoFotoProducto = privadoProducto;
        const nuevoProducto = new ProductoEsquema(parametros);
        nuevoProducto.save()
            .then((objProducto) => {
                res.status(200).json({
                    "Mensaje": "Producto creado",
                    "objeto": objProducto
                })
            }).catch((miErrorsito) => {
                console.log(miErrorsito);
                res.status(400).json({ "respuesta": "Fallo al crear tu Producto" });

            });

    }

    protected static async actualizarProducto(res: Response, identificador: string, parametros: any): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;
        if (Types.ObjectId.isValid(identificador)) {
            const existe = await ProductoEsquema.findById(identificador).exec();
            if (existe) {
                parametros.privadoFotoProducto = existe.privadoFotoProducto;
                // parametros.publicoFotoProducto = existe.publicoFotoProducto;
                await ProductoEsquema.findByIdAndUpdate({ _id: identificador }, { $set: parametros })
                    .then((objeto: any) => {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }).catch((miErrosito) => {
                        console.log(miErrosito);
                        res.status(400).json({ respuesta: "Error al actualizar el  Producto, verificar la información" });

                    })

            } else {
                res.status(400).json({ respuesta: "el producto para editar no existe" });
            }
        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }

    protected static async actualizarFotoProducto(res: Response, identificador: any, parametros: any): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;
        if (Types.ObjectId.isValid(identificador)) {
            const objProducto = await ProductoEsquema.findById(identificador).exec();
            if (objProducto) {
                ProductoControladorVerificar.borrarImagen(objProducto.privadoFotoProducto);

                const privadoProducto = 'IMG_PROD_' + nanoid(20) + "." + parametros.publicoFotoProducto.split('.')[1];
                ProductoControladorVerificar.construirBase64(privadoProducto, parametros.base64Producto);
                parametros.privadoFotoProducto = privadoProducto;

                await ProductoEsquema.findByIdAndUpdate({ _id: identificador }, { $set: parametros })

                    .then((objeto: any) => {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    })
                    .catch((miErrosito) => {
                        console.log(miErrosito);
                        res.status(400).json({ respuesta: "Error al actualizar la foto del producto" });

                    })
            } else {
                res.status(400).json({ respuesta: "fallo al cambiar la foto del producto" });
            }
        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }


    protected static async borrarProducto(res: Response, identificador: string): Promise<any> {
        const existe = await ProductoEsquema.findById(identificador).exec();

        if (existe) {
            ProductoControladorVerificar.borrarImagen(existe.privadoFotoProducto);
            ProductoEsquema.findByIdAndDelete(identificador)
                .then((objeto: any) => {
                    res.status(200).json({ eliminado: objeto });

                }).catch((miErrorsito) => {
                    console.log(miErrorsito);
                    res.status(400).json({ respuesta: "Error al eliminar el  Producto" });
                })

        } else {
            res.status(400).json({ respuesta: "el producto no existe" });
        }
    }


}

export default ProductoDAO;
