import React, { useEffect } from "react";

import { ImageCard } from "../../Components/lecciones/ImageCard";
import Leccion from "../../Components/lecciones/Leccion";
import { Subtitle, Paragraph } from "../../Components/lecciones/lib";
import { postCurrentPage } from "../../endpoints";

const Leccion4: React.FunctionComponent<{}> = () => {

  useEffect(() => {
    const res = postCurrentPage('leccion-4')
  })

  return (<div>
    <Leccion title="Titulo Leccion">
      <Paragraph>
        leccion 4
      </Paragraph>
    </Leccion>
  </div>)
}

export default Leccion4
