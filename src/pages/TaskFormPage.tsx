import React, { useState, useEffect } from 'react'
import { Task } from '../../types';
import { createTask } from '../services/getTasks';
import { useParams } from 'react-router-dom';
import { getTaskByID, updateTask } from '../services/getTasks';

const INITIAL_VALUES = {
    name: '',
    description: '',
    important: false,
    status: false
}
 
const TaskForm = ()  => {

  const params = useParams();
  const [task, setTask] = useState<Task>(INITIAL_VALUES)

  const loadTask = async () => {
    if (params.id){
      console.log(params.id)
      await getTaskByID(params.id)
      .then(res => {console.log(res.data)
                    setTask(res.data)})
  }
}

  useEffect(() => {
    loadTask()
  }, [])
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({...task,
        [e.target.name] : e.target.value
      })
  }

  const handleImportant = (e:React.ChangeEvent<HTMLInputElement>) => {
    var important = false;
    e.target.value === 'important' ? important = true : important = false;
    setTask({...task, important: important})
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (params.id){
        console.log(task)
        await updateTask(params.id, {name: task.name,
                          description: task.description,
                          important: task.important,
                          status: task.status}).then(res => console.log(res.data))
        alert(`Task with ID ${params.id} Updated!`)
      }
      else{
        await createTask(task).then(res => console.log(res.data))
        alert('Tarea creada y añadida con éxito!')
        setTask(INITIAL_VALUES)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
    {
      params.id ? <h3>Update Task Form</h3> : <h3>Create Task Form</h3>
    }
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name
            <input type="text" className="form-control" name='name' onChange={handleChange} value={task.name}/>
          </label>
        </div>

        <div className="form-group">
          <label>Description
            <textarea className="form-control"  name='description' rows={5} onChange={handleChange}  value={task.description}/>
          </label>
        </div>

        <div className="form-check">
          <label>
            <input type="radio" className="form-check-input" name='important' onFocus={handleImportant} value='important'/>
            Importante</label>
        </div>

        <div className="form-check">
          <label>
            <input type="radio" className="form-check-input" name='important' onFocus={handleImportant} value='!important' defaultChecked/>
          No importante</label>
         </div>
         <button className={`btn btn-${params.id?'primary':'success'}`} type='submit'>{params.id?'Modificar' : 'Agregar'}</button>
      </form>
    </>
)
}


export default TaskForm;
