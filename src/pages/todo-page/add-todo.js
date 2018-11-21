import React from 'react'
import Grid from '@material-ui/core/Grid'

import Layout from '../../components/layout'
import TodoForm from '../../containers/todo-form';

const AddTodoComponent = () => {
    return (
        <Layout title="Add Todo">
            <Grid item xs={12}>
                <TodoForm />
            </Grid>
        </Layout>
    )
}

export default AddTodoComponent