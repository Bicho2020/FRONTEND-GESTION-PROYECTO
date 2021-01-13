import React from 'react';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {Context} from '../Context'

const InformacionTarea = () => {

    const {SubProyectoFiltro} = Context();

    return (
        SubProyectoFiltro.length !== 0 ? (

            <div>

                <Typography variant="h6" style={{color:'#00b3e4',fontWeight:500}} gutterBottom>
                    {SubProyectoFiltro[0].SPR_DESCRIPCION}  
                    </Typography>

                    <Divider/>

                    <br/>

                    <span style={{color:'black',fontSize:17}} >Proyecto:  {SubProyectoFiltro[0].PRO_NOMBRE}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Descripción:  {SubProyectoFiltro[0].SPR_NOMBRE}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Creación:  {SubProyectoFiltro[0].FECHA_CREACION}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Encargado:  {SubProyectoFiltro[0].ENCARGADO}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Tipo:  {SubProyectoFiltro[0].TSP_DESCRIPCION}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Fecha inicio estimada:  {SubProyectoFiltro[0].FECHA_INICIO_ESTIMADA}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Fecha fin estimada:  {SubProyectoFiltro[0].FECHA_FIN_ESTIMADA}</span>
                    <br/>
                    <span style={{color:'black',fontSize:17}} >Numero Mejora:  {SubProyectoFiltro[0].SPR_NRO_MEJORA}</span>

            </div>

            
        ) : (
            'Seleccione sub proyecto '
        )

    );
};

export default InformacionTarea;