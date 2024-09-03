import Usuario from "../../../compartido/entidad/Usuario";

class Acceso {

    public correoAcceso: string;
    public claveAcceso: string;
    public codUsuario: Usuario;

    constructor(corr: string, cla: string, codU: Usuario) {
        this.correoAcceso = corr;
        this.claveAcceso = cla;
        this.codUsuario = codU;
    }

}
export default Acceso;