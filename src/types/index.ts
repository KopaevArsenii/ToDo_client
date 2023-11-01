export interface ITask {
    id: string
    name: string
    description: string
    category: string
    done: boolean
}

export interface ICategory {
    id: string
    name: string
    description: string
}
