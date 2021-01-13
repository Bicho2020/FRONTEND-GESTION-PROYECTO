import React ,{useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Context } from '../Context'
import moment from 'moment'
import swal from 'sweetalert'
import axios from 'axios'
import es from "date-fns/locale/es";


const RegistrarSubProyecto = () => {

    const { BasicDataProyecto , jefes , RecargarSubProyectos , TIPO_SP , TextFieldStyles ,  } = Context();

    useEffect(()=>{
      
    },[BasicDataProyecto])


    const [data,setData] = useState({
        SPR_DESCRIPCION:'',
        COD_PROYECTO:BasicDataProyecto.COD_PROYECTO.toString(),
        SPR_NOMBRE:'',
        SPR_FECHA_INICIO_ESTIMADA:new Date(),
        SPR_FECHA_TERMINO_ESTIMADA:new Date(),
        SPR_FACTURABLE:false,
        SPR_RESUMEN:false,
        COD_TIPO_SUB_PROYECTO:'0',
        COD_USUARIO_ENCARGADO:'0',
        SPR_NRO_MEJORA:0
    })

   
    const handleChangeInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChangeChecked = (event) => {
        setData({ ...data, [event.target.name]: event.target.checked });
    };


    const handleChangeDate = (date) => {
        setData({...data, SPR_FECHA_INICIO_ESTIMADA: date});
    }

    const handleChangeNumber = (event) => {
        setData({...data, SPR_NRO_MEJORA: parseInt(event.target.value)});
    }

    const handleChangeDate_2 = (date) => {
        setData({...data, SPR_FECHA_TERMINO_ESTIMADA: date});
    }

    const classes = TextFieldStyles();

    const LimpiarFormulario = () => {
        setData({...data,
            SPR_DESCRIPCION:'',
            SPR_NOMBRE:'',
            SPR_FECHA_INICIO_ESTIMADA:new Date(),
            SPR_FECHA_TERMINO_ESTIMADA:new Date(),
            SPR_FACTURABLE:false,
            SPR_RESUMEN:false,
            COD_TIPO_SUB_PROYECTO:'0',
            COD_USUARIO_ENCARGADO:'0' ,
            SPR_NRO_MEJORA:0,
        })
    }

    const ValidacionFormulario = () => {


        if(data.COD_TIPO_SUB_PROYECTO === '0'){
            swal("Error", "Porfavor seleccione un tipo de subproyecto", 'warning', {
                button: "Aceptar!",
            });
            return false;
        }

        if(data.COD_USUARIO_ENCARGADO === '0'){
            swal("Error", "Porfavor ingrese un encargado de subproyecto", 'warning', {
                button: "Aceptar!",
            });
            return false;
        }
       
        var FECHA_INICIO_ESTIMADA = moment(data.SPR_FECHA_INICIO_ESTIMADA).format('DD/MM/YYYY')
        var SPR_FECHA_TERMINO_ESTIMADA= moment(data.SPR_FECHA_TERMINO_ESTIMADA).format('DD/MM/YYYY')

        setData({...data,
            SPR_FECHA_INICIO_ESTIMADA: FECHA_INICIO_ESTIMADA,
            SPR_FECHA_TERMINO_ESTIMADA: SPR_FECHA_TERMINO_ESTIMADA,
            SPR_NRO_MEJORA: parseInt(data.SPR_NRO_MEJORA),
        });
 

        return true;
    }

    const GuardarSubProyecto = async (event) => {
        event.preventDefault();
        var rs = ValidacionFormulario();
        if(rs){
            try {
                await axios.post('http://localhost:5000/api/SubProyecto/',data)
                LimpiarFormulario();
                RecargarSubProyectos(BasicDataProyecto.COD_PROYECTO);
                swal("Poof! Sub Proyecto agregado!", {
                    icon: "success",
                });
            } catch (error) {
                console.log(error)
                swal("Error", "Error al guardar subproyecto", 'error', {
                    button: "Aceptar!",
                });
            }
           
        }
    }
    
    return (



        <div>

            <Grid item xs={12} style={{marginBottom:15}}>

                <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                    REGISTRAR SUBPROYECTO
                </Typography>

                <Typography variant="button" display="block" gutterBottom>
                    Todos los campos son obligatorios <span style={{color:'red'}} >*</span>
                </Typography> 

            </Grid>

            <Divider />

            <form action="" onSubmit={GuardarSubProyecto} >

                <Grid container spacing={2} style={{marginTop:10}}>

                    <Grid item xs={12} sm={6} >
                        <TextField required value={data.SPR_DESCRIPCION}  size="small" onChange={handleChangeInput}    name="SPR_DESCRIPCION" fullWidth label="Nombre Sub Proyecto" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <TextField required value={data.SPR_NOMBRE}   size="small" onChange={handleChangeInput}      name="SPR_NOMBRE" fullWidth label="Descripción Sub Proyecto" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider  locale={es}  utils={DateFnsUtils}>
                            <KeyboardDatePicker
            
                            name="SPR_FECHA_INICIO_ESTIMADA"
                            label="Fecha inicio estimada"
                            format="dd/MM/yyyy"
                            fullWidth
                
                            required
                            value={data.SPR_FECHA_INICIO_ESTIMADA}
                            size="small"
                            className={classes.textField}
                            inputVariant="outlined"
                            onChange={handleChangeDate}
                            KeyboardButtonProps={{ 'aria-label': 'change date',}}/>
                        </MuiPickersUtilsProvider>
                    </Grid>


                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>
                            <KeyboardDatePicker
                
                            name="SPR_FECHA_TERMINO_ESTIMADA"
                            label="Fecha termino estimada"
                            required
                            format="dd/MM/yyyy"
                            fullWidth
                            size="small"
                            value={data.SPR_FECHA_TERMINO_ESTIMADA}
                            onChange={handleChangeDate_2}
                            className={classes.textField}
                            inputVariant="outlined"
                            KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <TextField type="number" value={data.COD_TIPO_SUB_PROYECTO}  name="COD_TIPO_SUB_PROYECTO" onChange={handleChangeInput} required min="0"   size="small"   fullWidth  className={classes.textField} select label="Tipo" SelectProps={{ native: true}} variant="outlined"> 
                            <option value="0">Seleccione tipo</option>
                            {TIPO_SP.map((v) => (<option key={v.value} value={v.value}>{v.label}</option>))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <TextField type="number" value={data.COD_USUARIO_ENCARGADO}   name="COD_USUARIO_ENCARGADO" required min="0" onChange={handleChangeInput}    size="small"   fullWidth  className={classes.textField} select label="Encargado" SelectProps={{ native: true}} variant="outlined"> 
                            <option value="0">Seleccione encargado</option>
                            {jefes.map((v) => (<option key={v.COD_USUARIO} value={v.COD_USUARIO}>{v.USU_NOMBRE}</option>))}
                        </TextField>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <TextField required  type="number" value={parseInt(data.SPR_NRO_MEJORA)}  size="small" onChange={handleChangeNumber}    name="SPR_NRO_MEJORA" fullWidth label="Nro mejora" variant="outlined" className={classes.textField} />
                    </Grid>

                    <Grid item xs={12}>

                        <FormControlLabel control={<Checkbox checked={data.SPR_FACTURABLE} onChange={handleChangeChecked} name="SPR_FACTURABLE" color="primary" />} label="Facturable" />

                        <FormControlLabel  control={ <Checkbox checked={data.SPR_RESUMEN} onChange={handleChangeChecked} name="SPR_RESUMEN" color="primary" /> }  label="Resumen"/>

                    </Grid>

                    <Grid item xs={12} sm={12} style={{textAlign:'right'}} >

                        <Button type="submit" size="medium"  variant="contained" style={{background:'#00b3e4',fontWeight:600}} color="primary">
                            Registrar
                        </Button>

                    </Grid>

                </Grid>

            </form>

  
                    
        </div>
    );
};

export default RegistrarSubProyecto;