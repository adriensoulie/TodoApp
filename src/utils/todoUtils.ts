import axios from "axios"
import { Todo } from "../types/types"

const baseUrl: string = "http://localhost:3001"

export const getTodos = async () => {
  try {
    const response = await axios.get(
      baseUrl + "/todos"
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}

export const postTodo = async (todo: Todo) => {
  try {
    const response = await axios.post(
      baseUrl + "/todos", todo
    )
    return response.data
  } catch (error) {
    throw new Error('error')
  }
}
