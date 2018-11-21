import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = {
    layout: {
        marginTop: 15,
        padding: 30
    }
}

const Layout = (props) => {
    const { classes } = props
    return(
        <Grid container className={classes.layout}>
            <Typography variant={'h4'} gutterBottom>{ props.title }</Typography>
            { props.children }
        </Grid>
    )
}

export default withStyles(styles)(Layout)