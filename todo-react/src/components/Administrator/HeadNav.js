import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb,Dropdown, Icon, Row, Col, Badge, Avatar } from 'antd';
import './index.css';
import { reactLocalStorage } from 'reactjs-localstorage';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class HeadNav extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const menu = (
      <Menu style={{
        width:'10em',
        fontFamily:'Open Sans,sans-serif'

      }}>
        <Menu.Item key="0" 
        onClick={(event)=>gotoWebsite()}
        >
          View Website
        </Menu.Item>
        <Menu.Item key="3" 
        >
         My Account
        </Menu.Item>
        <Menu.Item key="1">
          Change Password
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
  const gotoWebsite=()=>{
    window.open("/","_self");
     
  }
   

    
    return (
      <React.Fragment>
        <Header style={{ background: '#2a166f ', padding: 0 }} >
          <Row>
            <Col span={24}>
              <Row>
                <Col span={20}></Col>
                <Col span={4} style={{
                  paddingTop: '0.5em'
                }}>
                  <Row>
                    <Col span={8}>
                   
                      <a href="#" style={{
                        textDecoration: 'none'
                      }}><span>
                          <Badge count={0} style={{
                            width: '0.5em'
                          }}>
                            < i className="fa fa-globe" style={{
                              color: '#ffffff',
                              fontSize: '1.75em'
                            }}></i>
                          </Badge>
                        
                        </span>
                      </a>
                    
                    </Col>
                   
                    <Col span={8}>
                  
                      <a href="#" style={{
                        textDecoration: 'none'
                      }}><span>
                          <Badge count={5} style={{
                            width: '0.5em'
                          }}>
                            < i className="fa fa-users" style={{
                              color: '#ffffff',
                              fontSize: '1.75em'
                            }}></i>
                          </Badge>
                       
                        </span>
                      </a>
                     
                    </Col>
                    <Col span={8}>
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
                  </Row>

                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </React.Fragment>
    );
  }
}

HeadNav.propTypes = {

};

export default HeadNav;