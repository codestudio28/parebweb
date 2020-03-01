import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon,Row,Col } from 'antd';
import './index.css';
import HeadNav from './HeadNav';
import BreadCrumbs from './BreadCrumbs';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MemberSidePanel extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    render() {
     
      const gotoPage=(value)=>{
        if(value==="My Information"){
          window.open("/member-info","_self");
        }else if(value==="My Business Card"){
          window.open("/org-member","_self");
        }
      }
        return (
           <React.Fragment>
               
        <Sider  style={{
              backgroundColor:'#ffffff'
          }}>
          <Row>
            <Col span={24}
            style={{
                height:'12em',
                padding:'1em',
                backgroundColor:'#ffffff'
            }}
            >
                <img 
                style={{
                    width:'10em',
                    height:'10em'
                }}
                src="https://res.cloudinary.com/lipacity/image/upload/v1582290112/logo_dsxofa.png"/>
            </Col>
          </Row>
          <Menu style={{
              backgroundColor:'#ffffff'
          }} defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <i className="fa fa-tachometer-alt"></i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Dashboard</span>
                </span>
              }
            >
              
              <Menu.Item key="3" className="menu-side">Tom</Menu.Item>
              <Menu.Item key="4" className="menu-side">Bill</Menu.Item>
              <Menu.Item key="5" className="menu-side">Alex</Menu.Item>
            </SubMenu>
          
           
           
            {/* <SubMenu
              key="sub3"
              title={
                <span>
                  <i className="fa fa-newspaper">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;News</span>
                </span>
              }
            >
              <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("List of News")}>List of News</Menu.Item>
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("Removed News")}>Removed News</Menu.Item>
            </SubMenu> */}
            {/* <SubMenu
              key="sub4"
              title={
                <span>
                  <i className="fa fa-calendar-alt">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Events</span>
                </span>
              }
            >
              <Menu.Item key="3" className="menu-side">Tom</Menu.Item>
              <Menu.Item key="4" className="menu-side">Bill</Menu.Item>
              <Menu.Item key="5" className="menu-side">Alex</Menu.Item>
            </SubMenu> */}
           
            <SubMenu
              key="sub6"
              title={
                <span>
                  <i className="fa fa-user">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;My Account</span>
                </span>
              }
            >
             <Menu.Item key="2" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} 
              onClick={(event)=>gotoPage("My Information")}
              >My Information</Menu.Item>
             <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} 
              onClick={(event)=>gotoPage("My Business Card")}
              >My Business Card</Menu.Item>
             
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <i className="fa fa-gear">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Settings</span>
                </span>
              }
            >
             
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} >Change Password</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      
  
           </React.Fragment>
        );
    }
}

MemberSidePanel.propTypes = {

};

export default MemberSidePanel;