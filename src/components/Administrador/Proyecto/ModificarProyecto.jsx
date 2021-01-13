import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide';
import { Context } from './Context'
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles  } from '@material-ui/core/styles';
import swal from 'sweetalert';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';

    
const TextFieldStyles = makeStyles (theme => ({
    textField:{
        "& .MuiOutlinedInput-root": {
            '&:hover fieldset': {
                border: "2px solid #bdbdbd",
            },
            "&.Mui-focused fieldset": {
                border: "2px solid #00b3e4",
            
            },
        },
        '& label.Mui-focused': {
            color: '#00b3e4',
        }
    }
}))
    
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModificarProyecto = () => {

    const { open , CerrarModal , DataModificar  , handleInputChange , clientes , jefes , ESTADO ,RecargarListado } = Context();


    const ProcesoModificar = async (event) => {
      
        event.preventDefault();
        swal({
            title: "Estas seguro?",
            text: "Una vez modificado , no podrá recuperar los datos anteriores de este proyecto!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                ModificarProyecto(DataModificar.COD_PROYECTO);
            } 
        });
    }

    const ModificarProyecto = async (ID) => {

        var e1 = document.getElementById(`COD_CLIENTE${ID}`);
        var PRO_CLIENTE_NOMBRE = e1.options[e1.selectedIndex].text;

        var e2 = document.getElementById(`COD_USUARIO_JEFE${ID}`);
        var COD_USUARIO_JEFE = e2.options[e2.selectedIndex].value;

        var e3 = document.getElementById(`COD_CLIENTE${ID}`);
        var COD_CLIENTE = e3.options[e3.selectedIndex].value;

        const data = {
            PRO_NOMBRE: DataModificar.PRO_NOMBRE,
            PRO_DESCRIPCION: DataModificar.PRO_DESCRIPCION,
            COD_CLIENTE: COD_CLIENTE,
            COD_USUARIO_JEFE: COD_USUARIO_JEFE,
            PRO_FECHA: DataModificar.PRO_FECHA,
            PRO_ESTADO: DataModificar.PRO_ESTADO.toString(),
            PRO_CLIENTE_NOMBRE: PRO_CLIENTE_NOMBRE
        }
        
        try {
            await axios.put(`http://localhost:5000/api/proyecto/${ID}`,data);
            RecargarListado()
            CerrarModal()
            swal("Poof! proyecto modificado!", {
                icon: "success",
            });
        } catch (error) {
            alert('Error al modificar');
        }

    }

    const classes = TextFieldStyles();

    return (

        <div>

            <Dialog  open={open} TransitionComponent={Transition}  keepMounted onClose={CerrarModal} aria-labelledby="draggable-dialog-title">

                <DialogContent>
                    
                    <Grid item xs={12} style={{marginBottom:15}}>

                        <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                            {DataModificar.PRO_DESCRIPCION}
                        </Typography>

                        <Typography variant="button" display="block" gutterBottom>
                           campos  obligatorios para la modificación de proyecto <span style={{color:'red'}} >*</span>
                        </Typography>

                    </Grid>

                    <Divider />

                    <form action="" onSubmit={ProcesoModificar}  >
                
                        <Grid container spacing={2} style={{marginTop:10}}>


                            <Grid item xs={12} sm={6} >
                                <TextField required value={DataModificar.PRO_NOMBRE} size="small"  onChange={handleInputChange}  name="PRO_NOMBRE" fullWidth label="Nombre proyecto" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required value={DataModificar.PRO_DESCRIPCION} size="small"  onChange={handleInputChange}  name="PRO_DESCRIPCION" fullWidth label="Nombre proyecto" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required value={DataModificar.COD_CLIENTE}  id={'COD_CLIENTE'+DataModificar.COD_PROYECTO}    size="small"  name="COD_CLIENTE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Cliente" SelectProps={{ native: true,}} helperText="Seleccione  cliente" variant="outlined"> {clientes.map((option) => ( <option key={option.CARDCODE} value={option.CARDCODE}>{option.CARDNAME}</option>))} </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField  required value={DataModificar.COD_USUARIO_JEFE} id={'COD_USUARIO_JEFE'+DataModificar.COD_PROYECTO}     size="small"  name="COD_USUARIO_JEFE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Jefe" SelectProps={{ native: true,}} helperText="Seleccione  jefe" variant="outlined"> {jefes.map((option) => ( <option key={option.COD_USUARIO}  value={option.COD_USUARIO}>{option.USU_NOMBRE}</option>))} </TextField>
                            </Grid>
                    
                            <Grid item xs={12} sm={6} >
                                <TextField required value={DataModificar.PRO_ESTADO } size="small"  name="PRO_ESTADO" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Estado" SelectProps={{ native: true,}} helperText="Seleccione estado" variant="outlined"> {ESTADO.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} style={{marginTop:20}} >

                            <DialogActions >

                                <Button  size="medium" onClick={CerrarModal}  style={{background:'#f44336'}}  variant="contained"  color="secondary">
                                    cancelar
                                </Button>
                        
                                <Button type="submit"  size="medium" style={{background:'#2196f3'}}  variant="contained"  color="primary">
                                    Modificar pROYECTO
                                </Button>

                            </DialogActions>

                        </Grid>
                        
                    </form>

                </DialogContent>

            </Dialog>
            
        </div>

    );
};

export default ModificarProyecto;