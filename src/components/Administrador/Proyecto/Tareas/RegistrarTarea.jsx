import React ,{useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; 
import swal from 'sweetalert'
import axios from 'axios'
import { Context } from '../Context'
import es from "date-fns/locale/es";
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InformacionTarea from './InformacionTarea'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const RegistrarTarea = () => {

    const { TextFieldStyles , SubProyectos , handleInputChangeTarea , modalRG , CerrarModalRG} = Context();

    const [data,setData] = useState({
        COD_SUB_PROYECTO: '0' ,
        TAR_DESCRIPCION: '' ,
        TAR_HORAS_PLANIFICADAS:''  ,
        TAR_HORAS_IMPUTADAS:'' ,
        TAR_HORAS_ACTUALES:'' ,
        TAR_FECHA_INICIO_ESTIMADA: new Date()  ,
        TAR_FECHA_FIN_ESTIMADA: new Date()  ,
    })

    const LimpiarData = () => {
        setData({
            ...data,
            COD_SUB_PROYECTO: '0' ,
            TAR_DESCRIPCION: '' ,
            TAR_HORAS_PLANIFICADAS:''  ,
            TAR_HORAS_IMPUTADAS:'' ,
            TAR_HORAS_ACTUALES:'' ,
            TAR_FECHA_INICIO_ESTIMADA: new Date()  ,
            TAR_FECHA_FIN_ESTIMADA: new Date()  ,
        })
    }

    useEffect(() => {

    },[SubProyectos])


    const handleinputchange = async (e) =>  {
        setData({...data,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeDate = (date) => {
        setData({...data, TAR_FECHA_INICIO_ESTIMADA: date});
    }

    const handleChangeDate2 = (date) => {
        setData({...data, TAR_FECHA_FIN_ESTIMADA: date});
    }

    const GuardarTarea =  async (e) => {
        e.preventDefault()
   
        if(data.COD_SUB_PROYECTO === "0" ){
            swal("Error", "Porfavor ingrese un sub proyecto", 'warning', {
                button: "Aceptar!",
            });
        } else {
            try {
                await axios.post('http://localhost:5000/api/tarea',data)
                LimpiarData();
                CerrarModalRG();
                handleInputChangeTarea(data.COD_SUB_PROYECTO)
                swal("Poof! Sub Tarea guardada!", {
                    icon: "success",
                });
            } catch (error) {
                swal("Error", "Error al guardar tarea", 'error', {
                    button: "Aceptar!",
                });
            }
        }
    }

    const classes = TextFieldStyles();

    return (

        <div>

            <InformacionTarea/>

            <Dialog  open={modalRG} maxWidth="xs" TransitionComponent={Transition}  keepMounted  >

                <DialogContent>

                    <Grid item xs={12} style={{marginBottom:15}}>

                        <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                            REGISTRAR TAREA
                        </Typography>

                        <Typography variant="button" display="block" gutterBottom>
                            Todos los campos son obligatorios <span style={{color:'red'}} >*</span>
                        </Typography> 

                    </Grid>

                    <Divider />

                    <form action="" onSubmit={GuardarTarea} >

                        <Grid container spacing={2} style={{marginTop:10}}>

                            <Grid item xs={12} sm={12} >
                                <TextField type="number" value={data.COD_SUB_PROYECTO}  onChange={handleinputchange}  name="COD_SUB_PROYECTO"  min="0"  required  size="small"   fullWidth  className={classes.textField} select label="Encargado" SelectProps={{ native: true}} variant="outlined"> 
                                    <option value="0">Seleccione sub proyecto</option>
                                    {SubProyectos.map((v) => (<option key={v.COD_SUB_PROYECTO} value={v.COD_SUB_PROYECTO}>{v.SPR_DESCRIPCION}</option>))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required name="TAR_DESCRIPCION"  value={data.TAR_DESCRIPCION} onChange={handleinputchange}    size="small"    fullWidth label="Descripcion tarea" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required value={data.TAR_HORAS_PLANIFICADAS}   onChange={handleinputchange}    type="number"    size="small"   name="TAR_HORAS_PLANIFICADAS" fullWidth label="Horas planificadas" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required value={data.TAR_HORAS_ACTUALES}  onChange={handleinputchange}    type="number"   size="small"   name="TAR_HORAS_ACTUALES" fullWidth label="Horas actuales" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <TextField required  value={data.TAR_HORAS_IMPUTADAS}  onChange={handleinputchange}     size="small" type="number"   name="TAR_HORAS_IMPUTADAS" fullWidth label="Horas imputadas" variant="outlined" className={classes.textField} />
                            </Grid>

                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                    name="TAR_FECHA_INICIO_ESTIMADA"
                                    label="Fecha termino estimada"
                                    required
                                    format="dd/MM/yyyy"
                                    fullWidth
                    
                                    size="small"
                                    value={data.TAR_FECHA_INICIO_ESTIMADA}
                                    onChange={handleChangeDate} 
                                    className={classes.textField}
                                    inputVariant="outlined"
                                    KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider   locale={es}   utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                    name="TAR_FECHA_FIN_ESTIMADA"
                                    label="Fecha termino estimada"
                                    required
                                    format="dd/MM/yyyy"
                                    fullWidth
                                    value={data.TAR_FECHA_FIN_ESTIMADA}
                                    onChange={handleChangeDate2} 
                        
                                    size="small"
                                    className={classes.textField}
                                    inputVariant="outlined"
                                    KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={12} sm={12} style={{textAlign:'right',marginBottom:10,marginTop:20}} >

                                <Button onClick={CerrarModalRG} size="medium"  variant="contained" style={{fontWeight:600,marginRight:20}} color="secondary">
                                    CANCELAR
                                </Button>

                                <Button type="submit" size="medium"  variant="contained" style={{background:'#00b3e4',fontWeight:600}} color="primary">
                                    Registrar
                                </Button>

                            </Grid>

                        </Grid>

                    </form>


                </DialogContent>

            </Dialog>


            
        </div>
    );
};

export default RegistrarTarea;