import { Router } from "express";
import restauranteControlador from "../controlador/RestauranteControlador";
class RestauranteRuta {

    public apiRutaRestaurante: Router;

    constructor() {
        this.apiRutaRestaurante = Router();
        this.cargarRutas();
    }

    public cargarRutas(): void {
        this.apiRutaRestaurante.get("/all", restauranteControlador.obtenerRestaurantes);
        this.apiRutaRestaurante.get("/city/:codigo", restauranteControlador.obtenerRestauranteCiudad);
    }


}

const restauranteRuta = new RestauranteRuta();
export default restauranteRuta.apiRutaRestaurante;