import axios from "axios"

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