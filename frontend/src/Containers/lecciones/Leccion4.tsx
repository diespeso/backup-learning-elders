import React from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";

const Leccion4: React.FunctionComponent<{}> = () => {
    return (<div>
        <Leccion title="Titulo Leccion">
            <Paragraph>
                leccion 4
            </Paragraph>
        </Leccion>
    </div>)
}

export default Leccion4