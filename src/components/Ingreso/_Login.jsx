import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import validator  from 'email-validator';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const TextFieldStyles = makeStyles (theme => ({
    textField:{ marginTop:5,
        "& .MuiOutlinedInput-root": {
            '&:hover fieldset': { border: "2px solid #bdbdbd", },
            "&.Mui-focused fieldset": { border: "2px solid #00b3e4",},
        },
        '& label.Mui-focused': { color: '#00b3e4', }
    },
    container:{ marginTop:80 },
    paper:{padding:5,borderRadius:0, paddingBottom:10,  background:'white', },
    cont:{ textAlign:"center", marginTop:20,},
    pd:{ padding:10 },
    btn:{ background:'#00b3e4',  fontWeight:600}
}))

const _Login = () => {

    const [Login , setLogin] = useState({
        correo : '',
        password : ''
    })

    const [validate , setValidate] = useState(true);
    
    const Ingresar = async (event) => {
        event.preventDefault();
        if(validator.validate(Login.correo)){
            const rs = await axios.post( `http://localhost:5000/api/usuario/login/${Login.correo}/${Login.password}`)
            const result = await rs.data.RESULTADO;
            if(result !== 0){
                localStorage.setItem('S',result);
                localStorage.setItem('ROL',rs.data.ROL);
                if(rs.data.ROL === 1){
                    window.location.href = "/Administrador/Home"
                } else {
                    alert('MODULO NO DISPONIBLE')
                }
            } else {
                setValidate(false);
            }
        }else{
            alert('Correo invalido')
        }
    }

    const handleInputChange = async (event) => {
        setLogin({
            ...Login,
            [event.target.name] : event.target.value    
        });
    };

    const classes = TextFieldStyles();

    return (
        <React.Fragment>
            <Container maxWidth="xs" className={classes.container}>
                <Paper  elevation={3} className={classes.paper} >
                    <Grid  item xs={12} className={classes.cont}>
                        <img src="https://kyros.cl/public/img/logo.png" alt=""/>
                    </Grid>
                    <Grid  item xs={12} className={classes.cont}>
                        <Typography  display="block" variant="h5">Gestión de proyectos</Typography>
                    </Grid>
                    <form onSubmit={Ingresar} className={classes.pd} >
                        <Grid  item xs={12} className={classes.pd}>
                            <TextField size="small" onChange={handleInputChange} name="correo" value={Login.correo} 
                            type="email" required className={classes.textField}   fullWidth label="Correo" variant="outlined" />
                        </Grid>
                        <Grid  item xs={12} className={classes.pd}>
                            <TextField  size="small" onChange={handleInputChange} name="password" value={Login.password}
                            type="password" required className={classes.textField} fullWidth label="Contraseña" variant="outlined" />
                        </Grid>
                        {validate ? (<div></div>) : ( 
                            <Grid  item xs={12} className={classes.pd}>
                            <Alert   severity="error">Credenciales erroneas!</Alert>
                            </Grid>
                        )}
                      
                        <Grid item xs={12} className={classes.pd}>
                            <Button   type="submit" className={classes.btn} variant="contained" size="medium" fullWidth color="primary">
                                Iniciar sesión
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    );
};

export default _Login;