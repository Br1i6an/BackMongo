import Usuario from "./Usuario";

class Imagen {

    public nombrePublicoImagen: string;
    public nombrePrivadoImagen: string;
    public tamanoImagen: number;
    public codUsuario: Usuario;

    constructor(nomPu: string, nomPri: string, tam: number, codUsu: Usuario) {
        this.nombrePublicoImagen = nomPu;
        this.nombrePrivadoImagen = nomPri;
        this.tamanoImagen = tam;
        this.codUsuario = codUsu;
    }

}

export default Usuario;