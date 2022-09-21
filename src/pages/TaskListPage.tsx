import React, {useEffect, useState } from 'react'
import { Task } from '../../types'
import TaskC from '../components/Task'
import { getTasks } from '../services/getTasks';


const TaskList = ()  => {

  const [tasks, setTasks] = useState<Task[]>([])

  const loadTasks = async() => {
    await getTasks().then(res => setTasks(res.data))
  }

  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <div className="card-group">
      {
        tasks.map(task => (
          <TaskC key={task._id} task={task}/>
        ))
      }
    </div>
  )
}

export default TaskList;
