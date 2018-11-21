
import { call, put, all, takeEvery } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'
import axios from 'axios'

import * as TodoActions from '../actions/todo-actions'

// worker saga
export function* watchFetchAllTodoAsync() {
    try {
        const res = yield call(axios.get, 'https://jsonplaceholder.typicode.com/todos')
        yield put({ type: TodoActions.FETCH_ALL_SUCCESS, payload: res.data })
    } catch(e) {
        console.log('Error fetching todos.', e)
    }

}
export function* watchAddTodoAsync(actions) {
    try {
        const res = yield call(axios.post, 'https://jsonplaceholder.typicode.com/todos', actions.payload)
        yield put({ type: TodoActions.ADD_TODO_SUCCESS, payload: res.data })
        toastr.success('Add Todo', 'Successfully added.')
    } catch(e) {
        console.log('Error adding todo.', e)
    }
}

export function* watchUpdateTodoAsync(actions) {
    try {
        const id = actions.payload.id
        const res = yield call(axios.patch, `https://jsonplaceholder.typicode.com/todos/${id}`, { title: actions.payload.title })
        yield put({ type: TodoActions.UPDATE_TODO_SUCCESS, payload: res.data })
        toastr.success('Update Todo', 'Successfully updated.')
    } catch(e) {
        console.log('Error deleting todo.', e)
    }
}

export function* watchDeleteTodoAsync(actions) {
    try {
        const id = actions.payload
        yield call(axios.delete, `https://jsonplaceholder.typicode.com/todos/${id}`)
        yield put({ type: TodoActions.DELETE_TODO_SUCCESS, payload: id })
        toastr.success('Delete Todo', 'Successfully deleted.')
    } catch(e) {
        console.log('Error deleting todo.', e)
    }
}


// watcher saga
export function* watchFetchAllTodo() {
    yield takeEvery(TodoActions.FETCH_ALL, watchFetchAllTodoAsync)
}

export function* watchAddTodo() {
    yield takeEvery(TodoActions.ADD_TODO, watchAddTodoAsync)
}

export function* watchUpdateTodo() {
    yield takeEvery(TodoActions.UPDATE_TODO, watchUpdateTodoAsync)
}

export function* watchDeleteTodo() {
    yield takeEvery(TodoActions.DELETE_TODO, watchDeleteTodoAsync)
}

// single entry point to start all of saga
export default function* rootSaga() {
    yield all([
        watchFetchAllTodo(),
        watchAddTodo(),
        watchUpdateTodo(),
        watchDeleteTodo()
    ])
}