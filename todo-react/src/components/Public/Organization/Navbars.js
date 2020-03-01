import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Menu } from 'antd';
import './navbar.css';
import { NavLink } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
class Navbars extends Component {
    render() {
       
        return (
            <React.Fragment>
                <Header style={{
                    backgroundColor: '#ffffff',
                    height: '8em',
                    fontFamily: 'Open Sans, sans-serif',
                    textTransform: 'uppercase'
                }}>
                    <Row>
                        <Col span={5} style={{ paddingLeft: '3em',paddingTop:'0.5em'}}>
                            <img src="https://res.cloudinary.com/lipacity/image/upload/v1582290112/logo_dsxofa.png"
                                style={{ width: '5em' }}
                            />
                        </Col>
                        <Col span={19} style={{ textAlign: 'left', paddingTop: '1.25em' }}>
                            <ul style={{
                                listStyleType: 'none',
                                margin: '0',
                                padding: '0',
                                overflow: 'hidden'
                            }}>
                                <NavLink to="/"><li style={{ float: 'left' }}>
                                    <a><div className="navi">
                                        Home
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/news"><li style={{ float: 'left' }}>
                                    <a><div className="navi">
                                        News
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/events"><li style={{ float: 'left' }}>
                                    <a><div className="navi" >
                                        Events
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/organization"><li style={{ float: 'left' }}>
                                    <a><div className="navi-active">
                                        Organization
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/officer">
                                <li style={{ float: 'left' }} >
                                    <a><div className="navi">
                                        Officers
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/courses">
                                <li style={{ float: 'left' }}>
                                    <a><div className="navi">
                                        Courses
                                   </div></a>
                                </li>
                                </NavLink>
                                <NavLink to="/about">
                                <li style={{ float: 'left' }} >
                                    <a><div className="navi">
                                        About Us
                                   </div></a>
                                </li>
                                </NavLink>
                            </ul>
                        </Col>
                    </Row>

                </Header>
            </React.Fragment>
        );
    }
}

Navbars.propTypes = {

};

export default Navbars;