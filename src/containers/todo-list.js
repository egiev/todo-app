import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as TodoActions from '../actions/todo-actions'

import { withStyles } from '@material-ui/core'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: '100%'
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    modal: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        top: '20%',
    }
});

class TodoList extends Component {
    constructor(props) {
        super()
        this.state = {
            id: null,
            page: 0,
            rowsPerPage: 10,
            open: false
        }
    }

    componentDidMount() {
        if(this.props.todos.length <= 0) {
            this.props.fetchTodos()
        }
    }

    handleChangePage(event, page) {
        this.setState({ page })
    }

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value })
    }

    handleOpen(id) {
        this.setState({ id, open: true });
    }

    handleClose(){
        this.setState({ open: false });
    }

    deleteTodo() {
        const { id } = this.state
        this.props.deleteTodo(id)
        this.handleClose()
    }
    render() {
        const { classes } = this.props
        const rows = this.props.todos ? this.props.todos : []
        const { page, rowsPerPage } = this.state
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell >Title</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" 
                                                color="primary" 
                                                component={Link} 
                                                to={`/todo/edit/${row.id}`} 
                                                size="small"
                                                className={classes.button}>
                                                Update
                                            </Button>
                                            <Button variant="contained"
                                                color="secondary"
                                                onClick={this.handleOpen.bind(this, row.id)}
                                                size="small"
                                                className={classes.button}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage.bind(this)}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                    />
                </Paper>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose.bind(this)}
                className={classes.modal}
                >
                <div className={classes.paper}>
                    <Typography type="subheading" id="simple-modal-description">
                    Do you want to delete this todo ?
                    </Typography>
                    <Grid container justify="flex-end">
                        <Button variant="contained"
                            color="primary"
                            onClick={this.deleteTodo.bind(this)}
                            size="small"
                            className={classes.button}>
                            Delete
                        </Button>
                        <Button variant="contained"
                            color="default"
                            onClick={this.handleClose.bind(this)}
                            size="small"
                            className={classes.button}>
                            Back
                        </Button>
                    </Grid>
                </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchTodos: TodoActions.fetchAll,
        deleteTodo: TodoActions.deleteTodo
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TodoList))