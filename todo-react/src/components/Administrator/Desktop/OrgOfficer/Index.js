import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button } from 'antd';
import '../../index.css';

import BreadCrumbs from '../../BreadCrumbs';
import HeadNav from '../../HeadNav';
import AdminFooter from '../../AdminFooter';
import AddRecord from './AddRecord';
import SearchHeader from './SearchHeader';
import RecordTable from './RecordTable';
import OrgSidePanel from '../../OrgSidePanel';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Index extends Component {
   
    render() {
        return (
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                   <OrgSidePanel/>
                    <Layout>
                        <HeadNav/>
                            <Content style={{ margin: '0 16px' }}>
                            <BreadCrumbs path="Officers / List of Officer" />
                            <div style={{ padding: 24, background: '#fff', minHeight: '50em' }}>
                                <Row>
                                    <AddRecord/>
                                    <SearchHeader/>
                                    <RecordTable/>
                                </Row>
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