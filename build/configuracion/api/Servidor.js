"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const conexionBD_1 = __importDefault(require("../conexion/conexionBD"));
const CiudadRuta_1 = __importDefault(require("../../app/publico/ciudad/ruta/CiudadRuta"));
const RestauranteRuta_1 = __importDefault(require("../../app/publico/restaurante/ruta/RestauranteRuta"));
const AccesoRuta_1 = __importDefault(require("../../app/publico/acceso/ruta/AccesoRuta"));
const RegistroRuta_1 = __importDefault(require("../../app/publico/registro/ruta/RegistroRuta"));
// privadas
const RolRuta_1 = __importDefault(require("../../app/privado/rol/ruta/RolRuta"));
const MenuRuta_1 = __importDefault(require("../../app/privado/menu/ruta/MenuRuta"));
const ProductoRuta_1 = __importDefault(require("../../app/privado/producto/ruta/ProductoRuta"));
//middlewares
const Seguridad_1 = __importDefault(require("../../middleware/Seguridad"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        dotenv_1.default.config({ path: ".env" });
        (0, conexionBD_1.default)();
        this.inicializarServidor();
        this.activarRutas();
    }
    inicializarServidor() {
        this.app.set("PORT", process.env.PORT);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "100mb" }));
        this.app.use(express_1.default.urlencoded({
            extended: true,
        }));
    }
    activarRutas() {
        this.app.use("/api/public/city", CiudadRuta_1.default);
        this.app.use("/api/public/restaurant", RestauranteRuta_1.default);
        this.app.use("/api/public/access", AccesoRuta_1.default);
        this.app.use("/api/public/register", RegistroRuta_1.default);
        // privadas
        this.app.use("/api/private/product", Seguridad_1.default.verificarToken, ProductoRuta_1.default);
        this.app.use("/api/private/role", Seguridad_1.default.verificarToken, RolRuta_1.default);
        this.app.use("/api/private/menu", Seguridad_1.default.verificarToken, MenuRuta_1.default);
    }
    iniciarServidor() {
        this.app.listen(this.app.get("PORT"), () => {
            const puerto = this.app.get("PORT");
            console.log("Servidor local desplegado en el puerto " + puerto);
        });
    }
}
exports.default = Servidor;
