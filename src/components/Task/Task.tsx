import React from "react";
import { Task } from "../../../types";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask } from "../../services/getTasks";
import "./Task.css";

interface Props {
  task: Task;
  loadTasks: () => Promise<void>;
}

const TaskC = ({ task, loadTasks }: Props) => {
  const navigate = useNavigate();

  const handleUpdateTask = (task: Task) => {
    navigate(`/update-task/${task._id}`);
  };

  const handleDeleteTask = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, task: Task) => {
    e.stopPropagation();
    task._id &&
      (await deleteTask(task._id).then((res) => {
        loadTasks();
      }));
    navigate(`/tasks`);
  };

  const handleFinishTask = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, task: Task) => {
    e.stopPropagation();
    task._id &&
      (await updateTask(task._id, { ...task, status: true }).then((res) => {
      }));
    loadTasks();
  };

  return (
    <div className="task-card">
      <div className="card-head">
        <h5>TaskID {task._id}</h5>
      </div>

      <div onClick={() => handleUpdateTask(task)} className="card-body">
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <div className="card-status">
          <span>Importante: {task.important ? "SI" : "NO"}</span>
          <span>Status: {task.status ? "Finalizada" : "Pendiente"}</span>
        </div>
        <div className="card-actions">
          <button className="btn" onClick={(e) => handleDeleteTask(e, task)}>
            Eliminar
          </button>
          {!task.status && (
            <button className="btn" onClick={(e) => handleFinishTask(e, task)}>
              Terminar
            </button>
          )}
        </div>
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
