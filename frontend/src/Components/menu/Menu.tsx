import React, { useState } from 'react'
import { Menu as AntMenu, MenuProps } from 'antd'

import { Link } from 'react-router-dom';

type Props = {}

const Menu: React.FunctionComponent<Props> = () => {
    const [current, setCurrent ] = useState('leccion_1')

    const menuOnclick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    return (
        <AntMenu onClick={menuOnclick}>
            <AntMenu.Item key="evaluacion_pre"><Link to="/evaluacion-pre">Evaluación Inicial</Link></AntMenu.Item>
            <AntMenu.Item key="leccion_1"><Link to="/leccion-1">Lección 1</Link></AntMenu.Item>
            <AntMenu.Item key="leccion_2"><Link to="/leccion-2">Lección 2</Link></AntMenu.Item>
            <AntMenu.Item key="leccion_3"><Link to="/leccion-3">Lección 3</Link></AntMenu.Item>
            <AntMenu.Item key="leccion_4"><Link to="/leccion-4">Lección 4</Link></AntMenu.Item>
            <AntMenu.Item key="evaluacion_post"><Link to="/evaluacion-post">Evaluación Final</Link></AntMenu.Item>
        </AntMenu>
    )
}

export default Menu;