import { FETCH_ALL_SUCCESS, ADD_TODO_SUCCESS, DELETE_TODO_SUCCESS, UPDATE_TODO_SUCCESS } from '../actions/todo-actions'

const initialState = []

export function todos(state=initialState, action) {
    switch(action.type) {
        case FETCH_ALL_SUCCESS:
            return [...action.payload]

        case ADD_TODO_SUCCESS: {
            return [...state, action.payload]
        }

        case UPDATE_TODO_SUCCESS: {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            const todoList = [...state]
            todoList[index] = action.payload
            return [...todoList]
        }

        case DELETE_TODO_SUCCESS: {
            const list = state.filter(todo => todo.id !== action.payload)
            return [...list]
        }
        
        default:
            return state
    }
}