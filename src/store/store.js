import { configureStore } from '@reduxjs/toolkit'
import registrosReducer from '../features/registrosSlice'
import actividadesReducer from '../features/actividadesSlice'

export const store = configureStore({
    reducer:{
        registros: registrosReducer,
        actividades: actividadesReducer
    }


})