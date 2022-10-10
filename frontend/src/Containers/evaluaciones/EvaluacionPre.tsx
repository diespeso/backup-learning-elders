import React from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion } from "../../Components/evaluacion/lib";
import ImageCard from "../../Components/lecciones/ImageCard";

import { evaluacion_pre, postData } from "../../endpoints";

import { RootState, setRespuesta } from "../../Stores/store";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, redirect } from 'react-router-dom'

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


const EvaluacionPreForm: React.FunctionComponent<{}> = () => {

    const respuestaUno = useSelector((state: RootState) => state.evalPre.respuestaUno)
    const value = useSelector((state: RootState) => state.evalPre.value)
    const respuestas = useSelector((state: RootState) => state.evalPre.respuestas)
    const navigate = useNavigate()

    const dispatch = useDispatch();

    console.log('respuestas es', respuestaUno);
    console.log('value is', value);
    console.log('arrayr respuestas is', respuestas);

    const onSubmit = async (values: any) => {
        console.log('values: ', respuestas);
        const data = await postData(evaluacion_pre, { inner: 'testjsondata', respuestas })
    
        console.log('resp: ', data)
    }

    const handleQ1 = async (e: any) => {
        dispatch(setRespuesta({
            pregunta: 'Pregunta Numero Uno',
            respuesta: e.target.value,
        }))
    }

    const handleQ2 = async (e: any) => {
        dispatch(setRespuesta({
            pregunta: 'Pregunta Numero Dos',
            respuesta: e.target.value,
        }))
    }

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
                    <MultipleOptionQuestion options={questionOneOptions} onChange={handleQ1}>
                        <h3>Esta es una pregunta de prueba?</h3>
                        <ImageCard src="logo512.png" text="Alguna Imagen"/>
                    </MultipleOptionQuestion>

                    <MultipleOptionQuestion options={questionTwoOptions} onChange={handleQ2}>
                        <h3>Otra pregunta de prueba?</h3>
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