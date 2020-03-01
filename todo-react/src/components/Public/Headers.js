import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification,Menu,Dropdown,Avatar } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import styled from 'styled-components';
import { Layout,Row, Col } from 'antd';
import './index.css';
import Time from 'react-time';
import { NavLink } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
var links='';
class Headers extends Component {
    constructor(props) {
        super(props);
        this.state = {now: new Date(),login:false};
      }
    componentDidMount() {

       if(reactLocalStorage.get('usertype')==="administrator"){
          links="/admin-dashboard";
       }else if(reactLocalStorage.get('usertype')==="organization"){
          links="/org-dashboard";
      }else if(reactLocalStorage.get('usertype')==="member"){
        links="/member-dashboard";
    }

        this.interval = setInterval(() => {
          this.setState({now: new Date,login:false});
        if(reactLocalStorage.get("userid")===undefined){
            this.setState({login:false});
        }else{
            this.setState({login:true});
        }
        }, 10000);
        if(reactLocalStorage.get("userid")===undefined){
            this.setState({login:false});
        }else{
            this.setState({login:true});
        }
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        var {now,login} = this.state;

        const menu = (
            <Menu style={{
              width:'10em',
              fontFamily:'Open Sans,sans-serif'
      
            }}>
              <Menu.Item key="0" 
              
              >
              <NavLink to={links}>Dashboard</NavLink>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2"
                onClick={(event)=>gotoLogout()}
              >Logout</Menu.Item>
            </Menu>
          );
        const gotoLogout=()=>{
            reactLocalStorage.clear();
            window.open("/","_self");
        }
        const gotoAccount=()=>{
           if(reactLocalStorage.get("usertype")==="administrator"){
            window.open("admin-dashboard","_self");
           }
           
        }
        const gotoPage=()=>{
            window.open("login","_self");
        }

        return (
            <React.Fragment>
                <Layout>
                    <Header style={{backgroundColor:'#2a166f',
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
                            {!login &&
                                     <Col span={8} style={{textAlign:'center',paddingTop:'1.25em'}}>
                                     <a onClick={(event)=>gotoPage()}href="#" style={{
                                        textDecoration:'none'
                                    }}><h4 style={{fontSize:'1.2em',color:'#ffffff'}}>Login</h4></a>
                                    </Col>
                                }

                                {login &&
                                    <Col span={8} style={{textAlign:'center',paddingTop:'0.75em'}}>
                                     <Dropdown overlay={menu} trigger={['click']} 
                                     style={{width:'10em'}}
                                   >
                                     <a href="#" style={{
                                       textDecoration: 'none'
                                     }}><span>
                                        <Avatar 
                                        style={{
                                          width:'3em',
                                          height:'3em',
                                          marginTop:'-1em'
                                        }}
                                        src={reactLocalStorage.get("userprofile")} />
                                         &nbsp;
                                              < i className="fa fa-sort-down" style={{
                                           color: '#ffffff',
                                           fontSize: '1em'
                                         }}></i>
                                       </span>
                                     </a>
                                     </Dropdown>
                                     </Col>
                                }
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