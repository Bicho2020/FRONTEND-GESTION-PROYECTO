import React , {useState , useEffect , useMemo} from 'react'
import swal from 'sweetalert';
import axios from 'axios'
import { makeStyles  } from '@material-ui/core/styles';

const ProyectosContext = React.createContext();

const ESTADO = [
    { value: '1',label: 'Activo',},
    { value: '2', label: 'Desactivado'},
    { value: '3', label: 'Cancelado'}
];


const TIPO_SP = [
    {label:'DESARROLLO',value:'1'},
    {label:'CONSULTORIA',value:'2'},
    {label:'SOPORTE',value:'3'},
]

const TextFieldStyles = makeStyles (theme => ({

    textField:{
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
    }
}))


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

    const [dataSP,setDataSP] = useState({
        SPR_DESCRIPCION:'',
        COD_PROYECTO:'',
        SPR_NOMBRE:'',
        FECHA_INICIO_ESTIMADA:new Date(),
        FECHA_FIN_ESTIMADA:new Date(),
        SPR_FACTURABLE:false,
        SPR_RESUMEN:false,
        COD_TIPO_SUB_PROYECTO:'0',
        COD_USUARIO_ENCARGADO:'0',
        COD_SUB_PROYECTO:'',
        SPR_ESTADO : 0,
        SPR_NRO_MEJORA:0
    })

    const [ModalSP , setModalSp] = useState(false)

    const AbrirModalSP =  async (data) => {
        setModalSp(true);
        setDataSP(data);
    };

    const CerrarModalSp =  async () => {
        setModalSp(false);
    };

    const [load,setLoad] = useState(true)

    const [Proyectos , setProyectos ] = useState([])

    const [jefes, setJefes] = useState([]);

    const [clientes, setCleintes] = useState([])

    const [open, setOpen] = useState(false);

    const [modalRG,setModalRG] = useState(false)

    const [SubProyectos , setSubProyectos] = useState([]);

 
    const AbrirModalRG = async () => {
        setModalRG(true)
    }

    const CerrarModalRG = async () => {
        setModalRG(false)
    }

    const [BasicDataProyecto , SetBasicDataProyecto] = useState({
        COD_PROYECTO:'',
        PRO_NOMBRE:''
    })

    const [DataModificar  , setDataModificar]  = useState({

        PRO_DESCRIPCION:'',
        COD_CLIENTE:'0',
        COD_USUARIO_JEFE: '0',
        PRO_FECHA: '',
        PRO_ESTADO: '',
        PRO_CLIENTE_NOMBRE:'0',
        PRO_NOMBRE : ''
    })

    const RecargarSubProyectos = async  (COD) => {
        try {
            const rs = await axios.get(`http://localhost:5000/api/SubProyecto/${COD}`)
            setSubProyectos(rs.data)
        } catch (error) {
            console.log('Error al lista , Codigo error: '+error+'');
        }
    }

    const [SubProyectoModal, setSubModalProyecto] = useState(false);

    const AbrirSubProyectoModal =  async (COD,NOMBRE) => {

        setSubModalProyecto(true);
        
        SetBasicDataProyecto({...BasicDataProyecto,
            COD_PROYECTO:COD,
            PRO_NOMBRE:NOMBRE
        })

        try {
            const rs = await axios.get(`http://localhost:5000/api/SubProyecto/${COD}`)
            setSubProyectos(rs.data)
        } catch (error) {
            console.log('Error al lista , Codigo error: '+error+'');
        }

  
    };
  
    const CerrarSubProyectoModal = () => {
        setSubModalProyecto(false);
    };

    
    const AbrirModal = () =>  setOpen(true);
    
    const CerrarModal = () =>  setOpen(false);

   
    useEffect(() => {

        const ListarJefes = async () => {
          var rs = await axios.get('http://localhost:5000/api/usuario');
          setJefes(rs.data.map((V) => ({ USU_NOMBRE: V.USU_NOMBRE, COD_USUARIO: V.COD_USUARIO })));
        
        }
        ListarJefes();
    }, []);

    useEffect(() => {
        
        const ListarClientes = async () => {
          var rs = await axios.get('http://10.0.2.2:59987/api/clientes');
          setCleintes(rs.data.map((V) => ({ CARDCODE: V.CARDCODE, CARDNAME: V.CARDNAME })));
        
        }
        ListarClientes();
    }, []);


    useEffect(() => {
        const ListarProyectos = async () => {
            try {
                var rs = await axios.get('http://localhost:5000/api/proyecto');
                setProyectos(rs.data);
                setLoad(false);
            } catch (error) {
                console.log(error);
            }
        };
        ListarProyectos();
    },[]) 

    const ProcesoEliminacion = (ID) => {

        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado , no podrá recuperar este proyecto!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                EliminarProyecto(ID);
            } 
        });
      
    }

    const EliminarProyecto = async (ID) => {
        try {
            await axios.delete(`http://localhost:5000/api/proyecto/${ID}`);
            RecargarListado();
            swal("Poof! Proyecto Eliminado!", {
                icon: "success",
            });
        } catch (error) {
            console.log(error)
            swal("Error", "Error al eliminar proyecto", 'error', {
                button: "Aceptar!",
            });
        }
       
    }

    const RecargarListado = async () => {
       
        var rs = await axios.get('http://localhost:5000/api/proyecto');
        return setProyectos(rs.data);
       
    }

    const handleInputChange = async (event) => {
        setDataModificar({
            ...DataModificar,
            [event.target.name] : event.target.value    
        });
    };


    const [tareas , setTareas] = useState([])

  
    const VaciarTablaTareas = () => {
        setTareas([])
        setSubProyectoFiltro([])
    }
    const [SubProyectoFiltro , setSubProyectoFiltro] = useState([])

    const handleInputChangeTarea = async (COD_SUB_PROYECTO) => {

        try {
            var rs = await axios.get(`http://localhost:5000/api/tarea/${COD_SUB_PROYECTO}`);
            setTareas(rs.data);
        } catch (error) {
            console.log(error)
        }
 
      try {
        
        var rs_2 = await axios.get(`http://localhost:5000/api/subproyecto/filtro/${COD_SUB_PROYECTO}`);
        setSubProyectoFiltro(rs_2.data);
      } catch (error) {
          console.log(error);
      }
    };




    const [ModalTR , setModalTR] = useState(false);

    const [dataTR , setDataTR] = useState({
        COD_SUB_PROYECTO: '0' ,
        TAR_DESCRIPCION: '' ,
        TAR_HORAS_PLANIFICADAS:''  ,
        TAR_HORAS_IMPUTADAS:'' ,
        TAR_HORAS_ACTUALES:'' ,
        TAR_FECHA_INICIO_ESTIMADA: new Date()  ,
        TAR_FECHA_FIN_ESTIMADA: new Date()  ,
        TAR_ESTADO:'0'
    })
    

    const AbrirModalTR = (v) => {
        setDataTR(v);
        setModalTR(true);
    }

    const CerrarModalTR = () => {
        setModalTR(false);
    }


    const [asignacion , setAsignacion] = useState([]);
    const [ModalAS , setModalAS] = useState(false);
    

    const ListarAsignacion = async (COD_TAREA) => {
        try {
            const rs = await axios.get(`http://localhost:5000/api/Asignaciontarea/${COD_TAREA}`);
            setAsignacion(rs.data);
        } catch (error) {
            console.log('Error al listar asignacion');
        }
    }

    const [codSP , setCodSP] = useState(0)
    
    const AbrirModalAS = async (COD_TAREA,COD_SUB_PROYECTO) => {
        ListarAsignacion(COD_TAREA)
        setModalAS(true);
        setCodSP(COD_SUB_PROYECTO)

    }

    const CerrarModalAS = async () => {
        setModalAS(false);
    }

    const value = useMemo(() => {

        return ({

            Proyectos,
            RecargarListado,
            jefes,
            clientes,
            ProcesoEliminacion,
            open,
            AbrirModal,
            CerrarModal,
            DataModificar,
            setDataModificar,
            handleInputChange,
            ESTADO,
            SubProyectoModal,
            AbrirSubProyectoModal,
            CerrarSubProyectoModal,
            TextFieldStyles,
            BasicDataProyecto,
            SetBasicDataProyecto,
            DateToFechaSQL,
            SubProyectos,
            RecargarSubProyectos,
            AbrirModalSP,
            CerrarModalSp,
            ModalSP,
            dataSP,
            TIPO_SP,
            setDataSP,
            load,
            handleInputChangeTarea,
            tareas,
            VaciarTablaTareas,
            ModalTR,
            AbrirModalTR,
            CerrarModalTR,
            dataTR,
            setDataTR,
            ModalAS,
            AbrirModalAS,
            CerrarModalAS,
            ListarAsignacion,
            asignacion,
            modalRG,
            CerrarModalRG,
            AbrirModalRG,
            SubProyectoFiltro,
            codSP

        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Proyectos,RecargarListado, jefes, clientes,SubProyectos,tareas,asignacion,SubProyectoFiltro])         

    return <ProyectosContext.Provider value={value} {...props}/>

}

export function Context() {
    const context = React.useContext(ProyectosContext);
    if(!context){
        throw new Error('Debe estar dentro del contextoUsuario')
    }
    return context;
};
