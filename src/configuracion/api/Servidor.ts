import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import conexionBD from "../conexion/conexionBD";

import rutaAPIProducto from "../../app/publico/producto/ruta/ProductoRuta";
import rutaAPICiudad from "../../app/publico/ciudad/ruta/CiudadRuta";
import rutaAPIRestaurante from "../../app/publico/restaurante/ruta/RestauranteRuta";
import rutaAPIAcceso from "../../app/publico/acceso/ruta/AccesoRuta";
import rutaAPIRegistro from "../../app/publico/registro/ruta/RegistroRuta";
// privadas
import rutaAPIRol from "../../app/privado/rol/ruta/RolRuta";
import rutaAPIMenu from "../../app/privado/menu/ruta/MenuRuta";
import rutaAPIPrivadoProducto from "../../app/privado/producto/ruta/ProductoRuta";
//middlewares
import seguridad from "../../middleware/Seguridad";

class Servidor {
  public app: express.Application;

  constructor() {
    this.app = express();
    dotenv.config({ path: ".env" });
    conexionBD();
    this.inicializarServidor();
    this.activarRutas();
  }

  public inicializarServidor(): void {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  public activarRutas(): void {

    this.app.use("/api/public/city", rutaAPICiudad);
    this.app.use("/api/public/restaurant", rutaAPIRestaurante);
    this.app.use("/api/public/access", rutaAPIAcceso);
    this.app.use("/api/public/register", rutaAPIRegistro);

    // privadas
    this.app.use("/api/private/product", seguridad.verificarToken, rutaAPIPrivadoProducto);
    this.app.use("/api/private/role", seguridad.verificarToken, rutaAPIRol);
    this.app.use("/api/private/menu", seguridad.verificarToken, rutaAPIMenu);

  }
  public iniciarServidor(): void {
    this.app.listen(this.app.get("PORT"), () => {
      const puerto = this.app.get("PORT");
      console.log("Servidor local desplegado en el puerto " + puerto);
    });
  }
}

export default Servidor;
