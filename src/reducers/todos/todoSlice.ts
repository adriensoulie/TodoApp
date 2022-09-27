import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { Todo } from '../../types/types';
import { getTodos } from '../../utils/getTodos';

export interface TodosState {
    todos: Todo[];
    status: 'loading' | 'succeeded' | 'failed' | null
  }

const initialState: TodosState = {
  todos: [],
  status: null,
};


export const fetchAllTodos = createAsyncThunk(
  'counter/fetchCount',
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
            id: action.payload.todo.id,
            title: action.payload.todo.title,
            completed: action.payload.todo.completed
        }
        state.todos.push(newTodo);
    },
    removeTodo: (state, action)=>{
        state.todos.filter((todo) => todo.id !== action.payload.todo.id);
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

export const { addTodo, removeTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;


export default todoSlice.reducer;
