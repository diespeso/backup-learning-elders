import React, { useEffect, useState } from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion, PlainTextQuestion, BinaryOptionQuestion } from "../../Components/evaluacion/lib";
import ImageCard from "../../Components/lecciones/ImageCard";

import { evaluacion_pre, evaluacion_results, postData, getData } from "../../endpoints";
import { EvaluationBuilder, PaddedFormItem } from './lib';

import { RootState, setRespuesta } from "../../Stores/store";
import { CenteredParagraph, Paragraph } from '../../Components/lecciones/lib';

const evaluationBuilder = new EvaluationBuilder();
const evaluation = evaluationBuilder
  .addPregunta('1. Es esta una noticia potencialmente falsa?')
  .setElecciones([
    { text: 'potencialmente verdadera', value: true },
    { text: 'potencialmente falsa', value: false },
  ])
  .disclosePregunta()
  .addPregunta('Pregunta No. 2')
  .setElecciones([
    { value: true, text: 'potencialmente verdadera' },
    { value: false, text: 'potencialmente falsa' },
  ])
  .disclosePregunta()
  .addPregunta('Pregunta No. 3 test')
  .setElecciones([
    { value: '32', text: 'ttt' },
    { value: '45', text: 'cuat' },
    { value: '50', text: 'cin' },
    { value: '100', text: 'sie' },
  ])
  .disclosePregunta()
  .addPregunta('es verdad esto?')
  .setElecciones([
    { value: true, text: 'verdadero' },
    { value: false, text: 'falso' },
  ])
  .disclosePregunta()
  .build();
console.log('this is builder', evaluation);

const EvaluacionPreForm: React.FunctionComponent<{}> = () => {
  const respuestas = useSelector((state: RootState) => state.evalPre.respuestas)

  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<any>({});

  const dispatch = useDispatch();

  const masterHandler = evaluation.getHandlerByIndex(
    setRespuestasSeleccionadas,
    dispatch,
    setRespuesta,
    respuestasSeleccionadas,
  );


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
  console.log('curr selec', respuestasSeleccionadas);

  return (
    <div>
      <Form
        name="evaluacion-pre"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 9 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <PaddedFormItem wrapperCol={{ span: 7, offset: 4 }} >
          <br></br>
          <BinaryOptionQuestion
            onChange={masterHandler(0)}
            value={respuestasSeleccionadas[evaluation.getByIndex(0).pregunta]}
            texts={[
              evaluation.getByIndex(0)?.elecciones?.[0].text!,
              evaluation.getByIndex(0)?.elecciones?.[1].text!,
            ]}
          >
            <h3>{evaluation.getByIndex(0).pregunta}</h3>
            <CenteredParagraph>
              <i>"Científicos continúan trabajando en una vacuna para el coronavirus. Se espera que llege a finales de este año."</i>
              <br />
              <span>
                - Fuente: El Siglo de Torreón
              </span>
            </CenteredParagraph>
          </BinaryOptionQuestion>

          <BinaryOptionQuestion
            onChange={masterHandler(1)}
            value={respuestasSeleccionadas[evaluation.getByIndex(1).pregunta]}
            texts={[
              evaluation.getByIndex(1)?.elecciones?.[0].text!,
              evaluation.getByIndex(1)?.elecciones?.[1].text!,
            ]}
          >
            <CenteredParagraph>
              <i>
                "Científicos encuentran la cura para el Covid 19: tómese una cucharada de miel con ibuprofeno molido en ayunas por 3 días."
              </i>
              <br />
              <span>
                - Fuente: Publicación en Facebook.com
              </span>
            </CenteredParagraph>
          </BinaryOptionQuestion>

          <MultipleOptionQuestion options={evaluation.getByIndex(2).elecciones!} onChange={masterHandler(2)} value={respuestasSeleccionadas[evaluation.getByIndex(2).pregunta]}>
            <PlainTextQuestion>{evaluation.getByIndex(2).pregunta}</PlainTextQuestion>
          </MultipleOptionQuestion>

          <BinaryOptionQuestion onChange={masterHandler(3)} value={!!respuestasSeleccionadas[evaluation.getByIndex(3).pregunta]}>
            <PlainTextQuestion>{evaluation.getByIndex(3).pregunta}</PlainTextQuestion>
          </BinaryOptionQuestion>
        </PaddedFormItem>


        <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div >
  )
}

const EvaluacionPre: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <Evaluacion title="Pre Evaluación">
        <EvaluacionPreForm />
      </Evaluacion>
    </div>
  )
}

export default EvaluacionPre
