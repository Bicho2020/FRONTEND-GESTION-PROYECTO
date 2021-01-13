import React  from 'react';
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
import DateFnsUtils from "@date-io/date-fns"; 
import moment from "moment"

import {
MuiPickersUtilsProvider,
KeyboardDatePicker,
} from '@material-ui/pickers';

const ROLES = [
{ value: '1',label: 'Administrador',},
{ value: '2', label: 'Usuario'}
];


const ESTADOS = [
    { value: '0',label: 'DESACTIVADO',},
    { value: '1', label: 'ACTIVADO'}
];


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




const Modificar = () => {

    const { open   , DataModificar , CerrarModal ,  TimeToFloat  ,  setDataModificar , handleInputChange  , RecargarListado , Usuarios , NumberFormatCustom  } = Context();
  


    const ProcesoModificar = async (event) => {
      
        event.preventDefault();
        swal({
            title: "Estas seguro?",
            text: "Una vez modificado , no podrá recuperar los datos anteriores de este usuario!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                ModificarUsuario(DataModificar.COD_USUARIO);
            } 
        });
    }

    const ModificarUsuario = async (ID) => {//

        var HC = document.getElementById("HORA_CONTRATADA"+ID).value;
        var HORA_CONTRATADA = TimeToFloat(HC);

        const data = {
            USU_NOMBRE: DataModificar.USU_NOMBRE,
            USU_APELLIDO: DataModificar.USU_APELLIDO,
            USU_CORREO: DataModificar.USU_CORREO,
            USU_CONTRASENIA: DataModificar.USU_CONTRASENIA,
            USU_ESTADO: DataModificar.USU_ESTADO.toString(),
            COD_ROL: DataModificar.COD_ROL.toString(),
            USU_FECHA_NAC : DataModificar.USU_FECHA_NAC,
            USU_HORA_CONTRATADA : HORA_CONTRATADA ,
            USU_VALOR_HORA : DataModificar.USU_VALOR_HORA.toString() , 
            USU_COD_JEFE : DataModificar.USU_COD_JEFE.toString()
        }

        try {
            await axios.put(`http://localhost:5000/api/usuario/${ID}`,data);
            RecargarListado()
            CerrarModal()
            swal("Poof! Usuario modificado!", {
                icon: "success",
            });
        } catch (error) {
            swal("Poof! Error al actualizar usuario!", {
                icon: "error",
            });
        }

    }

    const classes = TextFieldStyles();

    return (

        <div>

           <Dialog  open={open} TransitionComponent={Transition} maxWidth="md"  keepMounted aria-labelledby="draggable-dialog-title">

                <DialogContent>
                    

                    <Grid item xs={12} style={{marginBottom:15}}>

                    <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                    {DataModificar.USU_NOMBRE} {DataModificar.USU_APELLIDO}
                    </Typography>

                    <Typography variant="button" display="block" gutterBottom>
                    campos  obligatorios para la modificación de usuario <span style={{color:'red'}} >*</span>
                    </Typography>

                 </Grid>

                    <Divider />

                    <form action="" onSubmit={ProcesoModificar}  >

                        <Grid container spacing={2} style={{marginTop:10}}>

                            <Grid item xs={6}>
                                <TextField onChange={handleInputChange} required value={DataModificar.USU_NOMBRE} size="small"   name="USU_NOMBRE" fullWidth label="Nombre" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField onChange={handleInputChange}  required value={DataModificar.USU_APELLIDO} size="small"     name="USU_APELLIDO"  fullWidth label="Apellido" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField onChange={handleInputChange}  type="email" required value={DataModificar.USU_CORREO}  size="small"    name="USU_CORREO" fullWidth label="Correo" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField onChange={handleInputChange}  type="password" required value={DataModificar.USU_CONTRASENIA} size="small"    name="USU_CONTRASENIA"  fullWidth label="Contraseña" variant="outlined" className={classes.textField} />
                            </Grid>

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                id={'USU_FECHA_NAC'+DataModificar.COD_USUARIO}
                                label="Fecha de nacimiento"
                                format="dd/MM/yyyy"
                                fullWidth
                                required
                                size="small"
                                className={classes.textField}
                                inputVariant="outlined"
                                value={DataModificar.USU_FECHA_NAC}
                                onChange={(value) => {setDataModificar({...DataModificar,USU_FECHA_NAC : value})}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <TextField
                                id={'HORA_CONTRATADA'+DataModificar.COD_USUARIO}
                                required
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Horas contratadas"
                                type="time"
                                name="USU_HORA_CONTRATADA"
                                onChange={handleInputChange}
                                value={moment(DataModificar.USU_HORA_CONTRATADA,'HH:mm').format('HH:mm')}
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
                            value={DataModificar.USU_VALOR_HORA}
                            className={classes.textField}
                            InputProps={{
                            inputComponent: NumberFormatCustom,
                            }}
                        />
                        </Grid>


                        <Grid item xs={6}>
                            <TextField type="number" required value={DataModificar.USU_COD_JEFE} size="small"  name="USU_COD_JEFE" onChange={handleInputChange}      fullWidth  className={classes.textField} select label="Jefe directo" SelectProps={{ native: true,}}  variant="outlined"> <option defaultValue value="0" hidden  >Seleccione usuario</option> {Usuarios.map((option) => ( <option key={option.COD_USUARIO} value={option.COD_USUARIO}>{option.USU_NOMBRE}</option>))} </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField onChange={handleInputChange}  type="number" required value={DataModificar.COD_ROL} size="small"  name="COD_ROL"    fullWidth  className={classes.textField} select label="Rol" SelectProps={{ native: true,}} helperText="Seleccione un rol" variant="outlined"> <option defaultValue="0" hidden   > Seleccione rol  </option> {ROLES.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField onChange={handleInputChange}  type="number" required value={DataModificar.USU_ESTADO} size="small"  name="USU_ESTADO"    fullWidth  className={classes.textField} select label="Rol" SelectProps={{ native: true,}} helperText="Seleccione un rol" variant="outlined"> <option defaultValue="0"  hidden  > Seleccione rol  </option> {ESTADOS.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                        </Grid>


                            <Grid item xs={12} style={{marginTop:10}} >

                                <DialogActions >

                                <Button  size="medium" onClick={CerrarModal}  style={{background:'#f44336'}}  variant="contained"  color="secondary">
                                    cancelar
                                </Button>
                           
                                    <Button type="submit"  size="medium" style={{background:'#2196f3'}}  variant="contained"  color="primary">
                                        Modificar usuario
                                    </Button>

                                </DialogActions>

                            </Grid>

                        </Grid>


                    </form>


                </DialogContent>
                
            </Dialog>

        </div>
    );
};

export default Modificar;
