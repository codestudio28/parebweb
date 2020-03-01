import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
class Footers extends Component {
    render() {
        return (
            <React.Fragment>
                <Footer style={{
                    height: '5em',
                    backgroundColor: '#ffffff',
                    textAlign:'center'
                }}
                
                >
                    <h4 style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1em', color: '#2a166f' }}>
                            &copy; Copyright 2020, Design by: Code Studio
                            </h4>
                </Footer>
            </React.Fragment>
        );
    }
}

Footers.propTypes = {

};

export default Footers;