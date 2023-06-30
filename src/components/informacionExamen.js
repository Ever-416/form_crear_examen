import React from 'react';
import { useState } from 'react';
// import { GET_TECNOLOGIAS, TIPO_EXAMEN, apiURL } from "../../../services/apirest";

export const InformacionExamen = ({ valueChange, nav }) => {
  // const urlTecnologias = apiURL + GET_TECNOLOGIAS;
  // const urlTipos = apiURL + TIPO_EXAMEN;
  // hook: Obtener tecnologia
  const [tecnologias, setTecnologias] = useState([]);

  const [tipos, setTipos] = useState([]);

  // Para poder obtener los datos de las tecnologias y poder usar el id de la tecnologia
  // const getTech = async () => {
  //   const response = await fetch(urlTecnologias);
  //   const responseJSON = await response.json();
  //   setTecnologias(responseJSON);
  // };

  // const getTipos = async () => {
  //   const response = await fetch(urlTipos);
  //   const responseJSON = await response.json();
  //   setTipos(responseJSON);
  // };

  // Funcion que ejecuta la funcion para traer esa info
  // useEffect(() => {
  //   getTech();
  //   getTipos();
  // }, []);

  return (
    <>
      <h2 className="d-block text-center">Informacion Examen</h2>
      <div className="row">
        <div className="col-md-12 mt-2">
          <label for="inputEmail4" className="form-label">
            Nombre del Examen
          </label>
          <input
            name="NomEx"
            onChange={valueChange}
            className="form-control"
            id="inputEmail4"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <label for="inputEmail4" className="form-label">
            Nivel Máximo
          </label>
          <input
            name="NivMax"
            onChange={valueChange}
            className="form-control"
            placeholder=""
            id="inputEmail4"
            type="number"
            min="0"
            max="5"
          />
        </div>

        <div className="col-md-6 mt-2">
          <label for="inputEmail4" className="form-label">
            Tiempo
          </label>
          <input
            name="Tiempo"
            onChange={valueChange}
            className="form-control"
            placeholder=""
            id="inputEmail4"
            type="number"
            min="1"
            max="60"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-2">
          <label for="inputState" className="form-label">
            Tecnologia
          </label>
          <select
            name="Tecnologia"
            onChange={valueChange}
            id="inputState"
            className="form-select"
          >
            <option selected>Selecciona una opción</option>
            {tecnologias.map((element) => (
              <option value={element.idTecnologia} key={element.idTecnologia}>
                {element.idTecnologia + ' ' + element.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mt-2">
          <label for="inputState" className="form-label">
            Tipo de Examen
          </label>
          <select
            name="TipEx"
            onChange={valueChange}
            id="inputState"
            className="form-select"
          >
            <option selected>Selecciona una opción</option>
            {tipos.map((element) => (
              <option value={element.idTipo} key={element.idTipo}>
                {element.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-2">
          <label for="exampleFormControlTextarea1" className="form-label">
            Descripción
          </label>
          <textarea
            name="Desc"
            onChange={valueChange}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </div>

      {/* <div className='col-md-6 mt-2'>
                    <label for="inputEmail4" className="form-label">Numero de Preguntas</label>
                    <input name='NumPreg' onChange={valueChange} className="form-control" placeholder='' id="inputEmail4" />
                </div> */}

      <div className="row">
        <div className="col-md-3 mt-3">
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {
              nav(1);
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
};
