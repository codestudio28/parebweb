import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb} from 'antd';
import './index.css';

class BreadCrumbs extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    render() {
        return (
           <React.Fragment>
               <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><span style={{fontFamily:'Open Sans,sans-serif'}}>You are here: {this.props.path}</span></Breadcrumb.Item>
                </Breadcrumb>
           </React.Fragment>
        );
    }
}

BreadCrumbs.propTypes = {

};

export default BreadCrumbs;