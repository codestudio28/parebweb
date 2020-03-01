import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button } from 'antd';
import '../../index.css';

import BreadCrumbs from '../../BreadCrumbs';
import SidePanel from '../../SidePanel';
import HeadNav from '../../HeadNav';
import AdminFooter from '../../AdminFooter';
import AddRecord from './AddRecord';
import SearchHeader from './SearchHeader';
import RecordTable from './RecordTable';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import StepGuide from './StepGuide';
import CreateNews from './CreateNews';
import UploadBanner from './UploadBanner';
import PreviewContent from './PreviewContent';
import Finished from './Finished';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@inject('TodoStore')
@observer
class Index extends Component {
   
    render() {
        const TodoStore = this.props.TodoStore;
        return (
            <React.Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <SidePanel />
                    <Layout>
                        <HeadNav/>
                            <Content style={{ margin: '0 16px' }}>
                            <BreadCrumbs path="News / Removed News" />
                            <div style={{ padding: 24, background: '#fff', minHeight: '50em' }}>
                                <Row>
                                   
                                        <React.Fragment>
                                            <SearchHeader/>
                                            <RecordTable/>
                                        </React.Fragment>
                                 
                                   
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