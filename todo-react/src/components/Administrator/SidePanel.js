import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon,Row,Col } from 'antd';
import './index.css';
import HeadNav from './HeadNav';
import BreadCrumbs from './BreadCrumbs';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SidePanel extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    render() {
      const gotoPage=(value)=>{
          if(value=="List of Administrator"){
              window.open("admin-list-admin","_self");
          }else if(value=="Removed Administrator"){
            window.open("admin-removed-admin","_self");
          }else if(value=="List of Members"){
            window.open("admin-list-member","_self");
          }else if(value=="Removed Members"){
            window.open("admin-removed-member","_self");
          }else if(value=="List of Organization"){
            window.open("admin-list-organization","_self");
          }else if(value=="Removed Organization"){
            window.open("admin-removed-organization","_self");
          }else if(value=="List of News"){
            window.open("admin-news","_self");
          }else if(value=="Removed News"){
            window.open("admin-news-removed","_self");
          }else if(value=="List of Events"){
            window.open("admin-events","_self");
          }else if(value=="Removed Events"){
            window.open("admin-events-removed","_self");
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
              {/* <Menu.Item key="3" className="menu-side">Tom</Menu.Item>
              <Menu.Item key="4" className="menu-side">Bill</Menu.Item>
              <Menu.Item key="5" className="menu-side">Alex</Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                   <i className="fa fa-user-tie">

                    </i>        
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Administrator</span>
                </span>
              }
            >
              <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("List of Administrator")}>List of Administrator</Menu.Item>
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("Removed Administrator")}>Removed Administrator</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub8"
              title={
                <span>
                   <i className="fa fa-user">

                    </i>        
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Member</span>
                </span>
              }
            >
           <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("List of Members")}>List of Members</Menu.Item>
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("Removed Members")}>Removed Members</Menu.Item>
            </SubMenu>
           
            <SubMenu
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
            </SubMenu>
            <SubMenu
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
               <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("List of Events")}>List of Events</Menu.Item>
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("Removed Events")}>Removed Events</Menu.Item>
            </SubMenu>
          
           
            <SubMenu
              key="sub6"
              title={
                <span>
                  <i className="fa fa-boxes">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Officers</span>
                </span>
              }
            >
              <Menu.Item key="3" className="menu-side">Tom</Menu.Item>
              <Menu.Item key="4" className="menu-side">Bill</Menu.Item>
              <Menu.Item key="5" className="menu-side">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <i className="fa fa-address-book">

                  </i>
                  <span style={{
                      fontFamily:'Open Sans, sans-serif'
                  }}>&nbsp;&nbsp;&nbsp;Organizations</span>
                </span>
              }
            >
              <Menu.Item key="3" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("List of Organization")}>List of Organization</Menu.Item>
              <Menu.Item key="4" className="menu-side" style={{
                fontFamily:'Open Sans, sans-serif'
              }} onClick={(event)=>gotoPage("Removed Organization")}>Removed Organization</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      
  
           </React.Fragment>
        );
    }
}

SidePanel.propTypes = {

};

export default SidePanel;