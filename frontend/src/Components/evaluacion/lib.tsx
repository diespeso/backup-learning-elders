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
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 5px rgb(0, 0, 0, 0.05);
`

type Props = {
    options: { text: string, value: any }[],
    children?: React.ReactNode
}

export const MultipleOptionQuestion: React.FunctionComponent<Props> = (props: Props) => {

    return (
        <QuestionOuterContainer>
            {props.children}
            <Radio.Group>
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