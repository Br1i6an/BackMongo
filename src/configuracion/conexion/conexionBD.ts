import { connect } from "mongoose";

const conexionBD = () => {
  const URL = String(process.env.URL_MONGO);

  connect(URL)
    .then(() => {
      console.log("Conexion establecida con " + URL);
    })
    .catch((miErrorsito) => {
      console.log(miErrorsito);
    });
};

export default conexionBD;
