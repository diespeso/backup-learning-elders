import React from "react";
import { Button, Form, Input } from 'antd';
import Evaluacion from "../../Components/evaluacion/Evaluacion";

import { evaluacion_pre, postData } from "../../endpoints";

const EvluacionPreForm: React.FunctionComponent<{}> = () => {

    const onFinish = (values: any) => {
        const data = postData(evaluacion_pre, { inner: 'testjsondata' })
        console.log(data);
    }

    return (
        <div>
            <Form
                name="evaluacion-pre"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 4 }}
                initialValues={{ remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Test Field"
                    name="test-field"
                >
                    <Input/>
                </Form.Item>
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
                <EvluacionPreForm/>
            </Evaluacion>
        </div>
    )
}

export default EvaluacionPre