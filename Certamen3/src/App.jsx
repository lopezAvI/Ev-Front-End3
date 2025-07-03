import { useState, useEffect } from "react";
import EvaluacionForm from "./Components/EvaluacionForm";
import "./App.css";

function App() {
  // Estado: lista de evaluaciones
  const [evaluaciones, setEvaluaciones] = useState([]);
  // Estado para manejar si estamos editando
  const [modoEdicion, setModoEdicion] = useState(false);
  // Evaluación que se está editando
  const [evaluacionEditando, setEvaluacionEditando] = useState(null);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem("evaluaciones");
    if (datosGuardados) {
      setEvaluaciones(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  // Agregar una nueva evaluación
  const agregarEvaluacion = (nueva) => {
    setEvaluaciones([...evaluaciones, nueva]);
  };

  // Actualizar una evaluación ya existente
  const actualizarEvaluacion = (datosActualizados) => {
    const actualizadas = evaluaciones.map((ev) =>
      ev.id === datosActualizados.id ? datosActualizados : ev
    );
    setEvaluaciones(actualizadas);
    setModoEdicion(false);
    setEvaluacionEditando(null);
  };

  // Eliminar una evaluación por ID
  const eliminarEvaluacion = (id) => {
    const filtradas = evaluaciones.filter((ev) => ev.id !== id);
    setEvaluaciones(filtradas);
  };

  // Cargar datos de una evaluación para editarla
  const cargarEdicion = (evalSeleccionada) => {
    setModoEdicion(true);
    setEvaluacionEditando(evalSeleccionada);
  };

  // Devolver escala de apreciación según promedio
  const obtenerEscala = (promedio) => {
    if (promedio >= 6.5) return "Destacado";
    if (promedio >= 5.6) return "Buen trabajo";
    if (promedio >= 4.0) return "Con mejora";
    return "Deficiente";
  };

  return (
    <div>
      <h1>Evaluación de Alumnos</h1>
      <EvaluacionForm
        onAgregar={agregarEvaluacion}
        onActualizar={actualizarEvaluacion}
        modoEdicion={modoEdicion}
        evaluacionEditando={evaluacionEditando}
      />

      <h2>Evaluaciones Guardadas</h2>
      {evaluaciones.length === 0 ? (
        <p>No hay evaluaciones aún</p>
      ) : (
        evaluaciones.map((ev) => (
          <div key={ev.id} className="card">
            <p><strong>Alumno:</strong> {ev.nombre}</p>
            <p><strong>Asignatura:</strong> {ev.asignatura}</p>
            <p><strong>Promedio:</strong> {ev.promedio}</p>
            <span className={`etiqueta ${obtenerEscala(ev.promedio).toLowerCase().replace(" ", "-")}`}>
              {obtenerEscala(ev.promedio)}
            </span>
            <div className="acciones">
              <button className="editar" onClick={() => cargarEdicion(ev)}>Editar</button>
              <button className="eliminar" onClick={() => eliminarEvaluacion(ev.id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
