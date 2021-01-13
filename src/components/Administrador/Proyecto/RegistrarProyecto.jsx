import React , { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Context } from './Context'
import axios from 'axios';
import swal from 'sweetalert';




var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


const RegistrarProyecto = () => {

    const { RecargarListado  , jefes , clientes , ESTADO , TextFieldStyles } = Context();

    const [datos ,setDatos] = useState({

        PRO_DESCRIPCION:'',
        COD_CLIENTE:'0',
        COD_USUARIO_JEFE: '0',
        PRO_FECHA: today,
        PRO_ESTADO: '1',
        PRO_CLIENTE_NOMBRE:'0',
        PRO_NOMBRE:'',
    })

    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    const handleInputChange = async (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value    
        });
    };

    const LimpiarDatos = () => {
        setDatos({
            ...datos,
            PRO_DESCRIPCION:'',
            COD_CLIENTE: clientes[0].CARDCODE,
            COD_USUARIO_JEFE: jefes[0].COD_USUARIO.toString(),
            PRO_FECHA: today,
            PRO_ESTADO: '1',
            PRO_CLIENTE_NOMBRE: clientes[0].CARDNAME,
            PRO_NOMBRE:'',
        });
    }

    const GuardarProyecto = async (event) => {
        
        event.preventDefault();   

        var e1 = document.getElementById("COD_CLIENTE");
        var PRO_CLIENTE_NOMBRE = e1.options[e1.selectedIndex].text;

        var e2 = document.getElementById("COD_USUARIO_JEFE");
        var COD_USUARIO_JEFE = e2.options[e2.selectedIndex].value;

        var e3 = document.getElementById("COD_CLIENTE");
        var COD_CLIENTE = e3.options[e3.selectedIndex].value;

        const data = {
            PRO_DESCRIPCION: datos.PRO_DESCRIPCION,
            COD_CLIENTE: COD_CLIENTE,
            COD_USUARIO_JEFE: COD_USUARIO_JEFE,
            PRO_FECHA: datos.PRO_FECHA,
            PRO_ESTADO: datos.PRO_ESTADO,
            PRO_CLIENTE_NOMBRE: PRO_CLIENTE_NOMBRE,
            PRO_NOMBRE: datos.PRO_NOMBRE
        }

        try {
            
            await axios.post('http://localhost:5000/api/proyecto',data);
            LimpiarDatos();
            handleClick();
            RecargarListado();

        } catch (err) {
            console.log(err);
            swal("Error", "Error al guardar proyecto", 'error', {
                button: "Aceptar!",
            });
        }
    }

    
    const classes = TextFieldStyles();

    return (

        <React.Fragment>

            <Grid item xs={12} style={{marginBottom:15}}>

                <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                    REGISTRAR
                </Typography>

                <Typography variant="button" display="block" gutterBottom>
                     Todos los campos son obligatorios <span style={{color:'red'}} >*</span>
                </Typography>

            </Grid>
           
            <Divider />

            <form action="" onSubmit={GuardarProyecto} >
                
                <Grid container spacing={2} style={{marginTop:10}}>

                    <Grid item xs={12} sm={6} >
                         <TextField required value={datos.PRO_NOMBRE} size="small"  onChange={handleInputChange}  name="PRO_NOMBRE" fullWidth label="Nombre proyecto" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                         <TextField required value={datos.PRO_DESCRIPCION} size="small"  onChange={handleInputChange}  name="PRO_DESCRIPCION" fullWidth label="Nombre descripcion" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <TextField required value={datos.COD_CLIENTE} id="COD_CLIENTE"   InputLabelProps={{ shrink: true }}   size="small"  name="COD_CLIENTE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Cliente" SelectProps={{ native: true,}} helperText="Seleccione  cliente" variant="outlined"> {clientes.map((option) => ( <option key={option.CARDCODE} value={option.CARDCODE}>{option.CARDNAME}</option>))} </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <TextField  required value={datos.COD_USUARIO_JEFE} id="COD_USUARIO_JEFE"   InputLabelProps={{ shrink: true }}   size="small"  name="COD_USUARIO_JEFE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Jefe" SelectProps={{ native: true,}} helperText="Seleccione  jefe" variant="outlined"> {jefes.map((option) => ( <option key={option.COD_USUARIO}  value={option.COD_USUARIO}>{option.USU_NOMBRE}</option>))} </TextField>
                    </Grid>
            
                    <Grid item xs={12} sm={6} >
                        <TextField required value={datos.PRO_ESTADO } size="small"  name="PRO_ESTADO" onChange={handleInputChange} InputLabelProps={{ shrink: true }}        fullWidth  className={classes.textField} select label="Estado" SelectProps={{ native: true,}} helperText="Seleccione estado" variant="outlined"> {ESTADO.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                    </Grid>

                    <Grid item xs={12} sm={12} style={{textAlign:'right'}} >
                        <Button type="submit" size="small"  variant="contained" style={{background:'#00b3e4',fontWeight:600}} color="primary">
                            Registrar
                        </Button>
                    </Grid>

                </Grid>
                
            </form>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Proyecto registrado
                </Alert>
            </Snackbar>

        </React.Fragment>
    )

}

export default RegistrarProyecto;