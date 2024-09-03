import Ciudad from "./Ciudad";
import Rol from "../entidad/Rol";

class Usuario {

    public nombresUsuario: string;
    public apellidosUsuario: string;
    public documentoUsuario: string;
    public tipoDocumentoUsuario: number;
    public telefonoUsuario: string;
    public direccionUsuario: string;
    public estadoUsuario: number;
    public codRol: Rol;
    public codCiudad: Ciudad;

    constructor(nom: string, ape: string, doc: string, tip: number, dir: string, tel: string, est: number, rol: Rol, ciu: Ciudad) {
        this.nombresUsuario = nom;
        this.apellidosUsuario = ape;
        this.documentoUsuario = doc;
        this.tipoDocumentoUsuario = tip;
        this.telefonoUsuario = tel;
        this.direccionUsuario = dir;
        this.estadoUsuario = est;
        this.codRol = rol;
        this.codCiudad = ciu;
    }

}

export default Usuario;