import React, { useEffect, useState } from 'react';
// import {
//   apiURL,
//   GET_TECNOLOGIAS,
//   TIPO_EXAMEN,
// } from "../../../services/apirest";
// import { getToken } from "../../../services/AuthService";
import { InformacionExamen } from './informacionExamen';
import { Examen } from './ExamenVistaGeneral';

export const CrearExamen = () => {
  const [examen, setExamen] = useState({});

  const [navegacion, setNavegacion] = useState(0);

  const cambiarNavegacion = (index) => {
    setNavegacion(index);
  };

  const handleChange = (e) => {
    setExamen({
      ...examen,
      [e.target.name]: e.target.value,
    });
  };

  let { Nomex, Tecnologia, Descripcion, Tiempo, NumPreg, NivMax, TipEx } =
    examen;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Funcion que se ejecuta con el boton para poder mandar los datos
  const handlePostExamen = () => {
    Tiempo = parseInt(Tiempo, 20);
    NivMax = parseInt(NivMax, 10);
    NumPreg = parseInt(NumPreg, 15);

    const requestInit = {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify(examen),
    };

    // Validacion de campos vacios
    if (
      Nomex === '' ||
      Tecnologia === '' ||
      Descripcion === '' ||
      Tiempo <= 0 ||
      NumPreg <= 0 ||
      NivMax <= 0 ||
      TipEx === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    } else {
      fetch(apiURL + 'Tecnologias' + Tecnologia + 'Examenes', requestInit)
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  };

  return (
    <div className="container">
      <div className="container mt-5">
        <h3 className="text-secondary">Crear un Examen</h3>
      </div>

      <div className="container">
        <form
          className="col-md-12 border-top border-3 border-success"
          onSubmit={handleSubmit}
        >
          {navegacion === 0 && (
            <InformacionExamen
              valueChange={handleChange}
              nav={cambiarNavegacion}
            ></InformacionExamen>
          )}
          {navegacion === 1 && <Examen nav={cambiarNavegacion}></Examen>}
        </form>
      </div>
    </div>
  );
};
