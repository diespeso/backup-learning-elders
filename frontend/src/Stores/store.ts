import {
    configureStore, createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

type PreguntaRespuesta = { pregunta: string, respuesta: string}

interface EvalPreState {
    respuestaUno: string,
    value: number,
    respuestas: PreguntaRespuesta[],
}

const initialState: EvalPreState = {
    respuestaUno: 'initTest',
    value: 0,
    respuestas: []
}

const EvalPreSlice = createSlice({
    name: 'evalPre',
    initialState,
    reducers: {
        setRespuesta: (state, action: PayloadAction<PreguntaRespuesta>) => {
            const pregunta = action.payload.pregunta;
            const respuesta = action.payload.respuesta;
            const repetidos = state.respuestas.filter(
                (respuestaObj) => respuestaObj.pregunta === pregunta
            )
            if (repetidos.length === 0) { // no hay repetidos, pushear
                state.respuestas.push(action.payload)
            } else { // hay repetidos, reasignar, no pushear
                const index = state.respuestas.findIndex((respuestaObj) => respuestaObj.pregunta === pregunta)
                state.respuestas[index].respuesta = respuesta;
            }
        },
    }
})

export const { setRespuesta } = EvalPreSlice.actions

export const store = configureStore({
    reducer: {
        evalPre: EvalPreSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch