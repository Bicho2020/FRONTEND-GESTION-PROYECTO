import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Context} from './Context'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RegistrarSubProyecto from './SubProyectos/RegistrarSubProyecto'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TablaSubProyecto from '././SubProyectos/TablaListarSubProyectos'
import ModalModificarSB from './SubProyectos/ModificarSubProyectoModal' 
import RegistrarTarea from './Tareas/RegistrarTarea'
import FiltrarTarea from './Tareas/FiltrarTareas'
import TablaTareas from './Tareas/TablaTareas'
import  ModalModificarTarea from './Tareas/ModalModificarTarea'
import ModalAs from './Tareas/ModalAsignacionUsuario'

const useStyles = makeStyles((theme) => ({
  root:{
    background: '#f3f6f7',
    height:'100%'
  },
  appBar: {
    position: 'relative',
    background:'#00b3e4'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper:{
    padding:15,
  },
  menu:{
    marginRight:30
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubProyectoModal() {

  const {CerrarSubProyectoModal,SubProyectoModal , BasicDataProyecto } = Context();


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>

      <Dialog fullScreen open={SubProyectoModal} onClose={CerrarSubProyectoModal} TransitionComponent={Transition}>

        <AppBar className={classes.appBar}>

          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              <span  style={{fontWeight:700}}  >{BasicDataProyecto.PRO_NOMBRE}</span>
            </Typography>

            <Tabs value={value} onChange={handleChange} className={classes.menu} >
              <Tab label="Sub Proyectos" {...a11yProps(0)} />
              <Tab label="Tareas" {...a11yProps(1)} />
            </Tabs>
          
            <IconButton edge="start" color="inherit" onClick={CerrarSubProyectoModal} aria-label="close">
              <CloseIcon />
            </IconButton>

          </Toolbar>

        </AppBar>

        <TabPanel value={value} className={classes.root} index={0}>

          <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>

              <Paper className={classes.paper}>
                <RegistrarSubProyecto/>
              </Paper>
                
            </Grid>

            <Grid item xs={12} sm={8}>

              <Paper className={classes.paper}>
                <TablaSubProyecto/>
                <ModalModificarSB/>
              </Paper>
              
            </Grid>

          </Grid>
                
        </TabPanel>

        
        <TabPanel value={value} className={classes.root}  index={1}>

          <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>

              <Paper className={classes.paper}>
                <RegistrarTarea/>
              </Paper>
                
            </Grid>

             <Grid item xs={12} sm={8}>

              <Paper className={classes.paper}>
                <FiltrarTarea/>
                <TablaTareas/>
                <ModalModificarTarea/>
                <ModalAs/>
              </Paper>
                
            </Grid>

          </Grid>

        </TabPanel>

      </Dialog>
    </div>
  );
}
