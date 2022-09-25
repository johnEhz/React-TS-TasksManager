import React from "react";
import { Task } from "../../types";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask } from "../services/getTasks";

interface Props {
  task: Task;
  loadTasks: () => Promise<void>;
}

const TaskC = ({ task, loadTasks }: Props) => {
  const navigate = useNavigate();

  const handleUpdateTask = (task: Task) => {
    navigate(`/update-task/${task._id}`);
  };

  const handleDeleteTask = async (task: Task) => {
    task._id &&
      (await deleteTask(task._id).then((res) => {
        alert(`Task ID ${res.data._id} deleted.`);
        loadTasks();
      }));
    navigate(`/tasks`);
  };

  const handleFinishTask = async (task: Task) => {
    task._id &&
      (await updateTask(task._id, { ...task, status: true }).then((res) => {
        alert(`Task ID ${task._id} Finalizada!`);
      }));
    loadTasks();
  };

  return (
    <div className="card bg-light mb-3 mw-10">
      <h6>{task._id?.substring(0, 10)}...</h6>
      <h5 className="card-title">{task.name}</h5>
      <p className="card-text">{task.description}</p>
      <span>Importante: {task.important ? "Importante" : "No Importante"}</span>
      <span>Status: {task.status ? "Finalizada" : "Pendiente"}</span>
      <div>
        <button className="btn btn-danger" onClick={() => handleDeleteTask(task)}>
          Eliminar
        </button>
        <button className="btn btn-primary" onClick={() => handleUpdateTask(task)}>
          Modificar
        </button>
        {!task.status && (
          <button className="btn btn-success" onClick={() => handleFinishTask(task)}>
            Terminar
          </button>
        )}
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Created at: {task.createdAt ? task.createdAt : "No avaible"}
        </small>
        <small className="text-muted">
          Updated at: {task.updatedAt ? task.updatedAt : "No avaible"}
        </small>
      </div>
    </div>
  );
};

export default TaskC;
