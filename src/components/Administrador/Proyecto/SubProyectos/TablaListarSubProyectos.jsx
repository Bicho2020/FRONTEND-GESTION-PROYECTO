import React  from 'react';
import { Context } from '../Context'
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box'
import swal from 'sweetalert';
import axios from 'axios';
import Typography from '@material-ui/core/Typography'
import MuiTableCell from "@material-ui/core/TableCell";


const TableCell = withStyles({

    root: {
      borderBottom: "none",
      fontSize:13
    }

})(MuiTableCell);

const useStyles = makeStyles({
    
    activo:{
        color:'#4caf50',textAlign:'center',borderRadius:20,padding:5,background:'#c8e6c9',fontWeight:500 
    },
    desactivado:{
        color:'#f44336',textAlign:'center',borderRadius:20,padding:5,background:'#ffcdd2',fontWeight:500 
    },
    cancelado:{
        color:'#757575',textAlign:'center',borderRadius:20,padding:5,background:'#e0e0e0',fontWeight:500 
    }
});

const TablaListarSubProyectos = () => {

    const { SubProyectos , RecargarSubProyectos , BasicDataProyecto , AbrirModalSP} = Context();
  
    const classes = useStyles();

    const AdvertenciaEliminacion = (COD) => {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado , no podrá recuperar este subproyecto!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                EjecutarEliminacion(COD);
            } 
        });
    }

    const EjecutarEliminacion = async (COD) => {
        try {
            await axios.delete(`http://localhost:5000/api/SubProyecto/${COD}`)
            RecargarSubProyectos(BasicDataProyecto.COD_PROYECTO); 
        } catch (error) {
            console.log(error)
            swal("Error", "Error al eliminar sub proyecto", 'error', {
                button: "Aceptar!",
            });
        }
       
    }

    return (
        <TableContainer >

            <Table className={classes.table} size="small" >
                
                <TableHead >

                    <TableRow >

                        <TableCell align="center">NOMBRE</TableCell>
                        <TableCell align="center">DESCRIPCIÓN</TableCell>
                        <TableCell align="center">TIPO</TableCell>
                        <TableCell align="center">JEFE</TableCell>
                        <TableCell align="center">E.INICIO</TableCell>
                        <TableCell align="center">E.FIN</TableCell>
                        <TableCell lign="center">CREACION</TableCell>
                        <TableCell align="center">FAC</TableCell>
                        <TableCell align="center">RES</TableCell>
                        <TableCell align="center">EST</TableCell>
                        <TableCell align="center">OPERACION</TableCell>
      
                    </TableRow>

                </TableHead>

                <TableBody  >

                    {SubProyectos.map((v,I) => (

                        <TableRow  key={I}>

                            <TableCell style={{fontSize:12}} align="center">{v.SPR_DESCRIPCION}</TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.SPR_NOMBRE}</TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.TSP_DESCRIPCION} </TableCell>
                            
                            <TableCell style={{fontSize:11}} align="center">{v.ENCARGADO} </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.FECHA_INICIO_ESTIMADA}  </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.FECHA_FIN_ESTIMADA} </TableCell>
                      
                            <TableCell style={{fontSize:12}} align="center"> {v.FECHA_CREACION} </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.SPR_FACTURABLE ? (<Typography style={{color:'green'}} variant="button" display="block" gutterBottom>
                                Si
                                </Typography>) : (<Typography variant="button" style={{color:'red'}} display="block" gutterBottom>
                                No
                                </Typography>)} </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.SPR_RESUMEN ? (
                                <Typography variant="button" display="block" style={{color:'green'}} gutterBottom>
                                Si
                                </Typography>
                                ) : (<Typography variant="button" style={{color:'red'}} display="block" gutterBottom>
                                No
                                </Typography>)} </TableCell>


                                <TableCell style={{fontSize:11}} align="center">
                                {v.SPR_ESTADO === 1 ? ( <Box  className={classes.activo}>Activo</Box> ) 
                                
                                : ( v.SPR_ESTADO === 2 ? (
                                    <Box  className={classes.desactivado}>Desactivado</Box>
                                ) : (
                                    <Box  className={classes.cancelado}>Cancelado</Box>
                                ) )}
                                </TableCell>

                            <TableCell style={{fontSize:11}}  align="center">
                                <ButtonGroup  size="small"  >
                                    <Button  size="small" onClick={()=> {AbrirModalSP(v)}}  >   <EditIcon color="primary" style={{fontSize:20}} className="text-primary" /> </Button>
                                    <Button  size="small"   > 
                                        <DeleteOutlineIcon onClick={()=>AdvertenciaEliminacion(v.COD_SUB_PROYECTO)}  color="secondary"  style={{fontSize:20}}  /> 
                                    </Button>
                                </ButtonGroup>
                            </TableCell>

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaListarSubProyectos;