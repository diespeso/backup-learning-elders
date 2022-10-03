import React, { useState } from 'react'
import { Menu as AntMenu, MenuProps } from 'antd'
import styled from 'styled-components';

import { Link } from 'react-router-dom';

type Props = {}

const StyledMenuItem = styled(AntMenu.Item)`
    font-size: 2em;
    &:hover {
        background-color: #cccccc;
    }
`

const Menu: React.FunctionComponent<Props> = () => {
    const [current, setCurrent ] = useState('leccion_1')

    const menuOnclick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    return (
        <AntMenu onClick={menuOnclick}>
            <StyledMenuItem key="evaluacion_pre"><Link to="/evaluacion-pre">Evaluación Inicial</Link></StyledMenuItem>
            <StyledMenuItem key="leccion_1"><Link to="/leccion-1">Lección 1</Link></StyledMenuItem>
            <StyledMenuItem key="leccion_2"><Link to="/leccion-2">Lección 2</Link></StyledMenuItem>
            <StyledMenuItem key="leccion_3"><Link to="/leccion-3">Lección 3</Link></StyledMenuItem>
            <StyledMenuItem key="leccion_4"><Link to="/leccion-4">Lección 4</Link></StyledMenuItem>
            <StyledMenuItem key="evaluacion_post"><Link to="/evaluacion-post">Evaluación Final</Link></StyledMenuItem>
        </AntMenu>
    )
}

export default Menu;