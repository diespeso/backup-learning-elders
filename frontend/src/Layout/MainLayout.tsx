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

const StyledSider = styled(Sider)`
  background-color: #02928E;
  border-radius: 0px 0px 10px;
`

const MainLayout: React.FunctionComponent<CommonLayoutProps> = ({ children }) => {
    return (<DashboardLayout>
      <StyledSider width={360} >
        <Menu />
      </StyledSider>
      <Layout>
        {children}
      </Layout>
    </DashboardLayout>)
}


export default MainLayout