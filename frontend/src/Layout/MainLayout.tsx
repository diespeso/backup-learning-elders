import React from 'react';
import { Layout } from 'antd';
import Menu from '../Components/menu/Menu';
import styled from 'styled-components';

const { Sider } = Layout;


type CommonLayoutProps = {
    children: React.ReactNode,
}

const DashboardLayout = styled(Layout)`
  min-height: 100vh;
`

const MainLayout: React.FunctionComponent<CommonLayoutProps> = ({ children }) => {
    return (<DashboardLayout>
      <Sider width={220}>
        <Menu />
      </Sider>
      <Layout>
        {children}
      </Layout>
    </DashboardLayout>)
}


export default MainLayout