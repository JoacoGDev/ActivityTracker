import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    actividades: []
}

export const actividadesSlice = createSlice({
    name: 'actividades',
    initialState,
    reducers: {
        guardarActividades: (state, action) => {
            const nuevasActividades = action.payload.filter(nuevo =>
                !state.actividades.some(actividad => actividad.id === nuevo.id) 
            );
            state.actividades = [...state.actividades, ...nuevasActividades]; 

        }
        
    }
})

export const { guardarActividades } = actividadesSlice.actions;
export default actividadesSlice.reducer;