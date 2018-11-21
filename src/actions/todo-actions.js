export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS'

export const FETCH = 'FETCH'

export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

export const UPDATE_TODO = 'UPDATE_TODO'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'

export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

export const fetchAll = () => {
    return {
        type: FETCH_ALL
    }
}

export const fetchAllSuccess = (todos) => {
    return {
        type: FETCH_ALL_SUCCESS,
        payload: todos
    }

}

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const updateTodo = (todo) => {
    return {
        type: UPDATE_TODO,
        payload: todo
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}