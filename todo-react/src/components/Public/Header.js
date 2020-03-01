import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu,Spin, Icon,InputNumber, Button, Avatar, Breadcrumb, Select, Pagination, Modal, Checkbox, notification, Tooltip, Popconfirm } from 'antd';

import { Container, Row, Col } from 'react-bootstrap';
import Time from 'react-time';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {now: new Date()};
      }
    componentDidMount() {
        this.interval = setInterval(() => {
          this.setState({now: new Date});
          
        }, 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        var {now} = this.state;
        return (
           
            <React.Fragment>
                <Container fluid={true} style={{minHeight:'4.75em',
                                                height:'auto',
                                                backgroundColor:'#2a166f'}}>
                    <Row>
                        <Col xs={12} md={6} style={{textAlign:'center',
                                                    paddingTop:'1.75em',
                                                    paddingLeft:'2em',
                                                    fontFamily:'Open Sans, sans-serif'}}>
                            <h4 style={{fontSize:'1.2em',color:'#ffffff'}}><Time value={now} format="MMMM DD YYYY / HH:mm:ss" /></h4>
                        </Col>
                        <Col xs={12} md={6} style={{paddingRight:'3em',paddingLeft:'2em',paddingTop:'1.2em',textAlign:'center'}}>
                            <Icon type="facebook" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                            <Icon type="twitter" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                            <Icon type="instagram" style={{fontSize:'2em',marginLeft:'0.5em',color:'#ffffff'}}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Header.propTypes = {

};

export default Header;