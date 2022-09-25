import axios from 'axios'
import { Task, TaskUpdateBody } from '../../types'

export const getTasks = async () => {
    return await axios.get("http://localhost:4000/tasks")
}

export const getTaskByID = async (ID: string) => {
    return await axios.get(`http://localhost:4000/tasks/${ID}`)
}

export const createTask = async (task: Task) => {
    return await axios.post("http://localhost:4000/tasks", task)
}

export const updateTask = async (ID:string, task: TaskUpdateBody) => {
    return await axios.put(`http://localhost:4000/tasks/${ID}`, task)
}

export const deleteTask = async (ID:string) => {
    return await axios.delete(`http://localhost:4000/tasks/${ID}`)
}

export const deleteAllTasks = async () => {
    return await axios.delete(`http://localhost:4000/tasks`)
}