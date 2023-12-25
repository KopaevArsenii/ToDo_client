export interface ITask {
    id: number
    name: string
    description: string
    category: ICategory
    done: boolean
}

export interface ICategory {
    id: number
    name: string
    description: string
}

export interface IToken {
    token: string
}
