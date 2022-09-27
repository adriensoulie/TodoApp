import axios from "axios"
import { Todo } from "../types/types"

const baseUrl: string = "http://localhost:3001"

export const getTodosAPI = async () => {
  try {
    const response = await axios.get(
      baseUrl + "/todos"
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}

export const postTodoAPI = async (todo: Todo) => {
  try {
    const response = await axios.post(
      baseUrl + "/todos", todo
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}

export const updateTodoAPI = async (todo: Todo) => {
  try {
    const response = await axios.put(
      baseUrl + "/todos/"+ todo.id, todo
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}

export const deleteTodoAPI = async (id: string) => {
  try {
    const response = await axios.delete(
      baseUrl + "/todos/"+ id
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}
