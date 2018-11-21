import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

// reducers
import { todos } from './todo-reducer';

const allReducers = combineReducers({
    todos,
    toastr: toastrReducer
})

export default allReducers