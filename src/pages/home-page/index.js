import React from 'react'
import { Link } from 'react-router-dom'
import TodoList from '../../containers/todo-list';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Layout from '../../components/layout'

const HomeComponent = (props) => {
    return (
        <Layout title="List of todo">
            <Grid item xs={12}>
                <Button variant="contained" color="primary"component={Link} to={`/todo/add`} size="small">
                    Add New Todo
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TodoList />
            </Grid>
        </Layout>
    )
}

export default HomeComponent