"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Menu_1 = __importDefault(require("../../../compartido/entidad/Menu"));
const MenuEsquema_1 = __importDefault(require("../../../compartido/esquema/MenuEsquema"));
class MenuDAO {
    static consultar(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const menus = yield MenuEsquema_1.default.find().populate('productosMenu')
                .populate({ path: "codCiudad" });
            const arrMenu = [];
            menus.map((menu) => __awaiter(this, void 0, void 0, function* () {
                arrMenu.push(new Menu_1.default(menu._id, menu.nombreMenu, menu.codCiudad, menu.productosMenu));
            }));
            res.status(200).json(arrMenu);
        });
    }
    static consultarMenu(codMenu, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrMenu = [];
            if (mongoose_1.Types.ObjectId.isValid(codMenu)) {
                const menu = yield MenuEsquema_1.default.findById(codMenu).populate('productosMenu')
                    .populate({ path: "codCiudad" });
                res.status(200).json(menu);
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
}
exports.default = MenuDAO;
