import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout,Row, Col } from 'antd';
// import { Carousel } from 'react-responsive-carousel';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
const { Header, Footer, Sider, Content } = Layout;
class Slider extends Component {
    render() {
        return (
            <React.Fragment>
                <Content style={{
                    height:'44.1875em',
                    marginTop:'-2em'
                    
                }}>
                      <AliceCarousel mouseTrackingEnabled buttonsDisabled="false" dotsDisabled="false"
                        autoHeight="true" autoPlay="true" autoPlayInterval="5000">
                      <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792703/slide1_vavozg.png" />
                      <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792702/slide3_p4kooi.png" />
                      <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792702/slide2_hioxgw.png" />
                      </AliceCarousel>
                {/* <Carousel showThumbs={false}>
                <div >
                    <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792703/slide1_vavozg.png" />
                    <p className="legend" style={{backgroundColor:'hsla(0, 100%, 100%, 0.2',
                                                 fontSize:'1em',
                                                 height:'8em',
                    }}>
                        <span style={{color:'#000000',
                                     fontSize:'1.5em',
                                     fontFamily:'Open Sans,sans-serif'}}>Headline</span>
                    </p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792702/slide3_p4kooi.png" />
                    <p className="legend" style={{backgroundColor:'hsla(0, 100%, 100%, 0.2',
                                                 fontSize:'1em',
                                                 height:'8em',
                    }}>
                        <span style={{color:'#000000',
                                     fontSize:'1.5em',
                                     fontFamily:'Open Sans,sans-serif'}}>Headline</span>
                    </p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/lipacity/image/upload/v1580792702/slide2_hioxgw.png" />
                    <p className="legend" style={{backgroundColor:'hsla(0, 100%, 100%, 0.2',
                                                 fontSize:'1em',
                                                 height:'8em',
                    }}>
                        <span style={{color:'#000000',
                                     fontSize:'1.5em',
                                     fontFamily:'Open Sans,sans-serif'}}>Headline</span>
                    </p>
                </div>
            </Carousel> */}
                </Content>
            </React.Fragment>
        );
    }
}

Slider.propTypes = {

};

export default Slider;