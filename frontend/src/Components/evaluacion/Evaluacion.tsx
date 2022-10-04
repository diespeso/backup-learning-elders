import React from "react";

import {LeccionOuterContainer, LeccionContainer } from '../lecciones/lib';
import { EvaluacionOuterContainer } from "./lib";

import { EvaluacionTitle, EvaluacionContainer } from './lib'

type Props = {
    title: string,
    children: React.ReactNode,
}

const Evaluacion: React.FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div>
            <EvaluacionOuterContainer>
                <EvaluacionTitle>{title}</EvaluacionTitle>
                <EvaluacionContainer>
                    {children}
                </EvaluacionContainer>
            </EvaluacionOuterContainer>
        </div>
    )
}

export default Evaluacion;