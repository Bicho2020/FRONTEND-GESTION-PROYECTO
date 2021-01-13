import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Context } from './Context'



const Filtro = () => {
    
    const {TextFieldStyles , handleInputChange , anios } = Context();

    const classes = TextFieldStyles();

    return (
        <div>
            <Autocomplete
            id="Anio"
            size="small"
            options={anios}
            onChange={(event, value) => {if(value) return handleInputChange(value.title)}}
            className={classes.textField}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField  {...params} label="Seleccione año" variant="outlined" />}
            />
        </div>
    );
};

export default Filtro;