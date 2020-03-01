import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

class Events extends Component {
    
    render() {
        const gotoEventPage = ()=>{
            window.open("/single-events","_self");
        }
        return (
            <React.Fragment>

                {/* Event */}
                <Col span={24} style={{ height: '16.375em', marginBottom: '2em' }}>
                    <Row>
                        <Col span={8} style={{ height: '16.375em' }}>
                            <img style={{ width: '25em', height: '16.375em' }}
                                src={this.props.banner} />
                        </Col>
                        <Col span={16} style={{ height: '16.375em' }}>
                            <Row>
                                <Col span={2} style={{ height: '5.375em' }}>
                                    <Row>
                                        <Col span={24} style={{
                                            height: '3.7em',
                                            backgroundColor: '#e8e8e8',
                                            borderRadius: '0.25em 0.25em 0 0',
                                            color: '#2a166f',
                                            fontFamily: 'Open Sans,sans-serif',
                                            textAlign: 'center',
                                            paddingTop: '0.725em',
                                            fontWeight: '700'
                                        }}>
                                            <span style={{ fontSize: '2.25em' }}>{this.props.days}</span>
                                        </Col>
                                        <Col span={24} style={{
                                            height: '1.754em',
                                            backgroundColor: '#2a166f',
                                            borderRadius: '0 0 0.3125em 0.3125em',
                                            color: '#ffffff',
                                            fontFamily: 'Open Sans,sans-serif',
                                            paddingTop: '0.35em',
                                            textAlign: 'center',
                                            fontWeight: '700'
                                        }}>
                                            <span style={{ fontSize: '0.75em' }}>{this.props.months}</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={22} style={{ height: '5.375em' }}>
                                    <Row>
                                        <Col span={24} style={{ height: '2.3625em' }}>
                                            <h4 style={{
                                                fontFamily: 'Open Sans,sans-serif',
                                                fontWeight: '600',
                                                lineHeight: '2.0625em',
                                                fontSize: '1.875em',
                                                paddingLeft: '1em'
                                            }}>
                                               {this.props.title}
                                                                </h4>
                                        </Col>
                                        <Col span={24} style={{
                                            height: '2.3375em',
                                            paddingTop: '0.9375em',
                                            paddingLeft: '2em'
                                        }}>
                                            <i className="fas fa-user"
                                                style={{
                                                    fontSize: '1em',
                                                    lineHeight: '1em',
                                                    color: '#2a166f'

                                                }}></i>
                                            <span style={{
                                                marginLeft: '0.25em',
                                                fontFamily: 'Open Sans,sans-serif',
                                                fontSize: '1em',
                                                color: '#2a166f',
                                                fontStyle: 'italic',
                                                lineHeight: '1.43em'
                                            }}>{this.props.author}</span>

                                            <i className="fas fa-calendar-alt"
                                                style={{
                                                    fontSize: '1em',
                                                    lineHeight: '1em',
                                                    color: '#2a166f',
                                                    marginLeft: '3em'

                                                }}></i>
                                            <span style={{
                                                marginLeft: '0.25em',
                                                fontFamily: 'Open Sans,sans-serif',
                                                fontSize: '1em',
                                                color: '#2a166f',
                                                fontStyle: 'italic',
                                                lineHeight: '1.43em'
                                            }}>{this.props.daytime}</span>

                                            <i className="fas fa-map-marker-alt"
                                                style={{
                                                    fontSize: '1em',
                                                    lineHeight: '1em',
                                                    color: '#2a166f',
                                                    marginLeft: '3em'

                                                }}></i>
                                            <span style={{
                                                marginLeft: '0.25em',
                                                fontFamily: 'Open Sans,sans-serif',
                                                fontSize: '1em',
                                                color: '#2a166f',
                                                fontStyle: 'italic',
                                                lineHeight: '1.43em'
                                            }}>{this.props.place}</span>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{ height: '5.4em' }}>
                                    <p style={{
                                        fontFamily: 'Open Sans, sans-serif',
                                        fontSize: '1em',
                                        lineHeight: '1.8em',
                                        margin: '0 0 1.5625em 0'
                                    }}>
                                       {ReactHtmlParser(this.props.content)}
                                                      </p>

                                    <p style={{
                                        fontFamily: 'Open Sans, sans-serif',
                                        height: '4em',
                                        width: '12em',
                                        fontSize: '0.875em',
                                        fontWeight: '700',
                                        letterSpacing: '0.125em',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        backgroundColor: '#2a166f',
                                        padding: '1.6em 1.4375em 0.875em 1.4375em',
                                        textDecoration: 'none solid rgb(221,62,62)'
                                    }}
                                   
                                    >
                                       <NavLink to={this.props.link} style={{textDecoration:'none', color: '#ffffff'}}>Read More </NavLink>
                                                      </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Col>

            </React.Fragment>
        );
    }
}

Events.propTypes = {

};

export default Events;