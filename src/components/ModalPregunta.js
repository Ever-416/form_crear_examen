import React from 'react';
import {
  faCircleCheck,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export const ModalPregunta = ({
  setPregunta,
  show,
  handleClose,
  dataPreguntas,
}) => {
  const [form, setForm] = useState({
    tipo_pregunta: 0,
    puntaje: "",
    dificultad: "",
    descripcion: "",
  });
  const [respuestas, setRespuestas] = useState([
    // { numero: 1, descripcion: "", correcta: false },
  ]);

  useEffect(() => {
    let index = show[1];
    if (index > 0) {
      console.log(dataPreguntas)
      setForm({
        tipo_pregunta: dataPreguntas[index-1].tipo_pregunta,
        puntaje: dataPreguntas[index-1].puntaje,
        dificultad: dataPreguntas[index-1].dificultad,
        descripcion: dataPreguntas[index-1].descripcion,
      });
      setRespuestas(dataPreguntas[index-1].respuestas);
    }
  }, [show]);

  const agregarRespuesta = () => {
    setRespuestas([
      ...respuestas,
      { numero: respuestas.length + 1, descripcion: "", correcta: false },
    ]);
  };

  const eliminarRespuesta = (num) => {
    setRespuestas((prev) => prev.filter((res) => res.numero !== num));
    setRespuestas((prev) =>
      prev.filter((res) => (res.numero > num ? res.numero-- : res))
    );
  };

  const modificarRespuesta = (num, key, value) => {
    setRespuestas((prev) =>
      prev.map((res) => (res.numero === num ? { ...res, [key]: value } : res))
    );
  };

  const setFormulario = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarPregunta = () => {
    let pregunta = form;
    pregunta["respuestas"] = respuestas;
    setPregunta(pregunta);
    closeModal();
  };

  const closeModal = () => {
    setForm({
      tipo_pregunta: 0,
      puntaje: "",
      dificultad: "",
      descripcion: "",
    });
    setRespuestas([]);
    handleClose();
  };

  return (
    <Modal
      show={show[0]}
      onHide={closeModal}
      dialogClassName="modal-dialog-scrollable"
    >
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Agregar pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center flex-column ms-5 me-5">
            <label className="form-label">Tipo de pregunta</label>
            <select
              name="tipo_pregunta"
              className="form-select ms-0 me-0"
              value={form.tipo_pregunta}
              onChange={(e) => {
                setFormulario(e);
              }}
            >
              <option>Seleccione el tipo</option>
            </select>
          </div>
          <div className="d-flex flex-row justify-content-evenly ms-5 me-5">
            <div className="flex-grow-1 pe-2">
              <label className="form-label d-block text-center">Puntaje</label>
              <input
                value={form.puntaje}
                name="puntaje"
                type="number"
                className="form-control"
                placeholder="1 a 5"
                min={1}
                max={5}
                onChange={(e) => {
                  setFormulario(e);
                }}
              ></input>
            </div>
            <div className="flex-grow-1 ps-2">
              <label className="form-label d-block text-center">
                Dificultad
              </label>
              <input
                value={form.dificultad}
                name="dificultad"
                type="number"
                className="form-control"
                placeholder="1 a 5"
                min={1}
                max={5}
                onChange={(e) => {
                  setFormulario(e);
                }}
              ></input>
            </div>
          </div>
          <div className="d-flex align-items-center flex-column ms-5 me-5">
            <label className="form-label">Descripcion</label>
            <textarea
              value={form.descripcion}
              name="descripcion"
              className="form-control"
              rows={2}
              placeholder="Redacte la pregunta..."
              onChange={(e) => {
                setFormulario(e);
              }}
            ></textarea>
          </div>
          <div className="d-flex align-items-center flex-column ms-5 me-5">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Respuestas</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {respuestas.map((res) => (
                  <tr key={res.numero}>
                    <td>
                      <span>{res.numero}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="respuesta"
                        value={res.descripcion}
                        onChange={(e) => {
                          modificarRespuesta(
                            res.numero,
                            "descripcion",
                            e.target.value
                          );
                        }}
                      />
                    </td>
                    <td>
                      <button
                        class={`btn btn-lg btn-outline-success border-0 ${
                          res.correcta ? "active" : ""
                        }`}
                        data-bs-toggle="button"
                        title="Respuesta correcta"
                        onClick={(e) => {
                          modificarRespuesta(
                            res.numero,
                            "correcta",
                            !res.correcta
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-lg btn-outline-danger border-0"
                        onClick={(e) => {
                          eliminarRespuesta(res.numero);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center ms-5 me-5">
            <button
              type="button"
              className="btn btn-sm btn-dark flex-grow-1 ms-5 me-5"
              onClick={(e) => {
                agregarRespuesta();
              }}
            >
              <span className="">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className=""> Agregar respuesta</span>
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {/* <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancelar
          </button> */}
          <button
            type="button"
            class="btn btn-lg btn-primary"
            onClick={(e) => {
              guardarPregunta();
            }}
          >
            Guardar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
