import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { Context } from '../Context'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const FiltrarTareas = () => {
    
    const {TextFieldStyles , handleInputChangeTarea , SubProyectos , AbrirModalRG } = Context();

    const classes = TextFieldStyles();

    return (
        <div>

            <Grid container spacing={2}>

                <Grid item xs={6} style={{marginBottom:15,textAlign:'left'}}>

                <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                    TAREAS
                </Typography>

                </Grid>

                <Grid item xs={6} style={{marginBottom:15,textAlign:'right'}}>


                <Button onClick={AbrirModalRG} size="small"  >
                    <AddCircleIcon style={{color:'#00b3e4',fontWeight:800}}  />
                </Button>


                </Grid>

            </Grid>


        
            <Divider />
            <br/>
            <Autocomplete
            id="Anio"
            size="small"
            options={SubProyectos}
            onChange={(event, value) => {if(value) return handleInputChangeTarea(value.COD_SUB_PROYECTO)}}
            className={classes.textField}
            getOptionLabel={(option) => option.SPR_DESCRIPCION}
            style={{ width: 300 }}
            renderInput={(params) => <TextField  {...params} label="Seleccione sub proyecto" variant="outlined" />}
            />
        </div>
    );
};

export default FiltrarTareas;