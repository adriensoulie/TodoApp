export interface Todo {
    id: string;
    title: string;
    completed: boolean
}

export type ApiData = {
    message: string
    status: string
    todos: Todo[]
    todo?: Todo
}
