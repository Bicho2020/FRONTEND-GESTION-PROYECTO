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
    },
    admin:{
        color:'#ffc107',textAlign:'center',borderRadius:20,padding:3,background:'#fff9c4',fontWeight:500 
    },
    usuario:{
        color:'#2196f3',textAlign:'center',borderRadius:20,padding:3,background:'#bbdefb',fontWeight:500 
    },
    activo:{
        color:'#4caf50',textAlign:'center',borderRadius:20,padding:3,background:'#c8e6c9',fontWeight:500 
    },
    desactivado:{
        color:'#f44336',textAlign:'center',borderRadius:20,padding:3,background:'#ffcdd2',fontWeight:500 
    }
}));

const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
})(MuiTableCell);

const Listar = () => {

    const { Usuarios , ProcesoEliminacion , AbrirModal , setDataModificar , load } = Context();


    
    const classes = useStyles();

    return (
        load ? (
            <Box display="flex" justifyContent="center" m={1} p={1} >
               <div className={classes.root}>
                    <LinearProgress />
                </div>
            </Box>
        ):(
            <TableContainer >
            <Table className={classes.table} size="small" stickyHeader={false} aria-label="caption table">
                
                <TableHead >
                    <TableRow >
                        <TableCell>NOMBRE</TableCell>
                        <TableCell align="center">JEFE</TableCell>
                        <TableCell align="center">NACIMIENTO</TableCell>
                        <TableCell align="center">HORAS</TableCell>
                        <TableCell align="center">CORREO</TableCell>
                        <TableCell align="center">ESTADO</TableCell>
                        <TableCell align="center">ROL</TableCell>
                        <TableCell align="center">OPERACIÓN</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody  >

                    {Usuarios.map((v,I) => (                        

                        <TableRow  key={I}>

                            <TableCell  style={{fontSize:12}}  component="th" scope="row"> {v.USU_NOMBRE} {v.USU_APELLIDO}</TableCell>

                            <TableCell  style={{fontSize:12}}  align="center"> {v.JEFE}</TableCell>
                            
                            <TableCell  style={{fontSize:12}}  align="center"> {v.USU_FECHA_NAC}</TableCell>

                            <TableCell  style={{fontSize:12}}  align="center">$ {v.USU_VALOR_HORA} ({v.USU_HORA_CONTRATADA}) </TableCell>

                            <TableCell  style={{fontSize:12}}  align="center">{v.USU_CORREO}</TableCell>

                            <TableCell  style={{fontSize:11}}  align="center">{v.USU_ESTADO === 1 ? ( <Box  className={classes.activo}>Activo</Box> ) 
                            : (  <Box  className={classes.desactivado}>Desactivado</Box>)}
                            </TableCell>

                            <TableCell  style={{fontSize:11}}  align="center"> {v.COD_ROL === 1 ?  (   <Box  className={classes.admin}>  Admin   </Box>   )
                            :  ( <Box className={classes.usuario}>Usuario</Box>   )}
                            </TableCell>

                            <TableCell  style={{fontSize:11}}  align="center">
                                <ButtonGroup size="small"  >
                                    <Button size="small"  onClick={()=> {  setDataModificar(v); AbrirModal(); } }   color="primary">   <EditIcon style={{fontSize:16}} className="text-primary" /> </Button>
                                    <Button size="small"  onClick={()=> {   ProcesoEliminacion(v.COD_USUARIO) }}  color="secondary" > 
                                        <DeleteOutlineIcon  style={{fontSize:16}} className="text-danger" /> 
                                    </Button>
                                </ButtonGroup>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
        
    );
};

export default Listar;