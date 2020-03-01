import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import News from './News';
const { Header, Footer, Sider, Content } = Layout;
class NewsSection extends Component {
    render() {
        return (
            <React.Fragment>
                <Content style={{
                    minHeight: '37.5375em',
                    height:'auto',
                    backgroundColor: '#f5f5f5'

                }}>
                    <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={24}>
                                    <h4 style={{
                                        fontFamily: 'Open Sans,sans-serif',
                                        fontSize: '2.5em',
                                        lineHeight: '3em',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        textTransform: 'uppercase'
                                    }}>
                                        LATEST NEWS
                                    </h4>
                                </Col>
                                <Col span={24} style={{
                                    minHeight: '28.1375em',
                                    height: 'auto'
                                }}>
                                    <Row>
                                       <News/>
                                       <News/>
                                       <News/>
                                      
                                    </Row>


                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}>
                        </Col>
                    </Row>
                </Content>
            </React.Fragment>
        );
    }
}

NewsSection.propTypes = {

};

export default NewsSection;