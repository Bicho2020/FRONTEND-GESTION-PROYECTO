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
import MuiTableCell from "@material-ui/core/TableCell";
import PersonIcon from '@material-ui/icons/Person';

const TableCell = withStyles({

    root: {
      borderBottom: "none",
      fontSize:13
    }

})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    table: {
      minWidth: 650,
    },activo:{
        color:'#4caf50',textAlign:'center',borderRadius:20,padding:5,background:'#c8e6c9',fontWeight:500 
    },
    desactivado:{
        color:'#f44336',textAlign:'center',borderRadius:20,padding:5,background:'#ffcdd2',fontWeight:500 
    },
    cancelado:{
        color:'#757575',textAlign:'center',borderRadius:20,padding:5,background:'#e0e0e0',fontWeight:500 
    }
}));

const TablaTareas = () => {

    const { tareas , handleInputChangeTarea , AbrirModalTR , AbrirModalAS} = Context();
  
    const classes = useStyles();

    const AdvertenciaEliminacion = (COD,CP) => {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado , no podrá recuperar este subproyecto!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                EliminarTarea(COD,CP)
            } 
        });
    }

    const EliminarTarea = async (COD_TAREA,CP) => {
        try {
            await axios.delete(`http://localhost:5000/api/tarea/${COD_TAREA}`)
            handleInputChangeTarea(CP)
          
        } catch (error) {
            alert('Error al eliminar')
        }
    }
  

    return (

     
        tareas.length !== 0 ? (
        <TableContainer >

            <br/>

            <Table className={classes.table} size="small" >
                
                <TableHead >

                    <TableRow >

                        <TableCell align="center">NOMBRE</TableCell>
                        <TableCell align="center">CREACIÓN</TableCell>
                        <TableCell align="center">E.INICIO</TableCell>
                        <TableCell align="center">E.FIN</TableCell>
                        <TableCell align="center">H.PLAN</TableCell>
                        <TableCell align="center">H.IMPU</TableCell>
                        <TableCell align="center">H.ACT</TableCell>
                        <TableCell align="center">T.USUA</TableCell>
                        <TableCell align="center">ESTADO</TableCell>
                        <TableCell align="center">OPERACION</TableCell>
      
                    </TableRow>

                </TableHead>

                <TableBody  >

                    {tareas.map((v,I) => (

                        <TableRow  key={I}>

                            <TableCell style={{fontSize:12}} align="center">{v.TAR_DESCRIPCION}</TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.TAR_FECHA}</TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.TAR_FECHA_INICIO_ESTIMADA} </TableCell>
                      
                            <TableCell style={{fontSize:12}} align="center"> {v.TAR_FECHA_FIN_ESTIMADA} </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.TAR_HORAS_PLANIFICADAS} </TableCell>
                            
                            <TableCell style={{fontSize:11}} align="center">{v.TAR_HORAS_IMPUTADAS} </TableCell>

                            <TableCell style={{fontSize:12}} align="center">{v.TAR_HORAS_ACTUALES}  </TableCell>

                            <TableCell style={{fontSize:11}} align="center"> {v.TOTAL_USUARIO} </TableCell>
                           
                            <TableCell style={{fontSize:11}} align="center">
                            {v.TAR_ESTADO === 1 ? ( <Box  className={classes.activo}>Activo</Box> ) 
                            
                            : ( v.TAR_ESTADO === 2 ? (
                                <Box  className={classes.desactivado}>Desactivado</Box>
                            ) : (
                                <Box  className={classes.cancelado}>Cancelado</Box>
                            ) )}
                            </TableCell>

                            <TableCell align="center">
                                <ButtonGroup size="small"  >
                                    <Button  size="small" onClick={()=> AbrirModalTR(v)}  >   <EditIcon color="primary" style={{fontSize:20}} className="text-primary" /> </Button>
                                    <Button  size="small"   > 
                                        <DeleteOutlineIcon onClick={() => AdvertenciaEliminacion(v.COD_TAREA,v.COD_SUB_PROYECTO) }  color="secondary"  style={{fontSize:20}}  /> 
                                    </Button>
                                    <Button  size="small"   > 
                                        <PersonIcon onClick={() => AbrirModalAS(v.COD_TAREA,v.COD_SUB_PROYECTO) }    style={{fontSize:20,color:'#2196f3'}}  /> 
                                    </Button>
                                </ButtonGroup>
                            </TableCell>

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>

        ) : (
        <Box display="flex" justifyContent="center" m={1} p={1} >
            <div className={classes.root}>
                Seleccione un sub proyecto con tareas para cargar tabla
            </div>
        </Box>
        )
    );
};

export default TablaTareas;