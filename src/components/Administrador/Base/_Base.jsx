import React , { useState  } from 'react'
import {BrowserRouter as Router  , Route} from "react-router-dom";
import { Divide as Hamburger } from 'hamburger-react'
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from './_Diveder'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Usuario  from '../Usuario/_Base_Usuario'
import Home from '../Home/_Base_Home'
import Periodo from '../Periodo/_Base_Periodo'
import Proyecto from '../Proyecto/_Base_Proyecto'
import '../../../Styles/sidebar.css';

const useStyles = makeStyles((theme) => ({
    close:{ padding:10,},
    btnclose:{ marginTop:5, background:'#00b3e4', fontWeight:600 },
    datos:{ marginTop:6, textAlign:'center'},
    logoKyros:{marginLeft:30,marginTop:8},
    divider: {marginLeft:8,marginRight:8},
    btnNone:{margin:0,padding:0,border:0,background:'none',paddingLeft:5}
}));

const Administrador = () => {

    const [isOpen] = useState(false)

    const CerrarSesion = () => {
        localStorage.removeItem('S');
        localStorage.removeItem('ROL');
        window.location.href = "/"
    }

    const TogglerBtn = () => {  
        var element = document.getElementById("sidebar");
        element.classList.toggle("active");
    }

    const classes = useStyles();

    return (

        <React.Fragment>    
            <Router>
                <div className="wrapper"  >
                    <nav id="sidebar"  >
                        <Grid  item xs={12} className={classes.close} >
                            <img className={classes.logoKyros} src="https://kyros.cl/public/img/logo.png" alt=""/>
                        </Grid>
                        <Divider className={classes.divider}/>
                        <Menu/>
                        <Divider className={classes.divider}/>
                        <Grid  item xs={12} className={classes.close} >
                            <Button type="submit" onClick={CerrarSesion} className={classes.btnclose}  variant="contained" size="small" fullWidth color="primary">
                                Cerrar sesión
                            </Button>
                        </Grid>
                        <Grid  item xs={12} className={classes.datos} >
                            <Typography variant="button"  color="textPrimary" gutterBottom>
                                USUARIO: <span className="color-global">VICENTE MUÑOZ</span>
                            </Typography>
                        </Grid>
                    </nav>
                    <div id="content">
                        <Grid  item xs={12}  >
                            <button  className={classes.btnNone}  onClick={TogglerBtn}>
                                <Hamburger  size={23} color="#00b3e4"  toggled={isOpen}   />
                            </button>
                        </Grid>
                        <Route path="/Administrador/Home" component={Home} />
                        <Route path="/Administrador/Proyecto" component={Proyecto} />
                        <Route path="/Administrador/Periodo" component={Periodo} />
                        <Route path="/Administrador/Usuario" component={Usuario} />
                    </div>
                </div>
            </Router>
        </React.Fragment>
    )
}

export default Administrador;