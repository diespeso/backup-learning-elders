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

interface EvalState {
    respuestas: PreguntaRespuesta[],
}

const initialState: EvalPreState = {
    respuestaUno: 'initTest',
    value: 0,
    respuestas: []
}

const postState: EvalState = {
    respuestas: [],
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
        }
    }
})

const EvalPostSlice = createSlice({
    name: 'evalPost',
    initialState: postState,
    reducers: {
        setRespuesta: (state, action: PayloadAction<PreguntaRespuesta>) => {
            const pregunta = action.payload.pregunta;
            const respuesta = action.payload.respuesta;
            const repetidos = state.respuestas.filter(
                (respuestaObj) => respuestaObj.pregunta === pregunta
            );
            if (repetidos.length === 0) {
                state.respuestas.push(action.payload);
            } else {
                const index = state.respuestas.findIndex((respuestaObj) => respuestaObj.pregunta === pregunta)
                state.respuestas[index].respuesta = respuesta;
            }
        }
    }
});

export const { setRespuesta } = EvalPreSlice.actions
export const evalPostActions = EvalPostSlice.actions;

export const store = configureStore({
    reducer: {
        evalPre: EvalPreSlice.reducer,
        evalPost: EvalPostSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
