import React from "react";
import { Button, Form, Input, Radio } from 'antd';
import styled from "styled-components";

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion } from "../../Components/evaluacion/lib";
import ImageCard from "../../Components/lecciones/ImageCard";

import { evaluacion_pre, postData } from "../../endpoints";

const PaddedFormItem = styled(Form.Item)`
    padding-top: 20px;
`

const questionOneOptions = [
    { text: 'optionAText', value: 'optionAValue' },
    { text: 'optionBText', value: 'optionBValue' },
]

const EvaluacionPreForm: React.FunctionComponent<{}> = () => {

    const onFinish = async (values: any) => {
        console.log('values: ', values);
        const data = await postData(evaluacion_pre, { inner: 'testjsondata', values })
        console.log('resp: ', data)
    }

    return (
        <div>
            <Form
                name="evaluacion-pre"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 9 }}
                initialValues={{ remember: true}}
                onFinish={onFinish}
            >
                <PaddedFormItem
                    label="Test Field"
                    name="test-field"
                >
                    <br></br>
                    <MultipleOptionQuestion options={questionOneOptions}>
                        <h3>Esta es una pregunta de prueba?</h3>
                        <ImageCard src="logo192.png" text="Alguna Imagen"/>
                    </MultipleOptionQuestion>
                    <Form.Item>
                        <Radio.Group onChange={(value) => {console.log('value here', value.target.value)}}>
                            <Radio value="testOne">Elige A</Radio>
                            <Radio value="testTwo">Elige B</Radio>
                        </Radio.Group>
                    </Form.Item>

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