import { model, Schema, Types } from "mongoose";
import Usuario from "../entidad/Usuario";

const UsuarioEsquema = new Schema<Usuario>(
    {
        nombresUsuario: { type: String, required: true },
        apellidosUsuario: { type: String, required: true },
        documentoUsuario: { type: String, required: true, unique: true },
        tipoDocumentoUsuario: { type: Number, required: true },
        telefonoUsuario: { type: String, required: true },
        direccionUsuario: { type: String, required: true },
        estadoUsuario: { type: Number, required: true, default: 2 },
        codCiudad: { type: Types.ObjectId, ref: "Ciudad", required: true },
        codRol: { type: Types.ObjectId, ref: "Rol", required: true },

    },
    {
        versionKey: false
    }

);

export default model("Usuario", UsuarioEsquema, "Usuario");