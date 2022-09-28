import React from "react";

import { ImageCardContainer, ImageText } from './lib'

type Props = {
    text: string,
    src: string,
}

const ImageCard: React.FunctionComponent<Props> = ({text, src}) => {
    
    return (<ImageCardContainer>
        <img src={src}/>
        <ImageText>{text}</ImageText>
    </ImageCardContainer>)
}

export default ImageCard