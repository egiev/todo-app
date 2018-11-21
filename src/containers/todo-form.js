import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Formik } from 'formik'
import uuid4 from 'uuid/v4'

import * as TodoApi from '../actions/todo-actions'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
})

class TodoForm extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: props.todo ? props.todo.id : null,
            title: props.todo ? props.todo.title : '',

            label: ''
        }
    }

    componentDidMount() {
        const { match } = this.props
        const id = match.params.todo_id

        if(id) {
            // check if todo reducer is empty
            if(!this.props.todo) {
                this.props.fetchAll()
            }

            this.setState({ label: 'Update' })
        } else {
            this.setState({ label: 'Save' })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.todo.id,
            title: nextProps.todo.title
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        const { classes } = this.props

        return (
            <Formik
                enableReinitialize
                initialValues={{ title: this.state.title }}
                validate={values => {
                    let errors = {}
                    if (!values.title) {
                        errors.title = 'This field is required.'
                    }
                    return errors
                }}
                onSubmit={(values, actions) => {
                    if(this.state.id) {
                        this.props.updateTodo({ id: this.state.id, title: values.title })
                    } else {
                        this.props.addTodo({ id: uuid4(), title: values.title })
                    }
                    this.props.history.push('/')
                }}
                render={props => (
                    <form onSubmit={props.handleSubmit}>
                        <TextField
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.title}
                            name="title"
                            label="Title"
                            fullWidth
                        />
                        {props.errors.title && <div id="feedback">{props.errors.title}</div>}
                        <Grid container justify="flex-end">
                            <Button type="submit" variant="contained" color="primary" className={classes.button} size="small">
                                { this.state.label }
                            </Button>
                            <Button variant="contained" color="default" 
                                className={classes.button}
                                onClick={() => this.props.history.goBack()}
                                size="small">
                                Back
                        </Button>
                        </Grid>
                    </form>
                )}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    const id = parseInt(props.match.params.todo_id)
    
    if(id) {
        return {
            todo: state.todos.find(todo => todo.id === id)
        }
    }


    return { todo: null }
}

const mapDisptachToProps = dispatch => {
    return bindActionCreators({
        fetchAll: TodoApi.fetchAll,
        addTodo: TodoApi.addTodo,
        updateTodo: TodoApi.updateTodo
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDisptachToProps)(withStyles(styles)(TodoForm)))