import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button, Modal, Input, notification, Icon } from 'antd';
import '../../index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class UploadBanner extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         image:'',
    //         loading:false,
    //     };
    //   }
    render() {
        const TodoStore = this.props.TodoStore;

        const nextStep = () => {
            var image = TodoStore.getImageURL;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            if (image.length === 0) {
                type = "Warning";
                description = "Please upload banner image first";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                TodoStore.setNewsStep(2);
            }
        }
        const uploadImage = async e => {
            var image = '';
            TodoStore.setImageURL(image);
            TodoStore.setIsImage(false);
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'lipalogo');
            TodoStore.setUploadLoading(true);
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/lipacity/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            TodoStore.setImageURL(file.secure_url);

            if (TodoStore.getImageURL != '') {
                console.log('URL: ' + TodoStore.getImageURL);
                TodoStore.setUploadLoading(false);
                TodoStore.setIsImage(true);
            }

        }
        const openNotification = (type, description, icontype, colors) => {
            notification.open({
                message: type,
                description: description,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
                icon: <Icon type={icontype} style={{ color: colors }} />,
            });
        }
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}
                        style={{
                            minHeight: '3em',
                            height: 'auto'
                        }}
                    >
                        <Row>
                            <Col span={24} style={{
                                borderBottom: '2px solid',
                                borderColor: '#bfbfbf'
                            }}>
                            </Col>
                            <Col span={3}>

                            </Col>
                            <Col span={18}>
                                <Col span={24} style={{
                                    marginTop: '1em',
                                    minHeight: '20em',
                                    height: 'auto'

                                }}>
                                    {!TodoStore.getIsImage &&
                                        <img src="https://res.cloudinary.com/lipacity/image/upload/v1582082990/bannerhead_nobpo4.png"
                                            style={{
                                                height: '20em',
                                                width: '100%'
                                            }}
                                        />
                                    }
                                    {TodoStore.getIsImage &&
                                        <img src={TodoStore.getImageURL}
                                            style={{
                                                height: '20em',
                                                width: '100%'
                                            }}
                                        />
                                    }

                                </Col>
                                <Col span={24} style={{
                                    marginTop: '1em',
                                    minHeight: '3em',
                                    height: 'auto'
                                }}>
                                    {!TodoStore.getUploadLoading &&
                                        <input type="file"
                                            name="file"
                                            placeholder="Upload an image"
                                            onChange={uploadImage}
                                        />
                                    }

                                    {TodoStore.getUploadLoading &&
                                        <h4 style={{
                                            fontFamily: 'Open Sans, sans-serif',
                                            fontSize: '1em'
                                        }}>
                                            Please wait. Uploading your image.
                                        </h4>
                                    }

                                </Col>
                                <Col span={24} style={{
                                    marginTop: '1em',
                                    minHeight: '3em',
                                    height: 'auto'
                                }}>
                                    <Row>
                                        <Col span={12} style={{
                                            textAlign: 'left'
                                        }}>

                                            {!TodoStore.getUpdateNews &&
                                                <Button style={{
                                                    color: '#ffffff',
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a'
                                                }}
                                                    onClick={(event) => TodoStore.setNewsStep(0)}
                                                >
                                                    Previous Step: Create Event
                                               </Button>
                                            }

                                            {TodoStore.getUpdateNews &&
                                                <Button style={{
                                                    color: '#ffffff',
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a'
                                                }}
                                                    onClick={(event) => TodoStore.setNewsStep(0)}
                                                >
                                                    Previous Step: Update Event
                                                   </Button>
                                            }

                                        </Col>
                                        <Col span={12} style={{
                                            textAlign: 'right'
                                        }}>
                                            <Button style={{
                                                color: '#ffffff',
                                                fontFamily: 'Open Sans,sans-serif',
                                                fontSize: '1em',
                                                backgroundColor: '#2a166f'
                                            }}
                                                onClick={(event) => nextStep()}
                                            >
                                                Next Step: Preview Event
                                            </Button>
                                        </Col>

                                    </Row>
                                </Col>
                            </Col>
                            <Col span={3}>

                            </Col>


                        </Row>


                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

UploadBanner.propTypes = {

};

export default UploadBanner;