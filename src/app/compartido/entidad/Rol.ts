class Rol {

    public codRol: string;
    public nombreRol: string;
    public estadoRol: number;
    public cantidadUsuarios?: number;

    constructor(cod: string, nom: string, est: number) {
        this.codRol = cod;
        this.nombreRol = nom;
        this.estadoRol = est;
    }

}

export default Rol;