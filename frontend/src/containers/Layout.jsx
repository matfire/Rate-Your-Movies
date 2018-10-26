import React from 'react'
import SearchBar from '../components/SearchBar'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
class DefaultLayout extends React.Component {

    render() {
        return(
            <Layout className="layout">
            <Header>
              <div className="logo">
                <h3 style={{color:"white"}}>Rate your Movies</h3>
              </div>

            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
             Rate your Movies ©2018 Created by Matteo Gassend
            </Footer>
          </Layout>
        )
    }
}


export default DefaultLayout
