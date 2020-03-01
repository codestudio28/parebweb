import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import '../../index.css';

import BreadCrumbs from '../../BreadCrumbs';
import SidePanel from '../../SidePanel';
import HeadNav from '../../HeadNav';
import AdminFooter from '../../AdminFooter';
import { reactLocalStorage } from 'reactjs-localstorage';
import OrgSidePanel from '../../OrgSidePanel';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Index extends Component {
   
    render() {
        const gotoAccount=()=>{
            if(reactLocalStorage.get('usertype')==="administrator"){
                return(
                 <SidePanel />
                )
            }else if(reactLocalStorage.get('usertype')==="organization"){
                return(
                    <OrgSidePanel/>
                
                )
            }
        }
        return (
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                  
                    {gotoAccount()}
                    <Layout>
                        <HeadNav/>
                        <Content style={{ margin: '0 16px' }}>
                            <BreadCrumbs path="Dashboard" />
                            <div style={{ padding: 24, background: '#fff', minHeight: '50em' }}>

                            </div>
                        </Content>
                       <AdminFooter/>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}

Index.propTypes = {

};

export default Index;