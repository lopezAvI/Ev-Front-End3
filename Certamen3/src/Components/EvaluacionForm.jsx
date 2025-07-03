import { useEffect, useState } from "react";

function EvaluacionForm({ onAgregar, onActualizar, modoEdicion, evaluacionEditando }) {
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");

  // Si estamos editando, precargar los datos
  useEffect(() => {
    if (modoEdicion && evaluacionEditando) {
      setNombre(evaluacionEditando.nombre);
      setAsignatura(evaluacionEditando.asignatura);
      setPromedio(evaluacionEditando.promedio);
    }
  }, [modoEdicion, evaluacionEditando]);

  // Validar y procesar el formulario
  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !asignatura.trim() || promedio === "") {
      alert("Por favor completa todos los campos");
      return;
    }

    const num = parseFloat(promedio);
    if (num < 1 || num > 7) {
      alert("El promedio debe estar entre 1.0 y 7.0");
      return;
    }

    const datos = {
      id: modoEdicion ? evaluacionEditando.id : Date.now(),
      nombre,
      asignatura,
      promedio: num,
    };

    if (modoEdicion) {
      onActualizar(datos);
    } else {
      onAgregar(datos);
    }

    // Limpiar formulario
    setNombre("");
    setAsignatura("");
    setPromedio("");
  };

  return (
    <div className="form-container">
      <h2>{modoEdicion ? "Editar Evaluación" : "Agregar Nueva Evaluación"}</h2>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Ej: Ignacio López"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ej: Front End"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
        />
        <input
          type="number"
          step="0.1"
          min="1"
          max="7"
          placeholder="Ej: 6.4"
          value={promedio}
          onChange={(e) => setPromedio(e.target.value)}
        />
        <button type="submit">
          {modoEdicion ? "Actualizar Evaluación" : "Agregar Evaluación"}
        </button>
      </form>
    </div>
  );
}

export default EvaluacionForm;
