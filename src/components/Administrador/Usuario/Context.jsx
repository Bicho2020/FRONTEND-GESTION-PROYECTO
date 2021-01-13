import React , {useState , useEffect , useMemo} from 'react'
import swal from 'sweetalert';
import axios from 'axios'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const UsuariosContext = React.createContext();



function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


const TimeToFloat = (time) => {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + '.' + minutes ;   
}

const DateToFechaSQL = (date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
        return `0${month}/${day}/${year}` ; 
    }else{
        return `${month}/${day}/${year}`;
    }
}

export function MyContext  (props)  {

    const [Usuarios , SetUsuarios ] = useState([])

    const [load,setLoad] = useState(true)

    const [DataModificar  ,setDataModificar]  = useState({
        USU_NOMBRE:'',
        USU_APELLIDO:'',
        USU_CORREO:'',
        USU_CONTRASENIA: '',
        USU_ESTADO: '1' ,
        COD_ROL: '1' ,
        USU_FECHA_NAC : '01/01/2021',
        USU_HORA_CONTRATADA : '08:00' ,
        USU_VALOR_HORA : '1000' , 
        USU_COD_JEFE : '0'
    })

    useEffect(() => {
       
        const ListarUsuarios = async () => {
            try {
                var rs = await axios.get('http://localhost:5000/api/usuario');
                SetUsuarios(rs.data);
                setLoad(false);
            } catch (error) {
               console.log(error);
            }
        };
        ListarUsuarios();
 
    },[]) 

    const RecargarListado = async () => {
        try {
            var rs = await axios.get('http://localhost:5000/api/usuario');
            return SetUsuarios(rs.data);
        } catch (error) {
           
        }
    }

    const [open, setOpen] = useState(false);

    const AbrirModal = () => setOpen(true);

    const CerrarModal = () =>  setOpen(false);

    const handleInputChange = async (event) => {
        setDataModificar({
            ...DataModificar,
            [event.target.name] : event.target.value    
        });

    };

    const ProcesoEliminacion = (id) => {

        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado , no podrá recuperar este usuario!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                EliminarUsuario(id);
            } 
        });
    }

    const EliminarUsuario = async (id) => {

        try {
            await axios.delete(`http://localhost:5000/api/usuario/${id}`);
            RecargarListado()
            swal("Poof! Usuario eliminado!", {
                icon: "success",
            });
        } catch (error) {
            swal("Error", "Usuario encargado , no puede ser eliminado", 'warning', {
                button: "Aceptar!",
            });
        }
    }


    const value = useMemo(() => {
        return ({
            Usuarios,
            RecargarListado,
            ProcesoEliminacion,
            DataModificar,
            open,
            AbrirModal,
            CerrarModal,
            handleInputChange,
            setDataModificar,TimeToFloat,DateToFechaSQL,NumberFormatCustom,load
        })
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Usuarios,RecargarListado])

    return <UsuariosContext.Provider value={value} {...props}/>

}

export function Context() {
    const context = React.useContext(UsuariosContext);
    if(!context){
        throw new Error('Debe estar dentro del contextoUsuario')
    }
    return context;
};
