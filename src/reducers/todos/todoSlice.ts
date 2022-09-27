import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { Todo } from '../../types/types';
import { deleteTodoAPI, getTodosAPI, postTodoAPI, updateTodoAPI } from '../../utils/todoUtils';

export interface TodosState {
    todos: Todo[];
    status: 'loading' | 'succeeded' | 'failed' | null
  }

const initialState: TodosState = {
  todos: [],
  status: null,
};


export const fetchAllTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    return getTodosAPI()
  }
);


export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action)=>{
      let newTodo = {
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed
        }
        postTodoAPI(newTodo)
        state.todos.push(newTodo);
    },
    updateTitleTodo: (state, action ) => {
      let newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: action.payload.completed
      }
      state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
      updateTodoAPI(newTodo)
    },
    updateCompleteTodo: (state, action) => {
      let newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: action.payload.completed
      }
      state.todos = state.todos.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
      updateTodoAPI(newTodo)
    },
    removeTodo: (state, action)=>{
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      deleteTodoAPI(action.payload)
    },
  },
  extraReducers(builder) {
    builder
        .addCase(fetchAllTodos.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = state.todos.concat(action.payload)
        })
        .addCase(fetchAllTodos.rejected, (state) => {
            state.status = 'failed'
        })
  }
});

export const { addTodo, removeTodo, updateCompleteTodo, updateTitleTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;


export default todoSlice.reducer;
