import { Response } from "express";
import RolEsquema from "../../../compartido/esquema/RolEsquema";
import { Types } from "mongoose";
import Menu from "../../../compartido/entidad/Menu";
import MenuEsquema from "../../../compartido/esquema/MenuEsquema";

class MenuDAO {
    protected static async consultar(res: Response): Promise<any> {
        const menus = await MenuEsquema.find().populate('productosMenu')
            .populate({ path: "codCiudad" });
        const arrMenu: Menu[] = [];

        menus.map(async (menu: any) => {
            arrMenu.push(new Menu(menu._id, menu.nombreMenu, menu.codCiudad, menu.productosMenu));
        })

        res.status(200).json(arrMenu);
    }
    protected static async consultarMenu(codMenu: string, res: Response): Promise<any> {
        const arrMenu: Menu[] = [];
        if (Types.ObjectId.isValid(codMenu)) {
            const menu = await MenuEsquema.findById(codMenu).populate('productosMenu')
                .populate({ path: "codCiudad" });

            res.status(200).json(menu);
        } else {
            res.status(400).json({ mensaje: "Indentificador no valido" });
        }
    }


}

export default MenuDAO;
