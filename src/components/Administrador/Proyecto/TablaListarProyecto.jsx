import React  from 'react';
import { Context } from './Context'
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
import MuiTableCell from "@material-ui/core/TableCell";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import LinearProgress from '@material-ui/core/LinearProgress';


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

const TableCell = withStyles({

    root: {
      borderBottom: "none",
      fontSize:13
    }

})(MuiTableCell);

const TablaListarProyecto = () => {

    const { Proyectos  , ProcesoEliminacion , AbrirModal , setDataModificar , AbrirSubProyectoModal , load , VaciarTablaTareas } = Context();
  
    const classes = useStyles();

    return (
        load ? (
            <Box display="flex" justifyContent="center" m={1} p={1} >
                <div className={classes.root}>
                    <LinearProgress />
                </div>
            </Box>
        ):
        (
            <TableContainer >

                <Table className={classes.table} size="small" >
                    
                    <TableHead >
                        <TableRow >
                            <TableCell align="center">NOMBRE</TableCell>
                            <TableCell align="center">DESCRIPCIÓN</TableCell>
                            <TableCell align="center">JEFE</TableCell>
                            <TableCell align="center">CLIENTE</TableCell>
                            <TableCell align="center">ESTADO</TableCell>
                            <TableCell align="center">FECHA</TableCell>
                            <TableCell align="center">OPERACION</TableCell>
                            <TableCell align="center">SUB</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody  >

                        {Proyectos.map((v,I) => (

                            <TableRow  key={I}>

                                <TableCell style={{fontSize:12}} align="center">{v.PRO_NOMBRE}</TableCell>

                                <TableCell style={{fontSize:12}} align="center">{v.PRO_DESCRIPCION}</TableCell>

                                <TableCell style={{fontSize:12}} align="center">{v.USU_NOMBRE} {v.USU_APELLIDO} </TableCell>

                                <TableCell style={{fontSize:12}} align="center">{v.PRO_CLIENTE_NOMBRE} </TableCell>

                                <TableCell style={{fontSize:11}} align="center">
                                {v.PRO_ESTADO === 1 ? ( <Box  className={classes.activo}>Activo</Box> ) 

                                : ( v.PRO_ESTADO === 2 ? (
                                    <Box  className={classes.desactivado}>Desactivado</Box>
                                ) : (
                                    <Box  className={classes.cancelado}>Cancelado</Box>
                                ) )}
                                </TableCell>

                                <TableCell style={{fontSize:12}} lign="center"> {v.PRO_FECHA} </TableCell>

                                <TableCell style={{fontSize:11}} align="center">
                                    <ButtonGroup size="small"  >
                                        <Button  size="small"  onClick={()=>{ AbrirModal(); setDataModificar(v); } } >   <EditIcon color="primary" style={{fontSize:16}} className="text-primary" /> </Button>
                                        <Button  size="small"  onClick={()=> ProcesoEliminacion(v.COD_PROYECTO)}  > 
                                            <DeleteOutlineIcon  color="secondary"  style={{fontSize:16}}  /> 
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>

                                <TableCell align="center">
                                    <Button size="small"
                                        onClick={()=>  { VaciarTablaTareas() ; AbrirSubProyectoModal(v.COD_PROYECTO,v.PRO_NOMBRE)}}>
                                        <ArrowUpwardIcon className="color-global"/>
                                    </Button> 
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    );
};

export default TablaListarProyecto;