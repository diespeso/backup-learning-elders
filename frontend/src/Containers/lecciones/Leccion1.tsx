import React from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";


const Leccion1: React.FunctionComponent<{}> = () => {
    return (<div>
        <Leccion title="Titulo Leccion">
            <Paragraph>Parrafo...</Paragraph>
            <br/>
            <Subtitle>Subtitulo</Subtitle>
            <ImageCard src="logo192.png" text="Imagen Importante"/>
        </Leccion>
    </div>)
}

export default Leccion1