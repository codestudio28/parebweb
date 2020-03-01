import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Pagination, Avatar, Comment, Form, Button, List, Input, Tooltip } from 'antd';
import News from './News';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
class SidePanelEvent extends Component {
    render() {
        return (
            <React.Fragment>
                <Col span={24} style={{
                    minHeight: '1em',
                    height: 'auto',
                    borderBottom: '1.5px solid',
                    borderColor: '#bfbfbf'

                }}>

                    <Row>
                        <Col span={4} style={{
                            minHeight: '3em',
                            height: 'auto',
                            paddingTop: '0.5em',
                            textAlign: 'center'
                        }}>
                            <Avatar src={this.props.profile}
                                style={{
                                    width: '2.5em',
                                    height: '2.5em'
                                }}></Avatar>
                        </Col>
                        <Col span={20} style={{
                            minHeight: '3em',
                            height: 'auto'

                        }}>
                            <Row>
                                <Col span={24} style={{
                                    minHeight: '2em',
                                    height: 'auto',
                                    paddingTop: '0.3em'
                                }}>
                                    <NavLink to={this.props.link}><h4 style={{
                                        fontSize: '1em',
                                        fontFamily: 'Open Sans, sans-serif'
                                    }}>
                                       {this.props.title}
                                            </h4></NavLink>
                                </Col>
                                <Col span={12} style={{
                                    minHeight: '1em',
                                    height: 'auto',
                                    textAlign: 'right'
                                }}>
                                    <h4 style={{
                                        fontSize: '0.75em',
                                        fontFamily: 'Open Sans, sans-serif'
                                    }}>
                                       {this.props.dates}
                                    </h4>
                                </Col>
                                <Col span={12} style={{
                                    minHeight: '1em',
                                    height: 'auto',
                                    textAlign: 'right'
                                }}>
                                    <h4 style={{
                                        fontSize: '0.75em',
                                        fontFamily: 'Open Sans, sans-serif'
                                    }}>
                                       {this.props.place}
                                    </h4>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        );
    }
}

SidePanelEvent.propTypes = {

};

export default SidePanelEvent;