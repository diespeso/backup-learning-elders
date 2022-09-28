import React from "react";

import { LeccionTitle, LeccionContainer,
    LeccionOuterContainer } from "../../Components/lecciones/lib";

type Props = {
    title: string,
    children: React.ReactNode
}

const Leccion: React.FunctionComponent<Props> = ({ title, children }) => {

    return (
        <div>
            <LeccionOuterContainer>
                <LeccionTitle>{title}</LeccionTitle>
                <LeccionContainer>
                    {children}
                </LeccionContainer>
            </LeccionOuterContainer>
        </div>
    )
}

export default Leccion