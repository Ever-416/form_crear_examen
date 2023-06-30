import React from 'react';
import { useState } from "react";
import "./ExamenVistaGeneral.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ModalPregunta } from "./ModalPregunta";

// ID_TIPO_PREGUNTA
// PUNTAJE
// DIFICULTAD
// DESCRIPCION
// Respuestas

export const Examen = ({ idExamen, nav }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState([0, 0]);

  const cerrarModal = () => setModal([0, 0]);

  const agregarPregunta = (pregunta) => {
    if (modal[1] === 0) {
      pregunta["numero"] = data.length + 1;
      setData([...data, pregunta]);
    } else {
      let num = modal[1];
      setData((prev) =>
        prev.map((preg) =>
          preg.numero === num ? { ...preg, ...pregunta } : preg
        )
      );
    }
  };

  const eliminarPregunta = (num) => {
    setData((prev) => prev.filter((res) => res.numero !== num));
    setData((prev) =>
      prev.filter((res) => (res.numero > num ? res.numero-- : res))
    );
  };

  return (
    <div class="container">
      <h2 className="d-block text-center">Preguntas</h2>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-success btn-md"
          onClick={(e) => {
            setModal([1, 0]);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> <span> Agregar</span>
        </button>
      </div>
      <table className="table" id="table-vista-general">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Pregunta</th>
            <th scope="col">Respuestas</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dato) => (
            <tr key={dato.numero}>
              <th scope="row">{dato.numero}</th>
              <td>{dato.descripcion}</td>
              <td>
                {dato.respuestas.map((respuesta) => (
                  <p key={respuesta.numero}>{respuesta.descripcion}</p>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    setModal([1, dato.numero]);
                  }}
                >
                  Editar
                </button>
                {"  "}
                <button
                  class="btn btn-danger"
                  onClick={(e) => {
                    eliminarPregunta(dato.numero);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalPregunta
        setPregunta={agregarPregunta}
        show={modal}
        handleClose={cerrarModal}
        dataPreguntas={data}
      ></ModalPregunta>

      <div className="row">
        <div className="col-md-3 mt-3">
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {
              nav(0);
            }}
          >
            Anterior
          </button>
        </div>
      </div>
    </div>
  );
};
