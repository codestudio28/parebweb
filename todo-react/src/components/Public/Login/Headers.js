import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import styled from 'styled-components';
import { Layout,Row, Col } from 'antd';
import './index.css';
import Time from 'react-time';
const { Header, Footer, Sider, Content } = Layout;
class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {now: new Date()};
      }
    componentDidMount() {
        this.interval = setInterval(() => {
          this.setState({now: new Date});
          
        }, 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        var {now} = this.state;

        const gotoPage=()=>{
            window.open("login","_self");
        }

        return (
            <React.Fragment>
                <Layout>
                    <Header style={{backgroundColor:'#800000',
                                    height:'4.275em',
                                    fontFamily:'Open Sans, sans-serif'}}>
                        <Row>
                            <Col span={8} style={{textAlign:'center',paddingTop:'1.25em'}}>
                                <h4 style={{fontSize:'1.2em',color:'#ffffff'}}><Time value={now} format="MMMM DD YYYY / HH:mm:ss" /></h4>
                            </Col>
                            <Col span={8} style={{textAlign:'center'}}>
                                <Icon type="facebook" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                                <Icon type="twitter" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                                <Icon type="instagram" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                            </Col>
                            <Col span={8} style={{textAlign:'center',paddingTop:'1.25em'}}>
                                <a onClick={(event)=>gotoPage()}href="#" style={{
                                    textDecoration:'none'
                                }}><h4 style={{fontSize:'1.2em',color:'#ffffff'}}>Login</h4></a>
                            </Col>
                        </Row>
                    </Header>
                </Layout>
            </React.Fragment>
        );
    }
}

Headers.propTypes = {

};

export default Headers;