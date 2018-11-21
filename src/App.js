import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

// Pages
import HeaderComponent from './components/header'
import HomeComponent from './pages/home-page'
import AddTodoComponent from './pages/todo-page/add-todo';
import EditTodoComponent from './pages/todo-page/edit-todo';
import ReduxToastr from 'react-redux-toastr'

import allReducers from './reducers';
import rootSaga from './sagas/sagas';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

// create saga middleware
const sagaMiddleware = createSagaMiddleware()

// create store
const store = createStore(allReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))

// run sagamiddleware
sagaMiddleware.run(rootSaga)

// create instance of history
const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <HeaderComponent />

            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/todo/add" component={AddTodoComponent} />
              <Route exact path="/todo/edit/:todo_id" component={EditTodoComponent} />
            </Switch>

            <ReduxToastr
              timeOut={5000}
              newestOnTop={false}
              preventDuplicates
              position="top-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
              closeOnToastrClick/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
