import React from 'react'
import { Task } from '../../types'
import { useNavigate } from 'react-router-dom'

interface Props {
    task: Task
}


const TaskC = ({ task }: Props)  => {

  const navigate = useNavigate()

  const handleUpdateTask = () => {
    navigate(`/update-task/${task._id}`)
  }

  return (
    <div className='card bg-light mb-3 mw-10'>
      <h5 className="card-title">{task.name}</h5>
      <p className="card-text">{task.description}</p>
      <div>
        <button className='btn btn-primary'>Eliminar</button>
        <button className='btn btn-danger' onClick={handleUpdateTask}>Modificar</button>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  )
}

export default TaskC;