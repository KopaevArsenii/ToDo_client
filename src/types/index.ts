export interface Task {
    id: number
    name: string
    description: string
    category: Category
    done: boolean
}

export interface Category {
    id: number
    name: string
    description: string
}

export interface Token {
    token: string
}
