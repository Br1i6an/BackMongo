import Ciudad from "./Ciudad";
import Producto from "./Producto";
import Restaurante from "./Restaurante";

class Menu {

    public codMenu: string;
    public nombreMenu: string;
    public codRestaurante: Restaurante;
    public productosMenu: Producto[];

    constructor(cod: string, nom: string, codC: Restaurante, prod: Producto[]) {
        this.codMenu = cod;
        this.nombreMenu = nom;
        this.codRestaurante = codC;
        this.productosMenu = prod;

    }

}

export default Menu;