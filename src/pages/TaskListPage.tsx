import React, {useEffect, useState } from 'react'
import { Task } from '../../types'
import TaskC from '../components/Task'
import { getTasks, deleteAllTasks } from '../services/getTasks';


const TaskList = ()  => {

  const [tasks, setTasks] = useState<Task[]>([])

  const loadTasks = async() => {
    await getTasks().then(res => setTasks(res.data))
  }

  useEffect(() => {
    loadTasks();
  }, [])

  const handleDeleteAllTask = async () => {
    await deleteAllTasks()
    loadTasks();
    alert('Tareas Eliminadas!')
  }

  return (
    <>
    <button className='btn btn-danger' onClick={handleDeleteAllTask}>Eliminar Todas</button>
      <div className="card-group">
        {tasks.length > 0 ?
          (
              tasks.map(task => (
                <TaskC key={task._id} task={task} loadTasks={loadTasks}/>
              ))
          ) : (<h5>No hay tareas disponibles</h5>)
        }
      </div>
    </>
  )
}

export default TaskList;
