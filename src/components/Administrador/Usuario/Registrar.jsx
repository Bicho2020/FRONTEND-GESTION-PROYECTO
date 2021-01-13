import React , { useEffect, useState  } from 'react'
import { makeStyles  } from '@material-ui/core/styles';
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
import DateFnsUtils from "@date-io/date-fns"; 
import ruLocale from "date-fns/locale/es";
import {
MuiPickersUtilsProvider,
KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const ROLES = [
    { value: '1',label: 'Administrador'},
    { value: '2', label: 'Usuario'},
    { value: '3', label: 'Consultor'},
    { value: '4', label: 'Recursos Humanos'},
    { value: '5', label: 'Ventas'},
];

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

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
const Registrar = () => {

    const { RecargarListado , Usuarios , TimeToFloat,DateToFechaSQL , NumberFormatCustom } = Context();
  

    const [datos ,setDatos] = useState({

        usu_nombre:'',
        usu_apellido:'',
        usu_correo:'',
        usu_contrasenia: '',
        usu_estado: '1' ,
        cod_rol: '0' ,
        USU_FECHA_NAC : '01/01/2021',
        USU_HORA_CONTRATADA : '08:00' ,
        USU_VALOR_HORA : '1000' , 
        USU_COD_JEFE : '0'

    })
    
    const [open, setOpen] = useState(false);
  
    const AbrirMensajeRegistro = () => setOpen(true);
  
    const CerrarMensaje = () =>  setOpen(false);

    useEffect(()=>{
      
    },[Usuarios])



    const handleInputChange = async (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value    
        });

    };

    const LimpiarDatos = () => {
        setDatos({
            ...datos,
            usu_nombre:'',
            usu_apellido:'',
            usu_correo:'',
            usu_contrasenia: '',
            usu_estado: '1' ,
            cod_rol: '1' ,
            USU_FECHA_NAC : '01/01/2021'
        });
    }

    
    const GuardarUsuario = async (event) => {
        event.preventDefault();   

        if(datos.USU_COD_JEFE === '0'){
            swal("Error", "Porfavor seleccione un jefe", 'warning', {
                button: "Aceptar!",
            });
        }else {
            
            if(datos.USU_FECHA_NAC === '01/01/2021'){
                swal("Error", "Porfavor ingrese un fecha correcta", 'warning', {
                    button: "Aceptar!",
                });
            } else {

                if(datos.cod_rol === '0'){
                    swal("Error", "Porfavor ingrese un rol", 'warning', {
                        button: "Aceptar!",
                    });
                } else {
                    var HORA_CONTRATADA = TimeToFloat(datos.USU_HORA_CONTRATADA);
                    var FEHA_NAC = DateToFechaSQL(datos.USU_FECHA_NAC);
    
                    const data = {
                        USU_NOMBRE: datos.usu_nombre,
                        USU_APELLIDO: datos.usu_apellido,
                        USU_CORREO: datos.usu_correo,
                        USU_CONTRASENIA: datos.usu_contrasenia,
                        USU_ESTADO: '1' ,
                        COD_ROL: datos.cod_rol ,
                        USU_FECHA_NAC : FEHA_NAC,
                        USU_HORA_CONTRATADA : HORA_CONTRATADA ,
                        USU_VALOR_HORA : datos.USU_VALOR_HORA , 
                        USU_COD_JEFE : datos.USU_COD_JEFE
                    }
    
                    console.log(JSON.stringify(data))
    
                    try {
                        await axios.post('http://localhost:5000/api/usuario',data);
                        LimpiarDatos();
                        RecargarListado();
                        AbrirMensajeRegistro();
                    } catch (err) {
                        swal("Error", "Error al guardar usuario", 'error', {
                            button: "Aceptar!",
                        });
                    }
                }
                
            }

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


            <form action="" onSubmit={GuardarUsuario} >
                
                <Grid container spacing={3} style={{marginTop:10}}>

                    <Grid item xs={6}>
                         <TextField required value={datos.usu_nombre} size="small"  onChange={handleInputChange}  name="usu_nombre" fullWidth label="Nombre" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={6}>
                         <TextField required value={datos.usu_apellido} size="small"    onChange={handleInputChange}   name="usu_apellido"  fullWidth label="Apellido" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={6}>
                         <TextField type="email" required value={datos.usu_correo}  size="small"  onChange={handleInputChange}   name="usu_correo" fullWidth label="Correo" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={6}>
                         <TextField type="password" required value={datos.usu_contrasenia} size="small"   onChange={handleInputChange}  name="usu_contrasenia"  fullWidth label="Contraseña" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils} locale={ruLocale}  >
                            <KeyboardDatePicker

                            id="date-picker-dialog"
                            label="Fecha de nacimiento"
                            format="dd/MM/yyyy"
                            fullWidth
                            required
                            size="small"
                            className={classes.textField}
                            inputVariant="outlined"
                            value={datos.USU_FECHA_NAC}
                            onChange={(value) => {setDatos({...datos,USU_FECHA_NAC : value})}}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            id="time"
                            variant="outlined"
                            label="Horas contratadas"
                            type="time"
                            name="USU_HORA_CONTRATADA"
                            onChange={handleInputChange}
                            value={datos.USU_HORA_CONTRATADA}
                            className={classes.textField}
                        />
                    </Grid>


                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        label="Valor hora $"
                        variant="outlined"
                        name="USU_VALOR_HORA"
                        onChange={handleInputChange}
                        value={datos.USU_VALOR_HORA}
                        className={classes.textField}
                        InputProps={{
                        inputComponent: NumberFormatCustom,
                        }}
                    />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField type="number" required value={datos.USU_COD_JEFE} size="small"  name="USU_COD_JEFE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Jefe directo" SelectProps={{ native: true,}}  variant="outlined"> <option hidden  value="0" >Seleccione usuario</option> {Usuarios.map((option) => ( <option key={option.COD_USUARIO} value={option.COD_USUARIO}>{option.USU_NOMBRE}</option>))} </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField type="number" min="0" required value={datos.cod_rol} size="small"  name="cod_rol" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Rol" SelectProps={{ native: true,}} variant="outlined"> <option hidden  value="0">Seleccione rol</option>   {ROLES.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                    </Grid>

                    <Grid item xs={12} style={{textAlign:'right'}} >
                        <Button type="submit" size="medium"  variant="contained" style={{background:'#00b3e4',fontWeight:600}} color="primary">
                            Registrar
                        </Button>
                    </Grid>

                </Grid>

            
            </form>

            <Snackbar open={open} autoHideDuration={4000} onClose={CerrarMensaje}>
                <Alert onClose={CerrarMensaje} severity="success">
                    Usuario registrado
                </Alert>
            </Snackbar>

        </React.Fragment>
    )

}

export default Registrar;