import React from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";

const Leccion2: React.FunctionComponent<{}> = () => {
    return (<div>
        <Leccion title="Lección 2">
            <Paragraph>Leccion 2</Paragraph>
        </Leccion>
    </div>)
}

export default Leccion2