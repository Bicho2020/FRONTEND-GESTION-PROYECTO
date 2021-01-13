import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import PersonIcon from '@material-ui/icons/Person';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {Context} from '../Context'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
  }));


const ModalAsignacionUsuario = () => {

    const {ModalAS , CerrarModalAS , handleInputChangeTarea ,  codSP , asignacion , ListarAsignacion } = Context();

    const [state] = React.useState({
        c1: true,
        c0: false,
      });
    

    const classes = useStyles();

    const handleChange = async (EST,COD_ROL,COD_USUARIO) => {

        if(EST===1){

          try {
            await axios.post(`http://localhost:5000/api/Asignaciontarea/${COD_ROL}/${COD_USUARIO}`);
            ListarAsignacion(COD_ROL)
            handleInputChangeTarea(codSP)
        
          } catch (error) {
            alert('Error al desactivar')
          }
           

        } else {
            try {
                await axios.delete(`http://localhost:5000/api/Asignaciontarea/${COD_ROL}/${COD_USUARIO}`);
                ListarAsignacion(COD_ROL)
                handleInputChangeTarea(codSP)
                
            } catch (error) {
                alert('Error al activar')
            }
        }
    };
    

    return (

        <div>

            <Dialog  open={ModalAS} maxWidth="md" TransitionComponent={Transition}  keepMounted  >

                <DialogContent>
                    
                    <Grid item xs={12} style={{marginBottom:15}}>

                        <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                            Asignacion Usuario   
                            <IconButton edge="start" color="secondary" style={{marginLeft:100,marginBottom:4}} onClick={CerrarModalAS} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Typography>

                     

                        <Typography variant="button" display="block" gutterBottom>
                    
                        </Typography>

                    </Grid>

                    <Divider/>

                    <Grid container spacing={2} style={{marginTop:10,marginBottom:10}}>

                      <List component="nav" className={classes.root} aria-label="mailbox folders">

                            {asignacion.map((v,I) => (

                                <ListItem key={I} button>

                                    <ListItemAvatar>

                                        <Avatar className={classes.avatar}>
                                            <PersonIcon />
                                        </Avatar>

                                    </ListItemAvatar>
                                    
                                    <ListItemText primary={v.USU_NOMBRE+' '+v.USU_APELLIDO } />

                                    {v.ASIGNADO === 'ASIGNADO' ? (
                                        <Checkbox color="primary" checked={state.c1} onChange={() => {handleChange(0,v.COD_TAREA,v.COD_USUARIO)} }     inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    ) : (
                                        <Checkbox color="primary" checked={state.c0}    onChange={() => {handleChange(1,v.COD_TAREA,v.COD_USUARIO)}}  inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    )}

                                
                                </ListItem>

                            ))}

                      </List>

             

                    </Grid>

                    
                </DialogContent>

                </Dialog>
        </div>
    );
};

export default ModalAsignacionUsuario;