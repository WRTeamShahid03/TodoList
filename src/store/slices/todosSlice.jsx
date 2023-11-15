import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    todos: [],
}




export const todosSlice = createSlice({
    name: 'todosSlice',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const id = state.todos.length === 0 ? 0 : state.todos[state.todos.length - 1].id + 1;
            const { name, todo } = action.payload
            const newTodo = {
                id: id,
                name: name,
                todo: todo,
            }
            state.todos.push(newTodo)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        editTodo: (state, action) => {
            const { id, name, todo } = action.payload;
            if (id !== null) {
                state.todos = state.todos.map(todoItem => {
                    if (todoItem.id === id) {
                        return {
                            ...todoItem,
                            name: name,
                            todo: todo,
                        };
                    }
                    return todoItem;
                });
            }
        }
    },
})

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions

export default todosSlice.reducer