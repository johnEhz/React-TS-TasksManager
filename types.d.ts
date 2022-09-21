export interface Task {
    _id?: string
    name: string
    description?: string
    important: boolean
    status: boolean
    createdAt?: string
    updatedAt?: string
}

export interface TaskUpdateBody {
    name: string,
    description?: string,
    important: boolean,
    status: boolean
}