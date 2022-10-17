import styled from 'styled-components';
import { Form } from 'antd';

export const PaddedFormItem = styled(Form.Item)`
    padding-top: 20px;
`

export type Eleccion = { value: any, text: string };

export class Evaluation {
  contenido: [{ pregunta: string, elecciones?: Eleccion[] }?]

  constructor(contenido: [{ pregunta: string, elecciones?: Eleccion[] }?]) {
    this.contenido = contenido;
  }

  getByIndex(index: number): { pregunta: string, elecciones?: Eleccion[] } {
    return this.contenido[index]!
  }

  getByPregunta(pregunta: string): { pregunta: string, elecciones?: Eleccion[] } {
    return this.contenido.filter((cont) => cont?.pregunta === pregunta)[0]!
  }

  getAllPreguntas(): string[] {
    return this.contenido.map((cont) => cont!.pregunta)
  }

  getHandlerByIndex(setterStateFunc: any, dispatchFunc: any, setterRespuesta: any, initState: any):
    (index: any) => (e: any) => any {
    console.log('state', initState);
    return (index: number) => (e) => {
      setterStateFunc({ ...initState, [this.getByIndex(index).pregunta]: e.target.value })
      dispatchFunc(
        setterRespuesta({
          pregunta: this.getByIndex(index).pregunta,
          respuesta: e.target.value
        })
      )
    }
  }
}

export class EvaluationBuilder {
  contenido: [{ pregunta: string, elecciones?: Eleccion[] }?]
  currPregunta: string
  flagDisclosedFlux: boolean // must add pregunta and then respuestas or else will fail

  constructor() {
    this.contenido = []
    this.currPregunta = ''
    this.flagDisclosedFlux = true;
  }

  addPregunta = (pregunta: string) => {
    if (!this.flagDisclosedFlux) {
      throw new Error('tried to add pregunta when the last pregunta wasnt disclosed');
    }
    this.contenido.push({ pregunta })
    this.currPregunta = pregunta
    this.flagDisclosedFlux = false;
    return this;
  }

  setElecciones = (elecciones: Eleccion[]) => {
    if (this.flagDisclosedFlux) {
      throw new Error('tried to add eleccion when the last pregunta is already been disclosed');
    }
    const currObj = this.contenido.filter((contenido) => contenido?.pregunta === this.currPregunta);
    if (currObj) {
      elecciones.forEach((eleccion) => {
        if (!currObj[0]?.elecciones) {
          (currObj[0] ?? { elecciones }).elecciones = []; // most evil code ever
        }
        currObj[0]?.elecciones?.push(eleccion);
      })
    }

    return this;
  }

  disclosePregunta = () => {
    this.flagDisclosedFlux = true;
    return this;
  }

  build = (): Evaluation => {
    if (!this.flagDisclosedFlux) {
      throw new Error('cant build an undisclosed builder');
    }
    return new Evaluation(this.contenido);
  }
}


