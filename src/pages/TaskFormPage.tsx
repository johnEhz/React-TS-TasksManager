import React, { useState, useEffect } from "react";
import { Task } from "../../types";
import { createTask } from "../services/getTasks";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskByID, updateTask } from "../services/getTasks";
import "../styles/formStyle.css";
import toast, { Toaster } from "react-hot-toast";

const INITIAL_VALUES = {
  name: "",
  description: "",
  important: false,
  status: false,
};

const TaskForm = () => {
  const params = useParams();
  const [task, setTask] = useState<Task>(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (params.id) {
        setLoading(true);
        const taskLoad = toast.loading('Requesting task info')
        await getTaskByID(params.id)
          .then((res) => {
            setTask(res.data);
          })
          .catch((err) => console.error(err));
        setLoading(false);
        toast.dismiss(taskLoad)
      } else setTask(INITIAL_VALUES);
    })();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleImportant = (e: React.ChangeEvent<HTMLInputElement>) => {
    var important = false;
    e.target.value === "important" ? (important = true) : (important = false);
    setTask({ ...task, important: important });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateTask(params.id, {
          name: task.name,
          description: task.description,
          important: task.important,
          status: task.status,
        });
      } else {
        await createTask(task);
      }
      navigate("/tasks");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="form-section">
      <Toaster />
      <div className="form-head">
        {params.id ? (
          <>
            <h3>Update Task Form</h3>
            <small>
              {loading
                ? "Requesting data..."
                : `${task._id}`
                ? params.id
                : `Not found task id: {${params.id}}`}
            </small>
          </>
        ) : (
          <h3>Create Task Form</h3>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Task Name"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={loading ? "Loading..." : task.name}
        />

        <textarea
          placeholder="Task Description"
          name="description"
          rows={6}
          onChange={handleChange}
          value={loading ? "Loading..." : task.description}
        />

        <div className="radio-controls">
          <div>
            <input
              id="important"
              type="radio"
              className="form-check-input"
              name="important"
              onChange={handleImportant}
              value="important"
              defaultChecked={task._id ? task.important : false}
            />
            <label htmlFor="important">Importante</label>
          </div>

          <div>
            <input
              id="notImportant"
              type="radio"
              className="form-check-input"
              name="important"
              onChange={handleImportant}
              value="!important"
              defaultChecked={task._id ? !task.important : true}
            />
            <label htmlFor="notImportant">No importante</label>
          </div>
        </div>

        <div>
          <button
            className={`btn btn-${params.id ? "primary" : "success"}`}
            type="submit"
          >
            {params.id ? "Modificar" : "Agregar"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
