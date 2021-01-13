import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Registrar from './Registrar'
import Listar from './Listar'
import Modificar from './Modificar'
import { MyContext  } from './Context'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft:15,
      paddingRight:15
    },
    paper:{
        padding:15,
    }
  }));

  
const _Base_Usuario = () => {
    const classes = useStyles();
    
    return (
        <MyContext>
            <div className={classes.root}>

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <Registrar/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8} >
                        <Paper className={classes.paper}>

                           <Modificar/>
                            <Listar/>
                          
                        </Paper>
                    </Grid>
                
                </Grid>
            </div>
      </MyContext>

    );
};

export default _Base_Usuario;