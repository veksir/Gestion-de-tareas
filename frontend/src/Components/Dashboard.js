import React, { useState, useEffect } from "react";
import AuthService from "../Utils/AuthService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategory] = useState("Personal");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newDescripcion, setNewDescripcion] = useState("");

  // Obtener las tareas
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await AuthService.requestWithAuth("get", "/tareas");
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
    setEditingTaskId(task._id);
    setNewDescripcion(task.descripcion);
  };

  // Guardar los cambios de edición
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTaskId) return;

    try {
      await AuthService.requestWithAuth("put", `/tareas/${editingTaskId}`, {
        descripcion: newDescripcion,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTaskId ? { ...task, descripcion: newDescripcion } : task
        )
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  // Eliminar tarea
  const handleDeleteClick = async (id) => {
    try {
      await AuthService.requestWithAuth("delete", `/tareas/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Cambiar estado de completada
  const handleCheckboxChange = async (task) => {
    try {
      const updatedTask = { ...task, completada: !task.completada };
      await AuthService.requestWithAuth("put", `/tareas/${task._id}`, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? { ...t, completada: !t.completada } : t
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de completada:", error);
    }
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
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                textDecoration: task.completada ? "line-through" : "none",
              }}
            >
              <div className="d-flex align-items-center">
                {/* Checkbox para completar tareas */}
                <input
                  type="checkbox"
                  checked={task.completada}
                  onChange={() => handleCheckboxChange(task)}
                  className="me-2"
                />
                {/* Descripción de la tarea */}
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
                  <span>{task.descripcion}</span>
                )}
              </div>

              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditClick(task)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(task._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
