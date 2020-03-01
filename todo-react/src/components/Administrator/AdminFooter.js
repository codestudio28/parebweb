import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class AdminFooter extends Component {
    render() {
        return (
           <React.Fragment>
                <Footer style={{ 
                    textAlign: 'center',
                    backgroundColor:'#2a166f',
                    color:'#ffffff',
                    fontFamily:'Open Sans, sans-serif'
             }}>Code Cola Studio</Footer>
           </React.Fragment>
        );
    }
}

AdminFooter.propTypes = {

};

export default AdminFooter;