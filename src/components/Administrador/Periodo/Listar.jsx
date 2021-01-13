import React  from 'react';
import { Context } from './Context'
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'
import MuiTableCell from "@material-ui/core/TableCell";
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import axios from 'axios';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },activo:{
        color:'#4caf50',textAlign:'center',borderRadius:20,padding:3,background:'#c8e6c9',fontWeight:500 
    },
    desactivado:{
        color:'#f44336',textAlign:'center',borderRadius:20,padding:3,background:'#ffcdd2',fontWeight:500 
    }
});

const TableCell = withStyles({

    root: {
      borderBottom: "none",
      fontSize:13
    }

})(MuiTableCell);


const Listar = () => {

    const {periodo , ReflescarAniosPeriodos} = Context();
    const classes = useStyles();

    const NumeroToMes = (MES) => {
        if(MES===1) return MES = 'ENERO';
        if(MES===2) return MES = 'FEBRERO';
        if(MES===3) return MES = 'MARZO';
        if(MES===4) return MES = 'ABRIL';
        if(MES===5) return MES = 'MAYO';
        if(MES===6) return MES = 'JUNIO';
        if(MES===7) return MES = 'JULIO';
        if(MES===8) return MES = 'AGOSTO';
        if(MES===9) return MES = 'SEPTIEMBRE';
        if(MES===10) return MES = 'OCTUBRE';
        if(MES===11) return MES = 'NOVIEMBRE';
        if(MES===12) return MES = 'DICIEMBRE';
    }

    const CambiarEstado =  (EST,COD,ANIO) => {
        var ESTADO;
        var TO_ESTADO
    
        if(EST === 1){
            ESTADO = 'Desactivado' ; TO_ESTADO = 0;
        } else {
            ESTADO = 'Activado' ; TO_ESTADO = 1
        }
    
        swal({
            title: "Esta seguro ?",
            text: "Cambiras el periodo código "+COD+"  a estado  "+ ESTADO + " !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                ejecutarCambioEstado(COD,TO_ESTADO,ANIO)
            }
        });
    
    }
    
    const ejecutarCambioEstado =  async (COD,EST,ANIO) => {
        await axios.put(`http://localhost:5000/api/imputacion/${COD}/${EST}`);
        ReflescarAniosPeriodos(ANIO)
    }
    

    return (



        <TableContainer >

            {periodo.length !== 0 ? (

                <Table className={classes.table} size="small" stickyHeader={false} aria-label="caption table">
                    
                    <TableHead >
                        <TableRow >
                        
                            <TableCell align="left">CÓDIGO</TableCell>
                            <TableCell align="left">MES</TableCell>
                            <TableCell align="left">AÑO</TableCell>
                            <TableCell align="center">ESTADO</TableCell>
                            <TableCell align="center">CAMBIAR ESTADO</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody  >

                        {periodo.length !== 0 ? (

                            periodo.map((v,I) => (
    
                            <TableRow  key={I}>

                                <TableCell align="left">{v.COD_INPUTACION}</TableCell>

                                <TableCell align="left">{NumeroToMes(v.IMP_MES)}</TableCell>

                                <TableCell align="left">{v.IMP_ANIO} </TableCell>

                                <TableCell align="center">{v.IMP_ESTADO === 1 ? ( <Box  className={classes.activo}>ACTIVO</Box> ) 
                                : (  <Box  className={classes.desactivado}>DESACTIVADO</Box>)}
                                </TableCell>

                                <TableCell align="center"> <Button color="primary" ><CachedIcon onClick={()=> CambiarEstado(v.IMP_ESTADO,v.COD_INPUTACION,v.IMP_ANIO)} /> </Button>  </TableCell>

                            </TableRow>
                        ))) : 
                        
                        (
                            <TableRow  key="1">
                                <TableCell  colSpan="100%" align="center">PERIODO VACIO O AÑO NO SELECCIONADO</TableCell>
                            </TableRow>
                        )}
                    
                    </TableBody>

                </Table>
            ) : ('Seleccione año')
            }
        </TableContainer>
    );
};

export default Listar;