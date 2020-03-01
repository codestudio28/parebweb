import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import './index.css';
import Desktop from './Desktop/Dashboard/Index';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0,
            collapsed: false
        }
    }

   
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    render() {
        const gotoAdmin=()=>{
            window.open("/admin-dashboard","_self");
        }
        var { sizes } = this.state;
        return (
            <React.Fragment>
                {sizes==0 &&
                    gotoAdmin()
                }
                
            </React.Fragment>
        );
    }
}

Index.propTypes = {

};

export default Index;