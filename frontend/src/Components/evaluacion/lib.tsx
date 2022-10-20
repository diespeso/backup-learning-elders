import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

//make components and export them
export const EvaluacionTitle = styled.h1`
    background-color: #a9cef4;
    font-size: 2.7em;
`

export const EvaluacionOuterContainer = styled.div`
    background-color: whitesmoke;
    margin-left: 5%;    
`

export const EvaluacionContainer = styled.div`
    background-color: #dcecfc;
    padding-bottom: 20px;
`

export const QuestionOuterContainer = styled.div`
    background-color: #eeeeee;
    width: 230%;
    padding-top: 2vh;
    padding-bottom: 5vh;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 5px rgb(0, 0, 0, 0.05);
`

export const PlainTextQuestion = styled.h3`
    font-size: 4em;
`
/*
export const RadioBinaryTrue = styled(Radio)`
    background-color: #ff0000;
`
*/
type Props = {
  options: { text: string, value: any }[],
  children?: React.ReactNode,
  onChange?: any, // arrowfunction for onchange handling, dont know the typing
  value?: any,
}

export const MultipleOptionQuestion: React.FunctionComponent<Props> = (props: Props) => {

  return (
    <QuestionOuterContainer>
      {props.children}
      <Radio.Group onChange={props.onChange} value={props.value}>
        {
          props.options.map((option, i) => (
            <Radio value={option.value} key={i}>
              {option.text}
            </Radio>
          ))
        }
      </Radio.Group>
    </QuestionOuterContainer>
  )
}

type BQProps = {
  trueOption: string,
  falseOption: string
  children?: React.ReactNode,
  onChange?: any, // arrowfunction for onchange handling, dont know the typing
}

type RBProps = {
  value: boolean,
  text: string,
  onchange?: any,
}

const RadioStyledTrue = styled(Radio)`
    background-color: #aaffaa;
    border-radius: 5px 5px 5px;
    padding: 3px;
`

const RadioStyledFalse = styled(Radio)`
    background-color: #ffaaaa;
    border-radius: 5px 5px 5px;
    padding: 3px;
`

export const RadioBinary: React.FunctionComponent<RBProps> = (props: RBProps) => {
  if (props.value) {
    return (<RadioStyledTrue value={props.value}>
      {props.text}
    </RadioStyledTrue>)
  }
  return (<RadioStyledFalse value={props.value}>
    {props.text}
  </RadioStyledFalse>)
}

type BOQProps = {
  children?: React.ReactNode,
  onChange?: any,
  value?: any,
  texts?: [string, string],
};

export const BinaryOptionQuestion: React.FunctionComponent<BOQProps> = (props: BOQProps) => { //bad props type
  return (
    <QuestionOuterContainer>
      {props.children}
      <Radio.Group onChange={props.onChange} value={props.value}>
        <RadioBinary value={true} text={props.texts?.[0] ?? "verdadero"} />
        <RadioBinary value={false} text={props.texts?.[1] ?? "falso"} />
      </Radio.Group>
    </QuestionOuterContainer>
  )
}

type MLProps = {
  options: { text: string, value: any }[],
  children?: React.ReactNode,
  onChange?: any,
  value?: any,
};

const OneLinerRadio = styled(Radio)`
  display: block;
  border-radius: 5px 5px 5px;
  padding: 3px;
  margin: 4px;
`;

export const MultiLineOptionQuestion: React.FunctionComponent<MLProps> = (props: MLProps) => {
  return (
    <QuestionOuterContainer>
      {props.children}
      <Radio.Group onChange={props.onChange} value={props.value}>
        {
          props.options.map((option, i) => (
            <OneLinerRadio value={option.value} key={i}>
              {option.text}
            </OneLinerRadio>
          ))
        }
      </Radio.Group>
    </QuestionOuterContainer>
  )
}
