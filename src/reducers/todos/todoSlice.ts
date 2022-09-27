import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { Todo } from '../../types/types';
import { getTodos, postTodo } from '../../utils/todoUtils';

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
    return getTodos()
  }
);


export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action)=>{
        const newTodo = {
            id: action.payload.id,
            title: action.payload.title,
            completed: action.payload.completed
        }
        postTodo(newTodo)
        state.todos.push(newTodo);
    },
    updateTitleTodo: (state, action ) => {
      state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)
    },
    updateCompleteTodo: (state, action) => {
      state.todos = state.todos.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
    },
    removeTodo: (state, action)=>{
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
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
