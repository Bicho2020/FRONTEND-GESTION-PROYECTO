import React, { useState } from "react";
import { Context } from './Context'
import DateFnsUtils from "@date-io/date-fns"; 
import { DatePicker,  MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import es from "date-fns/locale/es";
import Typography from '@material-ui/core/Typography';
import ListaPeriodos from './Listar'
import Divider from '@material-ui/core/Divider';
import Filtro from './Filtro'
import axios from 'axios';

export default function Registrar() {

  const {TextFieldStyles,ReflescarAniosPeriodos} = Context();
  const [selectedDate, handleDateChange  ] = useState(new Date());

  const CargarAnio = async () => {
    swal({
      title: "Seleccione año",
      content: "input",
      text:'SE ELIMINARAN LOS PERIODOS ACTUALES DE ESTE AÑO.',
      buttons: true,
      icon:'warning',
      dangerMode: true,
    })
    .then((AnioSeleccionado) => {
      if (AnioSeleccionado) {
        GuardarAniosCargados(AnioSeleccionado);
      } else {
        swal("Cancelaste la operación  o no seleccionaste un año");
      }
    });
  }

  const GuardarAniosCargados = async (AnioSeleccionado) => {
    try {
      await axios.post(`http://localhost:5000/api/imputacion/GENERAR/${AnioSeleccionado}`)
      ReflescarAniosPeriodos(AnioSeleccionado)
    } catch (error) {
      swal("Error", "Error al cargar años", 'error', {
        button: "Aceptar!",
      });
    }
  }

  const GuardarPeriodo = async () => {

    var mes = (parseInt(selectedDate.getMonth())+ 1).toString();
    var anio = selectedDate.getFullYear().toString();

    const data = {
      IMP_MES: parseInt(mes),
      IMP_ANIO: parseInt(anio),
      IMP_ESTADO:1
    }

    try {
      await axios.post( 'http://localhost:5000/api/imputacion/',data)
      ReflescarAniosPeriodos(anio)

    } catch (error) {
      swal("Error", "Periodo ya registrado", 'error', {
        button: "Aceptar!",
    });
    }
  
  }

  const classes = TextFieldStyles();

  return (

    <div>

      <Grid item xs={12} style={{marginBottom:15}}>

        <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
          PERIODOS
        </Typography>

        <Typography variant="button" display="block" gutterBottom>
          gestión de periodos<span style={{color:'red'}} ></span>
        </Typography>

      </Grid>

      <Grid container spacing={2}>
      
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>
            <DatePicker
              fullWidth

              size="small"
              format="M/yyyy"
              placeholder="Seleccione periodo"
              className={classes.textField}
              okLabel="Listo"
              cancelLabel="Cancelar"
              inputVariant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
              helperText="Seleccione fecha"
              views={["year", "month"]}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button variant="contained" onClick={GuardarPeriodo} className={classes.boton} size="small" color="primary">
            Guardar periodo
          </Button>
          <Button variant="contained" onClick={CargarAnio} className={classes.boton_cargar}  size="small" color="secondary">
            Cargar año
          </Button>
        </Grid>

        <br/>
       
        <Grid item xs={12} sm={12}>
            <Divider />
        </Grid>

        <Grid item xs={12} sm={12}>
          
          <Filtro/>
            <br/>
          <ListaPeriodos/>

        </Grid>

      </Grid>

    </div>
    
    );
}
