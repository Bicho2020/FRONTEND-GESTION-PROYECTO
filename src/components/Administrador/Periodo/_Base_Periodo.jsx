import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Registrar from './Periodos'
import { MyContext  } from './Context'

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      paddingLeft:15,
      paddingRight:15
    },
    paper:{
        padding:15,
    }
}));


const _Base_Periodo = () => {

    const classes = useStyles();

    return (
        <MyContext>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <Paper className={classes.paper}>
                            <Registrar/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
      </MyContext>
    );
};

export default _Base_Periodo;