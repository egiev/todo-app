import React from 'react'
import Grid from '@material-ui/core/Grid'

import Layout from '../../components/layout'
import TodoForm from '../../containers/todo-form';

const EditTodoComponent = () => {
    return (
        <Layout title="Edit Todo">
            <Grid item xs={12}>
                <TodoForm />
            </Grid>
        </Layout>
    )
}

export default EditTodoComponent