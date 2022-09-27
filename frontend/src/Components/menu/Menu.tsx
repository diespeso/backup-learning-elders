import React, { useState } from 'react'
import { Menu as AntMenu, MenuProps } from 'antd'

type Props = {}

const Menu: React.FunctionComponent<Props> = () => {
    const [current, setCurrent ] = useState('leccion_1')

    const menuOnclick: MenuProps['onClick'] = e => {
        setCurrent(e.key)
    }

    return (<AntMenu onClick={menuOnclick}>
        <AntMenu.Item key="leccion_1">Leccion 1</AntMenu.Item>
        <AntMenu.Item key="leccion_2">Leccion 2</AntMenu.Item>
    </AntMenu>)
}

export default Menu;