import React, { useState, useEffect } from "react";
import AuthService from "../Utils/AuthService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategory] = useState("Personal");
  const [editingTaskId, setEditingTaskId] = useState(null); // Para identificar la tarea en edición
  const [newDescripcion, setNewDescripcion] = useState(""); // Nueva descripción de la tarea en edición

  // Obtener las tareas
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await AuthService.requestWithAuth("get", "/tareas");
        console.log("Tareas recibidas:", response.data); // Depuración: Verificar que las tareas tienen un _id
        setTasks(response.data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    getTasks();
  }, []);

  // Agregar tarea
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.requestWithAuth("post", "/tareas", {
        descripcion,
        categoria,
      });
      setTasks([...tasks, response.data]);
      setDescripcion("");
    } catch (error) {
      console.error("Error al agregar tarea:", error.response.data);
    }
  };

  // Habilitar modo edición para una tarea específica
  const handleEditClick = (task) => {
    console.log("Tarea a editar:", task); // Depuración para verificar que la tarea contiene el _id
    if (!task._id) {
      console.error("La tarea seleccionada no tiene un _id definido");
      return;
    }
    setEditingTaskId(task._id); // Usa _id en lugar de id
    setNewDescripcion(task.descripcion); // Prellena con la descripción actual
  };

  // Guardar los cambios de edición
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    console.log("Guardando cambios para la tarea con ID:", editingTaskId); // Verificar el _id de la tarea que se está guardando
    if (!editingTaskId) {
      console.error("ID de tarea no está definido");
      return;
    }
    try {
      await AuthService.requestWithAuth("put", `/tareas/${editingTaskId}`, {
        descripcion: newDescripcion,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTaskId ? { ...task, descripcion: newDescripcion } : task
        )
      );
      setEditingTaskId(null); // Salir del modo de edición después de guardar
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingTaskId(null); // Salir del modo de edición sin guardar
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>

      {/* Formulario para agregar tareas */}
      <form onSubmit={handleAddTask}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción de la tarea
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Tarea
        </button>
      </form>

      {/* Lista de tareas */}
      <div className="mt-4">
        <h2>Mis tareas</h2>
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id} // Corregimos el key usando _id
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Muestra la descripción y el botón de editar */}
              {editingTaskId === task._id ? (
                <form onSubmit={handleSaveEdit}>
                  <input
                    type="text"
                    className="form-control"
                    value={newDescripcion}
                    onChange={(e) => setNewDescripcion(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <span>{task.descripcion}</span>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(task)}
                  >
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
