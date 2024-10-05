import React, { useState } from 'react';

function MyComponent() {
  const [tasks, setTasks] = useState([]);

  const handleEditClick = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === id) {
        return { ...task, isEditing: true };
      }
      return task;
    }));
  };

  const handleSubmit = (values, id) => {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === id) {
        return { ...task, isEditing: false, description: values.description };
      }
      return task;
    }));
  };

  const handleCancelClick = () => {
    setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, isEditing: false })));
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>
      <ul className="list-group list-group-flush">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <p>{task.description}</p>
              {!task.isEditing && (
                <button onClick={() => handleEditClick(task.id)}>Editar</button>
              )}
              {task.isEditing && (
                <form onSubmit={(e) => handleSubmit(e.target.value, task.id)}>
                  <label htmlFor="new-description">Nueva descripción:</label>
                  <input type="text" id="new-description" value={task.description} />
                  <button type="submit">Guardar cambios</button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}