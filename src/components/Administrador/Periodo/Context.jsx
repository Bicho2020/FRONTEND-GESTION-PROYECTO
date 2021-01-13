import React , {useEffect, useMemo, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'

const PeriodoContext = React.createContext();

const TextFieldStyles = makeStyles (theme => ({
    textField:{
      marginTop:5,
      "& .MuiOutlinedInput-root": {
        '&:hover fieldset': {
            border: "2px solid #bdbdbd",
        },
        "&.Mui-focused fieldset": {
          border: "2px solid #00b3e4",
        
        },
      },
      '& label.Mui-focused': {
        color: '#00b3e4',
      }
    },
    boton:{
      background:'#00b3e4',
      justifyContent:'center'
    },
    boton_cargar:{
      marginLeft:10
    }
}))

export function MyContext  (props)  {

  const [periodo , setPeriodo] = useState([])
  const [anios , setAnios] = useState([])

  const handleInputChange = async (ANIO) => {
    var rs = await axios.get(`http://localhost:5000/api/imputacion/${ANIO}`);
    setPeriodo(rs.data);
  };


  useEffect(()=> {
      const ListarAnios = async () => {
          var rs = await axios.get('http://localhost:5000/api/imputacion/');
          setAnios(rs.data.map((V) => ({ title: V.IMP_ANIO.toString()})));
      }
      ListarAnios();
  },[])

  const ReflescarAniosPeriodos = async (ANIO) => {

      try {
          
        var rss = await axios.get(`http://localhost:5000/api/imputacion/${ANIO}`);
        const data = await rss.data;
      setPeriodo(data);
      } catch (error) {
        alert(error)
      }
  
  }

  const value = useMemo(() => {
    return ({
      periodo,
      TextFieldStyles ,
      handleInputChange,
      anios,
      ReflescarAniosPeriodos
    })
  },[periodo,anios])

  return <PeriodoContext.Provider value={value} {...props}/>

}

export function Context() {
    const context = React.useContext(PeriodoContext);
    if(!context){
        throw new Error('Debe estar dentro del contextoUsuario')
    }
    return context;
};
