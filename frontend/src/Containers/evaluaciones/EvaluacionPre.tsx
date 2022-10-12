import React, { useEffect, useState } from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion, PlainTextQuestion } from "../../Components/evaluacion/lib";
import ImageCard from "../../Components/lecciones/ImageCard";

import { evaluacion_pre, evaluacion_results, postData, getData } from "../../endpoints";

import { RootState, setRespuesta } from "../../Stores/store";

type Eleccion = { value: any, text: string};

class Evaluation{
    contenido: [{pregunta: string, elecciones?: Eleccion[]}?]

    constructor(contenido: [{pregunta: string, elecciones?: Eleccion[]}?]) {
        this.contenido = contenido;
    }

    getByIndex(index: number): {pregunta: string, elecciones?: Eleccion[]} {
        return this.contenido[index]!
    }

    getByPregunta(pregunta: string): {pregunta: string, elecciones?: Eleccion[]} {
        return this.contenido.filter((cont) => cont?.pregunta === pregunta)[0]!
    }

    getAllPreguntas(): string[] {
        return this.contenido.map((cont) => cont!.pregunta)
    }

    getHandlers(setterStateFunc: any, dispatchFunc: any): (setterRespuesta: any, initState: any, e: any) => void { //debi haber regresado un handler que solo tome e, en su lugar
        // quizas sea mejor un builder
        return (setterRespuesta, initState, e) => {
            setterStateFunc({...initState, [this.getByIndex(0).pregunta]: e.target.value })
            dispatchFunc(
                setterRespuesta({
                    pregunta: this.getByIndex(0).pregunta,
                    respuesta: e.target.value
                })
            )
        }
    }
}

class EvaluationBuilder {
    contenido: [{pregunta: string, elecciones?: Eleccion[]}?]
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
        this.contenido.push({pregunta})
        this.currPregunta = pregunta
        this.flagDisclosedFlux = false;
        return this;
    }

    setElecciones = (elecciones: Eleccion[]) => {
        if(this.flagDisclosedFlux) {
            throw new Error('tried to add eleccion when the last pregunta is already been disclosed');
        }
        const currObj = this.contenido.filter((contenido) => contenido?.pregunta === this.currPregunta);
        if (currObj) {
            elecciones.forEach((eleccion) => {
                if (!currObj[0]?.elecciones) {
                    (currObj[0] ?? {elecciones}).elecciones = []; // most evil code ever
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

const evaluationBuilder = new EvaluationBuilder();
const evaluation = evaluationBuilder
    .addPregunta('Esta es una pregunta de prueba?')
        .setElecciones([
            { text: 'optionAText', value: 'optionAValue' },
            { text: 'optionBText', value: 'optionBValue' },
        ])
        .disclosePregunta()
    .addPregunta('Pregunta No. 2')
        .setElecciones([
            { value: 'uno', text: 'primero' },
            { value: 'dos', text: 'segundo' },
        ])
        .disclosePregunta()
    .addPregunta('Pregunta No. 3 test')
        .setElecciones([
            { value: '32', text: 'ttt' },
            { value: '45', text: 'cuat' },
            { value: '50', text: 'cin' },
            { value: '100', text: 'sie'},
        ])
        .disclosePregunta()
    .build();
console.log('this is builder', evaluation);

const PaddedFormItem = styled(Form.Item)`
    padding-top: 20px;
`

const EvaluacionPreForm: React.FunctionComponent<{}> = () => {
    const respuestas = useSelector((state: RootState) => state.evalPre.respuestas)

    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<any>({});

    const dispatch = useDispatch();

    const handler = evaluation.getHandlers(
        setRespuestasSeleccionadas,
        dispatch,
    );
    const handlerCalled = handler(setRespuesta, respuestasSeleccionadas, {});

    useEffect(() => {
        const preguntasObj = {
            preguntas: evaluation.getAllPreguntas(),
        };
        const res = getData(evaluacion_results.pre, preguntasObj);
        res.then((response) => {
            setRespuestasSeleccionadas(response.evaluationData ?? {});
        })
    }, []);

    console.log('seleccionadas', respuestasSeleccionadas);
    console.log('debug', respuestasSeleccionadas[evaluation.getByIndex(0).pregunta]);
    console.log('debug', respuestasSeleccionadas[evaluation.getByIndex(1).pregunta]);
    console.log('debug', respuestasSeleccionadas[evaluation.getByIndex(2).pregunta]);

    const onSubmit = async (values: any) => {
        const data = await postData(evaluacion_pre, { inner: 'testjsondata', respuestas })
    }

    const handleQ1 = async (e: any) => {
        setRespuestasSeleccionadas({ ...respuestasSeleccionadas ,[evaluation.getByIndex(0).pregunta]: e.target.value })
        dispatch(setRespuesta({
            pregunta: evaluation.getByIndex(0).pregunta,
            respuesta: e.target.value,
        }))
    }

    const handleQ2 = async (e: any) => {
        setRespuestasSeleccionadas({ ...respuestasSeleccionadas ,[evaluation.getByIndex(1).pregunta]: e.target.value })
        dispatch(setRespuesta({
            pregunta: evaluation.getByIndex(1).pregunta,
            respuesta: e.target.value,
        }))
    }

    const handleQ3 = async (e: any) => {
        setRespuestasSeleccionadas({ ...respuestasSeleccionadas, [evaluation.getByIndex(2).pregunta]: e.target.value })
        dispatch(setRespuesta({
            pregunta: evaluation.getByIndex(2).pregunta,
            respuesta: e.target.value,
        }))
    }
    console.log('curr selec', respuestasSeleccionadas);

    return (
        <div>
            <Form
                name="evaluacion-pre"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 9 }}
                initialValues={{ remember: true}}
                onFinish={onSubmit}
            >
                <PaddedFormItem wrapperCol={{ span: 7, offset: 4 }} >
                    <br></br>
                    <MultipleOptionQuestion options={evaluation.getByIndex(0).elecciones!} onChange={handleQ1} value={respuestasSeleccionadas[evaluation.getByIndex(0).pregunta]}>
                        <h3>{evaluation.getByIndex(0).pregunta}</h3>
                        <ImageCard src="logo512.png" text="Alguna Imagen"/>
                    </MultipleOptionQuestion>

                    <MultipleOptionQuestion options={evaluation.getByIndex(1).elecciones!} onChange={handleQ2} value={respuestasSeleccionadas[evaluation.getByIndex(1).pregunta]}>
                        <h3>{evaluation.getByIndex(1).pregunta}</h3>
                        <ImageCard src="logo512.png" text="Alguna Imagen"/>
                    </MultipleOptionQuestion>

                    <MultipleOptionQuestion options={evaluation.getByIndex(2).elecciones!} onChange={handleQ3} value= {respuestasSeleccionadas[evaluation.getByIndex(2).pregunta]}>
                        <PlainTextQuestion>{evaluation.getByIndex(2).pregunta}</PlainTextQuestion>
                    </MultipleOptionQuestion>
                </PaddedFormItem>
                <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const EvaluacionPre: React.FunctionComponent<{}> = () => {
    return (
        <div>
            <Evaluacion title="Pre Evaluación">
                <EvaluacionPreForm/>
            </Evaluacion>
        </div>
    )
}

export default EvaluacionPre