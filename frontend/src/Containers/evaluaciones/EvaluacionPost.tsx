import React, { useEffect, useState } from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion, PlainTextQuestion, BinaryOptionQuestion } from "../../Components/evaluacion/lib";
import { ImageCard } from "../../Components/lecciones/ImageCard";

import { evaluacion_post, evaluacion_results, postData, getData } from "../../endpoints";
import { EvaluationBuilder, PaddedFormItem } from './lib';

import { RootState, evalPostActions } from "../../Stores/store";

const evaluationBuilder = new EvaluationBuilder();
const evaluation = evaluationBuilder
  .addPregunta('Esta es una pregunta de prueba?')
  .setElecciones([
    { text: 'optionAText', value: 'optionAValues' },
    { text: 'optionBText', value: 'optionBValues' },
  ])
  .disclosePregunta()
  .addPregunta('Esta es otra pregunta de prueba')
  .setElecciones([
    { text: 'optionBText', value: 'optionBValues' },
    { text: 'optionCText', value: 'optionCValues' },
  ])
  .disclosePregunta()
  .build();
console.log('this is builder', evaluation);

const EvaluationPostForm: React.FunctionComponent<{}> = () => {
  const respuestas = useSelector((state: RootState) => state.evalPost.respuestas)

  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<any>({});

  const dispatch = useDispatch();

  const masterHandler = evaluation.getHandlerByIndex(
    setRespuestasSeleccionadas,
    dispatch,
    evalPostActions.setRespuesta,
    respuestasSeleccionadas,
  );

  useEffect(() => {
    console.log(respuestas);
    const preguntasObj = {
      preguntas: evaluation.getAllPreguntas(),
    };
    const res = getData(evaluacion_results.post, preguntasObj);
    res.then((response) => {
      setRespuestasSeleccionadas(response.evaluationData ?? {})
    })
  });

  const onSubmit = async (values: any) => {
    console.log('respuestas de post', respuestas);
    const data = await postData(evaluacion_post, { inner: 'testjsondata', respuestas });

  };

  return (
    <div>
      <Form
        name="evaluacion-post"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 9 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <PaddedFormItem wrapperCol={{ span: 7, offset: 4 }}>
          <br /><br />
          <MultipleOptionQuestion
            options={evaluation.getByIndex(0).elecciones!}
            onChange={masterHandler(0)}
            value={respuestasSeleccionadas[evaluation.getByIndex(0).pregunta]}
          >
            <h3>{evaluation.getByIndex(0).pregunta}</h3>
            <ImageCard src="logo512.png" text="Alguna imagen" />
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

const EvaluationPost: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <Evaluacion title="Post Evaluación">
        <EvaluationPostForm />
      </Evaluacion>
    </div>
  )
}

export default EvaluationPost
