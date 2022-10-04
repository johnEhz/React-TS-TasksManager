import React, { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskC from "../components/Task/Task";
import { getTasks, deleteAllTasks } from "../services/getTasks";
import "../styles/taskList.css";
import toast, { Toaster } from "react-hot-toast";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const toastLoad = toast.loading("Requesting Tasks..");
    await getTasks().then((res) => setTasks(res.data));
    toast.dismiss(toastLoad);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDeleteAllTask = async () => {
    await deleteAllTasks();
    loadTasks();
  };

  return (
    <section className="taskList-section">
      <Toaster />
      <div className="taskList-head">
        <button className="btn" onClick={handleDeleteAllTask}>
          Eliminar Todas
        </button>
        <h2>Tasks: {tasks.length}</h2>
      </div>
      <div className="card-group">
        {tasks.length > 0 ?
        tasks.map((task) => (
          <TaskC key={task._id} task={task} loadTasks={loadTasks} />
        )) : (<h1>No hay tareas registradas</h1>)}
      </div>
    </section>
  );
};

export default TaskList;
