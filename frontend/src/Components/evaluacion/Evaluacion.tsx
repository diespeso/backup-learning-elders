import React from "react";

import {LeccionOuterContainer, LeccionContainer } from '../lecciones/lib';

import { EvaluacionTitle } from './lib'

type Props = {
    title: string,
    children: React.ReactNode,
}

const Evaluacion: React.FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div>
            <LeccionOuterContainer>
                <EvaluacionTitle>{title}</EvaluacionTitle>
                <LeccionContainer>
                    {children}
                </LeccionContainer>
            </LeccionOuterContainer>
        </div>
    )
}

export default Evaluacion;