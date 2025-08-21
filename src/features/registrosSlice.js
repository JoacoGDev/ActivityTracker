import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    registros: []
}

export const registrosSlice = createSlice({
    name: 'registros',
    initialState,
    reducers: {
        guardarRegistros: (state, action) => {
            state.registros = action.payload;
        },
        eliminarRegistro: (state, action) => {
            state.registros = state.registros.filter(registro => registro.id !== action.payload);
        },
        agregarRegistro: (state, action) => {
            state.registros.push(action.payload);
        }
    }
})

export const selectTiempoTotal = state => {
    return state.registros.registros.reduce((acumulador, registro) => {
        const tiempo = Number(registro.tiempo);
        return acumulador + (isNaN(tiempo) ? 0 : tiempo);
    }, 0);
};

export const selectTiempoTotalDiario = state => {
    const hoy = new Date().toISOString().split("T")[0]; 

    return state.registros.registros
        .filter(registro => registro.fecha === hoy) 
        .reduce((acumulador, registro) => {
            const tiempo = Number(registro.tiempo);
            return acumulador + (isNaN(tiempo) ? 0 : tiempo);
        }, 0);
};

export const { guardarRegistros, eliminarRegistro, agregarRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;