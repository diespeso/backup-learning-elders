import React from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";

const Leccion1: React.FunctionComponent<{}> = () => {
    return (<div>
        <Leccion title="Título Lección">
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
            <br/>
            <Subtitle>Subtítulo</Subtitle>
            <ImageCard src="logo192.png" text="Imagen Importante"/>
        </Leccion>
    </div>)
}

export default Leccion1