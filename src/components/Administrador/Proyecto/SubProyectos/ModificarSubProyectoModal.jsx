import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide';
import { Context } from '../Context'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import axios from 'axios'
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import es from "date-fns/locale/es";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModificarSubProyectoModal = () => {

    const { ModalSP , CerrarModalSp , TextFieldStyles , RecargarSubProyectos,  ESTADO,  BasicDataProyecto , dataSP , TIPO_SP , jefes , setDataSP } = Context();

    const handleInputChangeInput = async (event) => {
        setDataSP({
            ...dataSP,
            [event.target.name] : event.target.value    
        });
    };

    
    const handleChangeChecked = (event) => {
        setDataSP({ ...dataSP, [event.target.name]: event.target.checked });
    };


    const handleChangeDate = (date) => {
        setDataSP({...dataSP, FECHA_INICIO_ESTIMADA: date});
    }

    const handleChangeDate_2 = (date) => {
        setDataSP({...dataSP, FECHA_FIN_ESTIMADA: date});
    }

    const Test = async (event)  => {

        event.preventDefault();

        const data = {
            SPR_DESCRIPCION: dataSP.SPR_DESCRIPCION ,
            COD_PROYECTO: BasicDataProyecto.COD_PROYECTO.toString() ,
            SPR_NOMBRE: dataSP.SPR_NOMBRE ,
            SPR_FECHA_INICIO_ESTIMADA: dataSP.FECHA_INICIO_ESTIMADA ,
            SPR_FECHA_TERMINO_ESTIMADA: dataSP.FECHA_FIN_ESTIMADA ,
            SPR_FACTURABLE: dataSP.SPR_FACTURABLE ,
            SPR_RESUMEN: dataSP.SPR_RESUMEN ,
            COD_TIPO_SUB_PROYECTO: dataSP.COD_TIPO_SUB_PROYECTO.toString() ,
            COD_USUARIO_ENCARGADO: dataSP.COD_USUARIO_ENCARGADO.toString(),
            ESTADO : parseInt(dataSP.SPR_ESTADO) ,
            SPR_NRO_MEJORA: parseInt(dataSP.SPR_NRO_MEJORA) ,
        }

        try {
            
            await axios.put(`http://localhost:5000/api/SubProyecto/${dataSP.COD_SUB_PROYECTO}`,data)
            RecargarSubProyectos(BasicDataProyecto.COD_PROYECTO);
            CerrarModalSp();
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
     
    const classes = TextFieldStyles();

    return (

        <Dialog  open={ModalSP} TransitionComponent={Transition} maxWidth="md"   keepMounted  >

            <DialogContent>
                
                <Grid item xs={12} style={{marginBottom:15}}>

                    <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                       MODIFICACION SUB PROYECTO
                    </Typography>

                    <Typography variant="button" display="block" gutterBottom>
                        campos  obligatorios para la modificación de Sub Proyectos <span style={{color:'red'}} >*</span>
                    </Typography>

                    <Typography variant="button" display="block" gutterBottom>
                  
                     </Typography>

                </Grid>

                <Divider/>

                <form action="" onSubmit={Test}  >

                    <Grid container spacing={2} style={{marginTop:10,marginBottom:10}}>

                        <Grid item xs={12} sm={6} >
                            <TextField required size="small" value={dataSP.SPR_DESCRIPCION} onChange={handleInputChangeInput}   name="SPR_DESCRIPCION" fullWidth label="Nombre subproyecto" variant="outlined" className={classes.textField} />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required  size="small"  value={dataSP.SPR_NOMBRE} onChange={handleInputChangeInput}   name="SPR_NOMBRE" fullWidth label="Descripción proyecto" variant="outlined" className={classes.textField} />
                        </Grid>

                
                        
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                name="FECHA_INICIO_ESTIMADA"
                                label="Fecha inicio estimada"
                                format="MM/dd/yyyy"
                                value={dataSP.FECHA_INICIO_ESTIMADA}
                                fullWidth
                                required
                                onChange={handleChangeDate}
                                size="small"
                                className={classes.textField}
                                inputVariant="outlined"
                                KeyboardButtonProps={{ 'aria-label': 'change date',}}/>
                            </MuiPickersUtilsProvider>
                        </Grid>


                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                name="FECHA_FIN_ESTIMADA"
                                label="Fecha termino estimada"
                                format="MM/dd/yyyy"
                                fullWidth
                                required
                                size="small"
                                onChange={handleChangeDate_2}
                                value={dataSP.FECHA_FIN_ESTIMADA}  
                                className={classes.textField}
                                inputVariant="outlined"
                                KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField onChange={handleInputChangeInput} type="number" value={dataSP.COD_TIPO_SUB_PROYECTO}    name="COD_TIPO_SUB_PROYECTO"   min="0" required  size="small"   fullWidth  className={classes.textField} select label="Tipo" SelectProps={{ native: true}} variant="outlined"> 
                                <option value="0">Seleccione tipo</option>
                                {TIPO_SP.map((v) => (<option key={v.value} value={v.value}>{v.label}</option>))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField onChange={handleInputChangeInput} type="number" value={dataSP.COD_USUARIO_ENCARGADO}   name="COD_USUARIO_ENCARGADO" required min="0"    size="small"   fullWidth  className={classes.textField} select label="Encargado" SelectProps={{ native: true}} variant="outlined"> 
                                <option value="0">Seleccione encargado</option>
                                {jefes.map((v) => (<option key={v.COD_USUARIO} value={v.COD_USUARIO}>{v.USU_NOMBRE}</option>))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataSP.SPR_ESTADO} size="small"  name="SPR_ESTADO" onChange={handleInputChangeInput}      fullWidth  className={classes.textField} select label="Estado" SelectProps={{ native: true,}} helperText="Seleccione estado" variant="outlined"> {ESTADO.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                          <TextField required  type="number" value={parseInt(dataSP.SPR_NRO_MEJORA)}  size="small" onChange={handleInputChangeInput}    name="SPR_NRO_MEJORA" fullWidth label="Nro mejora" variant="outlined" className={classes.textField} />
                      </Grid>


                        <Grid item xs={6}>

                            <FormControlLabel control={<Checkbox checked={dataSP.SPR_FACTURABLE} onChange={handleChangeChecked}   name="SPR_FACTURABLE" color="primary" />} label="Es facturable" />

                            <FormControlLabel  control={ <Checkbox checked={dataSP.SPR_RESUMEN} onChange={handleChangeChecked}    name="SPR_RESUMEN" color="primary" /> }  label="Resumen"/>

                        </Grid>

                        <Grid item xs={12} sm={12} style={{textAlign:'right'}} >

                            
                            <Button onClick={CerrarModalSp} size="medium"  variant="contained" style={{fontWeight:600,marginRight:20}} color="secondary">
                                CANCELAR
                            </Button>

                            <Button type="submit" size="medium"  variant="contained" style={{background:'#00b3e4',fontWeight:600}} color="primary">
                                MODIFICAR
                            </Button>

                        </Grid>

                    </Grid>

                </form>

            </DialogContent>

        </Dialog>
    );
};

export default ModificarSubProyectoModal;