import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import axios from 'axios'
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns"; 
import Typography from '@material-ui/core/Typography';
import es from "date-fns/locale/es";

import {Context} from '../Context'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModalModificarTarea = () => {

    const {ModalTR , CerrarModalTR , TextFieldStyles , ESTADO , dataTR , setDataTR , SubProyectos , handleInputChangeTarea } = Context();

    const classes = TextFieldStyles();


    const handleinputchange = async (e) =>  {
        setDataTR({...dataTR,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeDate = (date) => {
        setDataTR({...dataTR, TAR_FECHA_INICIO_ESTIMADA: date});
    }

    const handleChangeDate2 = (date) => {
        setDataTR({...dataTR, TAR_FECHA_FIN_ESTIMADA: date});
    }

    const ModificarTarea = async (e)  => {
        e.preventDefault()
   
        if(dataTR.COD_SUB_PROYECTO === "0" ){
            swal("Error", "Porfavor ingrese un sub proyecto", 'warning', {
                button: "Aceptar!",
            });
        } else {
            try {

                const data = {
                    COD_SUB_PROYECTO: dataTR.COD_SUB_PROYECTO.toString() ,
                    TAR_DESCRIPCION: dataTR.TAR_DESCRIPCION ,
                    TAR_HORAS_PLANIFICADAS:dataTR.TAR_HORAS_PLANIFICADAS.toString()   ,
                    TAR_HORAS_IMPUTADAS:dataTR.TAR_HORAS_IMPUTADAS.toString()  ,
                    TAR_HORAS_ACTUALES:dataTR.TAR_HORAS_ACTUALES.toString() ,
                    TAR_FECHA_INICIO_ESTIMADA: dataTR.TAR_FECHA_INICIO_ESTIMADA  ,
                    TAR_FECHA_FIN_ESTIMADA: dataTR.TAR_FECHA_FIN_ESTIMADA,
                    TAR_ESTADO: parseInt(dataTR.TAR_ESTADO)
                }

                await axios.put(`http://localhost:5000/api/tarea/${dataTR.COD_TAREA}`,data)
                handleInputChangeTarea(dataTR.COD_SUB_PROYECTO)
                CerrarModalTR();
                swal("Poof! tarea modificada!", {
                    icon: "success",
                });
            } catch (error) {
                console.log(error)
                swal("Error", "Error al modificar tarea", 'error', {
                    button: "Aceptar!",
                });
            }
        }
    }

    return (

        <div>
             <Dialog  open={ModalTR} maxWidth="md" TransitionComponent={Transition}  keepMounted  >

                <DialogContent>
                    
                    <Grid item xs={12} style={{marginBottom:15}}>

                        <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                             MODIFICACIÓN TAREA
                        </Typography>

                        <Typography variant="button" display="block" gutterBottom>
                            campos  obligatorios para la modificación de tareas <span style={{color:'red'}} >*</span>
                        </Typography>

                        <Typography variant="button" display="block" gutterBottom>
                    
                        </Typography>

                    </Grid>

                    <Divider/>

                    <form action="" onSubmit={ModificarTarea} >

                        <Grid container spacing={2} style={{marginTop:10,marginBottom:10}}>

                        <Grid item xs={12} sm={12} >
                            <TextField type="number" value={dataTR.COD_SUB_PROYECTO} onChange={handleinputchange}  name="COD_SUB_PROYECTO"  min="0"  required  size="small"   fullWidth  className={classes.textField} select label="Sub Proyecto" SelectProps={{ native: true}} variant="outlined"> 
                                <option value="0">Seleccione sub proyecto</option>
                                {SubProyectos.map((v) => (<option key={v.COD_SUB_PROYECTO} value={v.COD_SUB_PROYECTO}>{v.SPR_DESCRIPCION}</option>))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataTR.TAR_DESCRIPCION} onChange={handleinputchange}   name="TAR_DESCRIPCION"    size="small"    fullWidth label="Descripcion tarea" variant="outlined" className={classes.textField} />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataTR.TAR_HORAS_PLANIFICADAS} onChange={handleinputchange}      type="number"    size="small"   name="TAR_HORAS_PLANIFICADAS" fullWidth label="Horas planificadas" variant="outlined" className={classes.textField} />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataTR.TAR_HORAS_ACTUALES}  onChange={handleinputchange}      type="number"   size="small"   name="TAR_HORAS_ACTUALES" fullWidth label="Horas actuales" variant="outlined" className={classes.textField} />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataTR.TAR_HORAS_IMPUTADAS}  onChange={handleinputchange}       size="small" type="number"   name="TAR_HORAS_IMPUTADAS" fullWidth label="Horas imputadas" variant="outlined" className={classes.textField} />
                        </Grid>

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider  locale={es}   utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                name="TAR_FECHA_INICIO_ESTIMADA"
                                label="Fecha termino estimada"
                                required
                                format="dd/MM/yyyy"
                                fullWidth
                                size="small"
                                value={dataTR.TAR_FECHA_INICIO_ESTIMADA}
                                onChange={handleChangeDate}
                                className={classes.textField}
                                inputVariant="outlined"
                                KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider  locale={es}   utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                name="TAR_FECHA_FIN_ESTIMADA"
                                label="Fecha termino estimada"
                                required
                                format="dd/MM/yyyy"
                                fullWidth
                                value={dataTR.TAR_FECHA_FIN_ESTIMADA}
                                onChange={handleChangeDate2}
                                size="small"
                                className={classes.textField}
                                inputVariant="outlined"
                                KeyboardButtonProps={{  'aria-label': 'change date',}}                  
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>


                        <Grid item xs={12} sm={6} >
                            <TextField required value={dataTR.TR_ESTADO} onChange={handleinputchange}  size="small"  name="TAR_ESTADO"      fullWidth  className={classes.textField} select label="Estado" SelectProps={{ native: true,}} helperText="Seleccione estado" variant="outlined"> {ESTADO.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option>))} </TextField>
                        </Grid>

                            <Grid item xs={12} sm={12} style={{textAlign:'right'}} >

                                
                                <Button onClick={CerrarModalTR} size="medium"  variant="contained" style={{fontWeight:600,marginRight:20}} color="secondary">
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
        </div>
    );
};

export default ModalModificarTarea;