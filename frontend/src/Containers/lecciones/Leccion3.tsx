import React, { useEffect } from "react";

import ImageCard from "../../Components/lecciones/ImageCard";
import Leccion from "../../Components/lecciones/Leccion";
import { Subtitle, Paragraph } from "../../Components/lecciones/lib";
import { postCurrentPage } from "../../endpoints";

const Leccion3: React.FunctionComponent<{}> = () => {

    useEffect(() => {
        const res = postCurrentPage('leccion-3')
    })

    return (<div>
        <Leccion title="Lección 3">
            <Subtitle>tercera lección</Subtitle>
            <Paragraph>
            Proin nec accumsan eros. Suspendisse volutpat aliquam ligula non luctus. Aenean suscipit in nulla quis maximus. Ut tempor arcu a velit euismod, vel convallis nisl bibendum. Suspendisse potenti. Nulla a gravida augue, sed venenatis lacus. Donec placerat elit purus, eget sodales arcu commodo in. Nullam ultricies velit orci, at ullamcorper orci lacinia non. Maecenas gravida ante a mauris egestas, sed fermentum mauris pulvinar. Ut posuere lectus lorem, vitae molestie orci sodales vitae. Aliquam scelerisque libero at aliquam suscipit. Etiam quis euismod orci, pharetra tempus magna. Aliquam consectetur mi vel enim imperdiet auctor.
            </Paragraph>

            <ImageCard src="logo512.png" text="imagen de prueba"></ImageCard>

            <Paragraph>
            Proin nec accumsan eros. Suspendisse volutpat aliquam ligula non luctus. Aenean suscipit in nulla quis maximus. Ut tempor arcu a velit euismod, vel convallis nisl bibendum. Suspendisse potenti. Nulla a gravida augue, sed venenatis lacus. Donec placerat elit purus, eget sodales arcu commodo in. Nullam ultricies velit orci, at ullamcorper orci lacinia non. Maecenas gravida ante a mauris egestas, sed fermentum mauris pulvinar. Ut posuere lectus lorem, vitae molestie orci sodales vitae. Aliquam scelerisque libero at aliquam suscipit. Etiam quis euismod orci, pharetra tempus magna. Aliquam consectetur mi vel enim imperdiet auctor.
            </Paragraph>
        </Leccion>
    </div>)
}

export default Leccion3