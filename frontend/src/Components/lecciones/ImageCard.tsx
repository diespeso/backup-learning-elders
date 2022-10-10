import React from "react";
import styled from "styled-components";

import { ImageCardContainer, ImageText } from './lib'

const StyledImage = styled.img`
    width: 80%;
    display: block;
    margin: auto;
`;

type Props = {
    text: string,
    src: string,
}

const ImageCard: React.FunctionComponent<Props> = ({text, src}) => {
    
    return (<ImageCardContainer>
        <StyledImage src={src}/>
        <ImageText>{text}</ImageText>
    </ImageCardContainer>)
}

export default ImageCard