import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Menu } from 'antd';
import './navbar.css';
const { Header, Footer, Sider, Content } = Layout;
class Navbars extends Component {
    render() {
        const gotoPage = (value) => {
           if(value=="Home"){
                window.open("/","_self");
           }else  if(value=="News"){
            window.open("/news","_self");
           }else  if(value=="Events"){
            window.open("/events","_self");
           }else  if(value=="Government"){
            window.open("/government","_self");
           }else  if(value=="Services"){
            window.open("/services","_self");
           }else  if(value=="Directory"){
            window.open("/directory","_self");
           }
        }
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
                                <li style={{ float: 'left' }}>
                                    <a><div className="navi-active" onClick={(event)=>gotoPage("Home")}>
                                        Home
                                   </div></a>
                                </li>
                                <li style={{ float: 'left' }}>
                                    <a><div className="navi"  onClick={(event)=>gotoPage("News")}>
                                        News
                                   </div></a>
                                </li>
                                <li style={{ float: 'left' }}>
                                    <a><div className="navi"  onClick={(event)=>gotoPage("Events")}>
                                        Events
                                   </div></a>
                                </li>
                                <li style={{ float: 'left' }}  onClick={(event)=>gotoPage("Government")}>
                                    <a><div className="navi">
                                        Officers
                                   </div></a>
                                </li>
                                <li style={{ float: 'left' }}  onClick={(event)=>gotoPage("Services")}>
                                    <a><div className="navi">
                                        Courses
                                   </div></a>
                                </li>
                                <li style={{ float: 'left' }}  onClick={(event)=>gotoPage("Directory")}>
                                    <a><div className="navi">
                                        About Us
                                   </div></a>
                                </li>
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