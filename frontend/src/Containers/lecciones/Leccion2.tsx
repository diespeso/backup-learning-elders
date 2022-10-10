import React, { useEffect } from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";
import { postCurrentPage } from "../../endpoints";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";

const Leccion2: React.FunctionComponent<{}> = () => {

    useEffect(() => {
        const res = postCurrentPage('leccion-2')
    })

    return (<div>
        <Leccion title="Lección 2: Identificar una Noticia Falsa">
            <Subtitle> Definición de una noticia falsa </Subtitle>
            <Paragraph>
                Una noticia falsa es un hecho noticioso, artículo o nota que es presentada como verdadera, incluso si quien la presenta sabe que es falsa.

                <br/><br/>
                Un problema con las noticias falsas es su forma de propagación, debido a que propagan ignorancia y se propagan por medio de la ignorancia.

                <br/><br/>
                El objetivo de una noticia falsa es desinformar e influenciar el comportamiento del receptor de la noticia falsa.
                <br/><br/>
                Muchas veces las noticias falsas se originan de noticias verdaderas que han sido sacadas de contexto.
                <br/><br/>
                <Subtitle>Ejemplo de noticia falsa</Subtitle>
                <ImageCard src="EJEMPLO_FAKE_NEW_1.jpg" text="ejemplo de noticia falsa"/>
                <Subtitle>Ejemplo de noticias verdaderas convertidas a noticias falsas</Subtitle>
                <ul>
                    <li><b>Noticia en contexto: </b><i>"Estudios declaran que combinar alcohol con Pepto-Bismol podría ocasionar daño hepático."</i></li>
                    <li><b>Noticia fuera de contexto:</b> <i>"Estudios declaran que Pepto-Bismol podría ocasionar daño hepático."</i></li>
                </ul>

                TODO: MENCIONAR EN ESPECIFICO EL PAPEL DE LOS MEDIOS DIGITALES DENTRO DE LAS NOTICIAS FALSAS
                TODO: MENCIONAR EL CLICKBAIT COMO ORIGEN Y PRECURSOR DE NOTICIAS FALSAS
                {/*https://edem.eu/ejemplos-fake-news-y-noticias-falsas/*/}
                <Subtitle>Como Identificar una noticia falsa</Subtitle>

                <Subtitle>Como prevenir propagar una noticia falsa</Subtitle>

                </Paragraph>
        </Leccion>
    </div>)
}

export default Leccion2