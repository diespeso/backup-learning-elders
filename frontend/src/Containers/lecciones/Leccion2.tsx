import React from "react";
import ImageCard from "../../Components/lecciones/ImageCard";

import Leccion from "../../Components/lecciones/Leccion";

import { Subtitle, Paragraph } from "../../Components/lecciones/lib";

const Leccion2: React.FunctionComponent<{}> = () => {
    return (<div>
        <Leccion title="Lección 2">
            <Paragraph>Leccion 2</Paragraph>
            <Paragraph>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a risus vel augue semper elementum. Nulla convallis ante in nisl bibendum dignissim. Aliquam erat volutpat. Pellentesque ultricies ex nec nulla congue, nec tempor dui tempus. Vivamus euismod tortor purus, sed molestie dolor imperdiet tincidunt. Suspendisse in metus nec leo cursus mattis in commodo nulla. Nunc consectetur enim eget faucibus dignissim. Proin placerat vulputate nisi sit amet vehicula. In hac habitasse platea dictumst. Aliquam dapibus purus in metus finibus dictum. Quisque interdum dui sed mollis semper. Aliquam laoreet, turpis ac tincidunt accumsan, diam lorem lacinia leo, euismod feugiat ex ligula in ante. Cras vitae tortor eu purus pharetra auctor eu non justo. Nulla varius dictum sem quis suscipit.

Donec accumsan, mauris nec auctor tempor, dui ex facilisis turpis, at posuere quam felis in metus. Phasellus eu nisi ac leo imperdiet consequat et et augue. Donec gravida sit amet est nec aliquet. Nam ut metus nulla. Curabitur malesuada eleifend malesuada. Fusce ante tortor, eleifend vitae lectus vel, pulvinar auctor nulla. Curabitur vel eleifend tortor.
            <br></br>
            <Subtitle> Segunda parte de esta información</Subtitle>
Mauris a mauris vehicula, efficitur tortor non, condimentum turpis. Morbi et magna risus. Aenean aliquam semper dignissim. Suspendisse semper tellus nulla, non pulvinar sem bibendum quis. Nunc sodales fringilla nibh, ut faucibus magna volutpat eu. In mi tellus, mattis id vestibulum et, lobortis in risus. Aliquam sed turpis eget arcu malesuada imperdiet eu a felis. Pellentesque luctus, augue id blandit egestas, risus neque fermentum sapien, interdum venenatis nisi enim quis augue. Vivamus lectus arcu, fringilla eu interdum ut, fringilla in ligula. Duis ut efficitur neque. Donec vitae sem sit amet nulla lacinia vestibulum aliquam in lectus. Integer nec accumsan sem. Phasellus sagittis sem erat, sed venenatis eros sodales quis. Sed nec ex id lacus hendrerit fermentum. Donec suscipit tortor eget massa mattis finibus.
            </Paragraph>
        </Leccion>
    </div>)
}

export default Leccion2