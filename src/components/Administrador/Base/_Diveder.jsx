import React , {useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import TimelapseIcon from '@material-ui/icons/Timelapse';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {  Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {  width: '100%',  marginTop:10},
    button: { marginTop:8,  color:'#00b3e4', width: '100%',
    fontWeight:600, background: 'rgb(248, 249, 250)',
    boxShadow:'0 .125rem .25rem rgba(0,0,0,.075)',
    padding: 7,paddingLeft:15,justifyContent: "flex-start"},
    button2: { marginTop:8, width: '100%',fontWeight:400,color:'#616161', padding: 7, paddingLeft:15, justifyContent: "flex-start" },
    Box:{ paddingLeft:12,  paddingRight:6 }
}));

const _Diveder = () => {

    const [PintarMenu , setPintarMenu] = useState({})

    useEffect(() => {
        var wlh = window.location.href;
        var BS = 'http://localhost:3000/Administrador/'
        var H; wlh===`${BS}Home`?(H=true):(H=false)
        var U; wlh===`${BS}Usuario`?(U=true):(U=false)
        var P; wlh===`${BS}Periodo`?(P=true):(P=false)
        var R; wlh===`${BS}Proyecto`?(R=true):(R=false)
        var data = { Home:H, Usuario:U,  Periodo:P, Proyecto:R }
        setPintarMenu(data)
    }, [])
    
    const CambiarData = (M) => {
        var H; M==='H'?(H=true):(H=false)
        var U; M==='U'?(U=true):(U=false)
        var P; M==='P'?(P=true):(P=false)
        var R; M==='R'?(R=true):(R=false)
        setPintarMenu({...PintarMenu,'Home':H,'Usuario':U,'Periodo':P,'Proyecto':R})
    }
    
    const classes = useStyles();

    return (

        <List className={classes.root} >
            <Box  className={classes.Box}>
                <Typography variant="button" className="color-global"  display="block" gutterBottom>
                    CONFIGURACIÓN
                </Typography>
            </Box>
            <Box className={classes.Box}>
                <Link to="/Administrador/Home"  onClick={()=> CambiarData('H') } >
                    <Button className={PintarMenu.Home ? classes.button : classes.button2}  variant="text" startIcon={<HomeIcon />} >
                        Home
                    </Button>
                </Link>  
            </Box >
            <Box  className={classes.Box}   >
                <Link to="/Administrador/Usuario">
                    <Button  onClick={()=> CambiarData('U')} className={PintarMenu.Usuario ? classes.button : classes.button2}  variant="text"  startIcon={<PeopleAltIcon />} > 
                        Usuarios 
                    </Button>
                </Link>
            </Box >
            <Box  className={classes.Box}   >
                <Link to="/Administrador/Periodo"  onClick={()=> CambiarData('P')}>
                    <Button  className={PintarMenu.Periodo ? classes.button : classes.button2}   variant="text" startIcon={<TimelapseIcon />} > 
                        Periodos
                    </Button>
                </Link>
            </Box >
            <Box  className={classes.Box}   >
                <Link to="/Administrador/Proyecto">
                    <Button  onClick={()=> CambiarData('R')} className={PintarMenu.Proyecto ? classes.button : classes.button2}   variant="text" startIcon={<EventNoteIcon />} > 
                     Proyectos
                    </Button>
                </Link>
            </Box >   
        </List>
    );
};

export default _Diveder;