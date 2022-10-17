import React, { useEffect, useState } from "react";
import { Button, Form, Radio } from 'antd';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// TODO: BINARY QUESTIONS STILL FAIL 
import Evaluacion from "../../Components/evaluacion/Evaluacion";
import { MultipleOptionQuestion, PlainTextQuestion, BinaryOptionQuestion } from "../../Components/evaluacion/lib";
import { ImageCard, DuoImageCard } from "../../Components/lecciones/ImageCard";

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
  .addPregunta('2. Es esta una noticia potencialmente falsa?')
  .setElecciones([
    { value: true, text: 'potencialmente verdadera' },
    { value: false, text: 'potencialmente falsa' },
  ])
  .disclosePregunta()
  .addPregunta('3. ¿Cuál es el símbolo que identifica a cuentas verificadas en la red social Twitter?')
  .setElecciones([ // TODO utilizar emojis?
    { value: 'Tacha Azul', text: 'Tacha Azul' },
    { value: 'Palomita Azul', text: 'Palomita Azul' },
    { value: 'Punto Rojo', text: 'Punto Rojo' },
    { value: 'Palomita Verde', text: 'Palomita Verde' },
  ])
  .disclosePregunta()
  .addPregunta('4. ¿Cuál de las siguientes es una fuente válida de información?')
  .setElecciones([
    { value: 'Comentario Facebook', text: 'Un comentario de Facebook' },
    { value: 'Mensaje Whatsapp', text: 'Un mensaje en un grupo de whatsapp' },
    { value: 'Video TikTok', text: 'Un video de TikTok' },
    { value: 'Ninguna', text: 'Ninguna de las anteriores' },
  ])
  .disclosePregunta()
  .addPregunta('5. ¿Cuál de estas características no ayudan a identificar un DeepFake?')
  .setElecciones([
    { value: 'ParPadeo Ocular', text: 'Parpadeo ocular' },
    { value: 'Duracion Video', text: 'Duración del video' },
    { value: 'Calidad Video', text: 'Calidad del video' },
    { value: 'Persona Implicada', text: 'Persona Implicada en el video' },
  ])
  .disclosePregunta()
  .addPregunta('6. ¿Cuál de las siguientes es una imagen falsa?')
  .setElecciones([
    { value: true, text: 'Izquierda' },
    { value: false, text: 'Derecha' },
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
    console.log('sending: ', preguntasObj);
    res.then((response) => {
      console.log('received: ', response.evaluationData);
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
        <PaddedFormItem wrapperCol={{ span: 9, offset: 2 }} >
          <br></br>
          <BinaryOptionQuestion
            onChange={masterHandler(1)}
            value={!!respuestasSeleccionadas[evaluation.getByIndex(1).pregunta]}
            texts={[
              evaluation.getByIndex(1)?.elecciones?.[0].text!,
              evaluation.getByIndex(1)?.elecciones?.[1].text!,
            ]}
          >
            <h3>{evaluation.getByIndex(1).pregunta}</h3>
            <CenteredParagraph>
              <i>"Científicos continúan trabajando en una vacuna para el coronavirus. Se espera que llege a finales de este año."</i>
              <br />
              <span>
                - Fuente: El Siglo de Torreón
              </span>
            </CenteredParagraph>
          </BinaryOptionQuestion>

          <BinaryOptionQuestion
            onChange={masterHandler(2)}
            value={!!respuestasSeleccionadas[evaluation.getByIndex(2).pregunta]}
            texts={[
              evaluation.getByIndex(2)?.elecciones?.[0].text!,
              evaluation.getByIndex(2)?.elecciones?.[1].text!,
            ]}
          >
            <h3>{evaluation.getByIndex(2).pregunta}</h3>
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

          <MultipleOptionQuestion
            options={evaluation.getByIndex(3).elecciones!}
            onChange={masterHandler(3)}
            value={respuestasSeleccionadas[evaluation.getByIndex(3).pregunta]}>
            <PlainTextQuestion>{evaluation.getByIndex(3).pregunta}</PlainTextQuestion>
          </MultipleOptionQuestion>

          <MultipleOptionQuestion
            onChange={masterHandler(4)}
            value={respuestasSeleccionadas[evaluation.getByIndex(4).pregunta]}
            options={evaluation.getByIndex(4).elecciones!}
          >
            <PlainTextQuestion>{evaluation.getByIndex(4).pregunta}</PlainTextQuestion>
          </MultipleOptionQuestion>
          <MultipleOptionQuestion
            onChange={masterHandler(5)}
            value={respuestasSeleccionadas[evaluation.getByIndex(5).pregunta]}
            options={evaluation.getByIndex(5).elecciones!}
          >
            <PlainTextQuestion>{evaluation.getByIndex(5).pregunta}</PlainTextQuestion>
          </MultipleOptionQuestion>

          <BinaryOptionQuestion
            onChange={masterHandler(5)}
            value={!!respuestasSeleccionadas[evaluation.getByIndex(5).pregunta]}
            texts={[
              evaluation.getByIndex(5)?.elecciones?.[0].text!,
              evaluation.getByIndex(5)?.elecciones?.[1].text!,
            ]}
          >
            <h3>{evaluation.getByIndex(5).pregunta}</h3>
            <DuoImageCard srcLeft="FAKE_IMAGE_LEFT.PNG" srcRight="FAKE_IMAGE_RIGHT.PNG" />
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
