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

export const ImageCard: React.FunctionComponent<Props> = ({ text, src }) => {

  return (<ImageCardContainer>
    <StyledImage src={src} />
    <ImageText>{text}</ImageText>
  </ImageCardContainer>)
}

type DuoProps = {
  srcLeft: string,
  srcRight: string,
  text?: string,
};

const DuoStyledImage = styled.img`
  background-color: #000000;
  width: 46%;
  margin: 2%;
`;

export const DuoImageCard: React.FunctionComponent<DuoProps> = (props: DuoProps) => {
  return (
    <ImageCardContainer>
      <DuoStyledImage src={props.srcLeft} />
      <DuoStyledImage src={props.srcRight} />
      <ImageText>{props.text}</ImageText>
    </ImageCardContainer>
  );
}
