import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Tooltip, notification, Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
class SingleOrg extends Component {
    render() {
        return (
            <React.Fragment>

                <Col span={6}
                    style={{
                        backgroundColor: '#ffffff',
                        minHeight: '18em',
                        height: 'auto',
                        border: '2px solid',
                        borderColor: '#e8e8e8'

                    }}
                >
                    <Row>
                        <Col span={24}
                            style={{
                                height: '13em',
                                paddingTop: '0.5em'
                            }}>
                            <center>
                                
                               <NavLink to={this.props.link}><img
                                    src={this.props.logo}
                                    style={{
                                        height: '13em'
                                    }} />
                                </NavLink> 
                            </center>
                        </Col>
                        <Col span={24}
                            style={{
                                height: '5em',
                                paddingTop: '1em'
                            }}>
                                <p style={{
                                    textAlign:'center'
                                }}>
                                    <NavLink to={this.props.link}>
                                    <span style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'700'
                                    }}>
                                        {this.props.orgaccr}
                                    </span>
                                    </NavLink>
                                    <br/>
                                    
                                    <span style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'600'
                                    }}>
                                        {this.props.city+', '+this.props.province}
                                    </span>
                                </p>
                            </Col>
                    </Row>
                </Col>

            </React.Fragment>
        );
    }
}

SingleOrg.propTypes = {

};

export default SingleOrg;