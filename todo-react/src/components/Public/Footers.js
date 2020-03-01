import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
class Footers extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs={12} md={12} style={{
                        textAlign: 'center',
                        height: '20em',
                        marginTop: '2em',
                        backgroundColor: '#800000',
                        paddingTop: '2em'
                    }}>
                        <Row>
                            <Col xs={3} md={3} style={{ height: '20em' }}>
                                <div style={{ width: '100%' }}>
                                    <h3 style={{ fontSize: '1.25em', color: '#ffffff', fontFamily: 'Open Sans, sans-serif' }}>Philippines Seal</h3>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <br></br>
                                    <center>
                                        <img style={{ width: '12em' }} src="https://res.cloudinary.com/lipacity/image/upload/v1580823087/philseal_xoqnxc.png" />
                                    </center>
                                </div>

                            </Col>
                            <Col xs={2} md={2} style={{ height: '20em', textAlign: 'left' }}>
                                <h3 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    fontSize: '1.25em',
                                    color: '#ffffff'
                                }}>Government Links</h3>
                                <ul style={{
                                    listStyle: 'none',
                                    fontFamily: 'Open Sans,sans-serif',
                                    textAlign: 'justify',
                                    marginTop: '1em',
                                }}>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>The President</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Office of the President</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Office of the Vice President</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Senate of the Philippines</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>House of Representatives</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Supreme Court</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Court of Appeals</a></li>
                                    <br></br>
                                    <li><a href="#" style={{ textDoration: 'none', color: '#ffffff' }}>Sandiganbayan</a></li>
                                </ul>

                            </Col>
                            <Col xs={3} md={3} style={{ height: '20em', textAlign: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <h3 style={{ fontSize: '1.25em', color: '#ffffff', fontFamily: 'Open Sans, sans-serif' }}>Lipa City</h3>
                                </div>
                                <div style={{ width: '100%', marginTop: '2em' }}>
                                    <p style={{ fontSize: '1em', color: '#ffffff', fontFamily: 'Open Sans, sans-serif', textAlign: 'justify' }}>
                                        Lipa, officially the City of Lipa, or simply known as Lipa City, is a 1st class city in the province of Batangas,
                                        Philippines. According to the 2015 census, it has a population of 332,386 people.
                                        It is one of the four cities in Batangas aside from Batangas City, Santo Tomas, and Tanauan.
                                        </p>
                                </div>

                            </Col>
                            <Col xs={4} md={4} style={{ height: '20em', textAlign: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <h3 style={{ fontSize: '1.25em', color: '#ffffff', fontFamily: 'Open Sans, sans-serif' }}>Map</h3>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <br></br>
                                    <img style={{width:'100%',height:'15em'}} src="https://res.cloudinary.com/lipacity/image/upload/v1580825299/maps_suqtlp.png"/>
                                </div>

                            </Col>
                        </Row>


                    </Col>
                    <Col xs={12} md={12} style={{
                        textAlign: 'center',
                        height: '2em',
                        paddingTop: '1em',
                        backgroundColor: '#ffffff'
                    }}>
                        <h4 style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1em', color: '#800000' }}>
                            &copy; Copyright 2020, Design by: Code Studio
                            </h4>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Footers.propTypes = {

};

export default Footers;