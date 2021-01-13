import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Registrar from './RegistrarProyecto'
import Listar from './TablaListarProyecto'
import Modificar from './ModificarProyecto'
import { MyContext  } from './Context'
import ModalSubProyecto from './SubProyectoModal'

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

  
const _Base_Proyecto = () => {

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
                            <Listar/>
                            <Modificar/>
                            <ModalSubProyecto/>
                        </Paper>
                    </Grid>

                </Grid>
                
            </div>
      </MyContext>
    );
};

export default _Base_Proyecto;