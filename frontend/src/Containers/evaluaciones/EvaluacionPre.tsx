import React, { useEffect, useState } from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, redirect } from 'react-router-dom'

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion } from "../../Components/evaluacion/lib";
import ImageCard from "../../Components/lecciones/ImageCard";

import { evaluacion_pre, evaluacion_results, postData, getData } from "../../endpoints";

import { RootState, setRespuesta } from "../../Stores/store";

const PaddedFormItem = styled(Form.Item)`
    padding-top: 20px;
`

const questionOneOptions = [
    { text: 'optionAText', value: 'optionAValue' },
    { text: 'optionBText', value: 'optionBValue' },
]

const questionTwoOptions = [
    { text: 'chooseA', value: 'A' },
    { text: 'chooseB', value: 'B' },
    { text: 'chooseC', value: 'C' },
    { text: 'chooseD', value: 'D' },
]

const preguntas = [
    'nopregunta,id',
    'Esta es una pregunta de prueba?',
    'Otra pregunta de prueba, la segunda?',
]


const EvaluacionPreForm: React.FunctionComponent<{}> = () => {

    const respuestaUno = useSelector((state: RootState) => state.evalPre.respuestaUno)
    const value = useSelector((state: RootState) => state.evalPre.value)
    const respuestas = useSelector((state: RootState) => state.evalPre.respuestas)
    const navigate = useNavigate()

    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<any>({});

    const dispatch = useDispatch();

    console.log('respuestas es', respuestaUno);
    console.log('value is', value);
    console.log('array respuestas is', respuestas);

    useEffect(() => {
        const preguntasObj = {
            preguntas,
        };
        console.log('preguntasObj', preguntasObj);
        const res = getData(evaluacion_results.pre, preguntasObj);
        res.then((response) => {
            console.log(response);
            setRespuestasSeleccionadas(response.evaluationData ?? {});
        })
    }, []);

    console.log('seleccionadas', respuestasSeleccionadas);

    const onSubmit = async (values: any) => {
        console.log('values: ', respuestas);
        const data = await postData(evaluacion_pre, { inner: 'testjsondata', respuestas })
    
        console.log('resp: ', data)
    }

    const handleQ1 = async (e: any) => {
        setRespuestasSeleccionadas({ ...respuestasSeleccionadas ,[preguntas[1]]: e.target.value })
        dispatch(setRespuesta({
            pregunta: 'Pregunta Numero Uno',
            respuesta: e.target.value,
        }))
    }

    const handleQ2 = async (e: any) => {
        setRespuestasSeleccionadas({ ...respuestasSeleccionadas ,[preguntas[2]]: e.target.value })
        dispatch(setRespuesta({
            pregunta: 'Pregunta Numero Dos',
            respuesta: e.target.value,
        }))
    }

    //test
    console.log(respuestasSeleccionadas[preguntas[1]]);

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
                    <MultipleOptionQuestion options={questionOneOptions} onChange={handleQ1} value={respuestasSeleccionadas[preguntas[1]]}>
                        <h3>{preguntas[0]}</h3>
                        <ImageCard src="logo512.png" text="Alguna Imagen"/>
                    </MultipleOptionQuestion>

                    <MultipleOptionQuestion options={questionTwoOptions} onChange={handleQ2} value={respuestasSeleccionadas[preguntas[2]]}>
                        <h3>{preguntas[1]}</h3>
                        <ImageCard src="logo512.png" text="Alguna Imagen"/>
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