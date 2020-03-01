import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
class News extends Component {
    render() {
        const gotoSingleNews =()=>{
            window.open("single-news","_self");
        }
        return (
            <React.Fragment>
                <Col span={8} style={{
                    height: '28.1375em',
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    marginTop:'1em'
                }}>
                    <Row>
                        <Col span={24} style={{
                            height: '15.625em',
                            padding: '0px'
                        }}>
                           
                            <img src={this.props.banner}
                                style={{
                                    width: '100%',
                                    height: '15.625em'
                                }}
                            />
                        </Col>
                        <Col span={24} style={{
                            height: '12.5125em',
                            padding: '0px',
                            backgroundColor: '#ffffff'
                        }}>
                            <Row>
                                <Col span={24} style={{
                                    height: '3em'
                                }}>
                                    <Row>
                                        <Col span={12} style={{ paddingTop: '1em' }}>
                                            <i className="fa fa-calendar-alt"
                                                style={{
                                                    fontSize: '1em',
                                                    lineHeight: '1em',
                                                    color: '#2a166f',
                                                    marginLeft: '0.5em'

                                                }}
                                            ></i>
                                            <span style={{
                                                fontFamily: 'Open Sans, sans-serif',
                                                fontSize: '1em',
                                                lineHeight: '1em',
                                                color: '#2a166f',
                                                marginLeft: '0.5em'
                                            }}>
                                                {this.props.date}
                                                                    </span>
                                        </Col>
                                        <Col span={12} style={{ paddingTop: '1em' }}>
                                            <i className="fa fa-user"
                                                style={{
                                                    fontSize: '1em',
                                                    lineHeight: '1em',
                                                    color: '#2a166f',
                                                    marginLeft: '0.5em'

                                                }}
                                            ></i>
                                            <span style={{
                                                fontFamily: 'Open Sans, sans-serif',
                                                fontSize: '1em',
                                                lineHeight: '1em',
                                                color: '#2a166f',
                                                marginLeft: '0.5em'
                                            }}>
                                                {this.props.author}
                                                                    </span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{
                                    height: '5em'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.5em',
                                        lineHeight: '1.5em',
                                        fontWeight: '600',
                                        paddingLeft: '0.5em',
                                        paddingRight: '0.5em',
                                        fontFamily: 'Open Sans, sans-serif',
                                    }}>
                                        {this.props.title}
                                                            </h4>
                                </Col>
                                <Col span={24} style={{
                                    height: '2em',
                                    textAlign: 'right',
                                    paddingRight: '1em'
                                }}>

                                    <i className="fa fa-thumbs-up"
                                        style={{
                                            fontSize: '1em',
                                            lineHeight: '1em',
                                            color: '#2a166f',
                                            marginLeft: '0.5em'

                                        }}
                                    >
                                    </i>
                                    <span style={{
                                        fontSize: '1em',
                                        lineHeight: '1em',
                                        fontWeight: '600',
                                        paddingLeft: '0.5em',
                                        paddingRight: '0.5em',
                                        fontFamily: 'Open Sans, sans-serif',
                                    }}>
                                        1k
                                                                    </span>
                                    <i className="fa fa-comment"
                                        style={{
                                            fontSize: '1em',
                                            lineHeight: '1em',
                                            color: '#2a166f',
                                            marginLeft: '0.5em'

                                        }}
                                    >
                                    </i>
                                    <span style={{
                                        fontSize: '1em',
                                        lineHeight: '1em',
                                        fontWeight: '600',
                                        paddingLeft: '0.5em',
                                        paddingRight: '0.5em',
                                        fontFamily: 'Open Sans, sans-serif',
                                    }}>
                                        1k
                                                                    </span>

                                </Col>
                                <Col span={24} style={{
                                    height: '0.125em'
                                }}>
                                    <div style={{
                                        height: '0.125em',
                                        width: '90%',
                                        marginLeft: '5%',
                                        backgroundColor: '#e8e8e8'
                                    }}></div>
                                </Col>
                                <Col span={24} style={{
                                    height: '2.3875em',
                                }}
                               
                                >
                                    
                                    <NavLink to={this.props.link}>
                                    <p style={{
                                        height: '2.3875em',
                                        textAlign: 'center',
                                        paddingTop: '0.5em',
                                        fontFamily: 'Open Sans,sans-serif',
                                        color: '#2a166f'
                                    }}>
                                       <a href="#"> Read More</a>
                                                           </p>
                                    </NavLink>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        );
    }
}

News.propTypes = {

};

export default News;