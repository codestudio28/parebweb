import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button, Modal, Input, notification, Icon, Popconfirm } from 'antd';
import '../../index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { inject, observer } from 'mobx-react';
import { reactLocalStorage } from 'reactjs-localstorage';

@inject('TodoStore')
@observer
class PreviewContent extends Component {
    render() {
        const TodoStore = this.props.TodoStore;




        const saveAticle = () => {
            if (TodoStore.getUpdateNews === true) {
                var id = TodoStore.getArticleId;
                var dates = TodoStore.getEventDate;
                var title = TodoStore.getTitle;
                var content = TodoStore.getContent;
                var shortdesc = TodoStore.getDescription;
                var banner = TodoStore.getImageURL;
                var times = TodoStore.getTime;
                var place = TodoStore.getPlace;
                var status = "DRAFT";

                var type = "";
                var description = "";
                var icontype = "";
                var colors = "";

                TodoStore.setIsLoading(true);
                const news = {
                    title: title,
                    dates:dates,
                    content: content,
                    description:shortdesc,
                    times:times,
                    place:place,
                    banner: banner,
                    status: status
                }
                var port = TodoStore.getPort;
                var url = port + "eventrouter/update/"+id;
                axios.post(url, news)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else {

                            TodoStore.setIsLoading(false);
                            type = "Success";
                            description = "Event successfully updated";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setNewsStep(3);
                        }
                    });
            } else {
                var today = new Date();
                var userid = reactLocalStorage.get('userid');
                var dates = TodoStore.getEventDate;
                var title = TodoStore.getTitle;
                var content = TodoStore.getContent;
                var shortdesc = TodoStore.getDescription;
                var banner = TodoStore.getImageURL;
                var times = TodoStore.getTime;
                var place = TodoStore.getPlace;
                var datecreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var status = "DRAFT";
               
                var type = "";
                var description = "";
                var icontype = "";
                var colors = "";

                TodoStore.setIsLoading(true);
                const news = {
                    title: title,
                    dates: dates, 
                    content: content,
                    description:shortdesc,
                    times:times,
                    place:place,
                    banner: banner,
                    userid: userid,
                    datecreated: datecreated,
                    status: status
                }
                var port = TodoStore.getPort;
                var url = port + "eventrouter/add";
                axios.post(url, news)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else {

                            TodoStore.setIsLoading(false);
                            type = "Success";
                            description = "New event successfully created";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setArticleId(res.data);
                            TodoStore.setNewsStep(3);
                        }
                    });
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
                            minHeight: '5em',
                            height: 'auto'
                        }}
                    >
                        <Row>
                            <Col span={4}>

                            </Col>
                            <Col span={16}>
                                <Row>
                                    <Col span={24}
                                        style={{
                                            marginTop: '1em',
                                            minHeight: '5em',
                                            height: 'auto'
                                        }}
                                    >
                                        <img src={TodoStore.getImageURL}
                                            style={{
                                                width: '100%',
                                                height: '20em'
                                            }}
                                        />
                                    </Col>
                                    <Col span={24}
                                        style={{
                                            marginTop: '1em',
                                            minHeight: '5em',
                                            height: 'auto',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1.5em',
                                            fontWeight: '700'

                                        }}>
                                            {TodoStore.getTitle}
                                        </h4>
                                    </Col>
                                    <Col span={24}
                                        style={{
                                            marginTop: '1em',
                                            minHeight: '5em',
                                            height: 'auto'
                                        }}
                                    >

                                        {ReactHtmlParser(TodoStore.getContent)}
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
                                                <Button style={{
                                                    color: '#ffffff',
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a'
                                                }}
                                                    onClick={(event) => TodoStore.setNewsStep(1)}
                                                >
                                                    Previous: Upload Banner
                                               </Button>
                                            </Col>
                                            <Col span={12} style={{
                                                textAlign: 'right'
                                            }}>

                                                {!TodoStore.getIsLoading &&
                                                    <Popconfirm placement="topLeft" title={"Do you want to finish this article?"} onConfirm={(event) => saveAticle()} okText="Yes" cancelText="No">
                                                        <Button style={{
                                                            color: '#ffffff',
                                                            fontFamily: 'Open Sans,sans-serif',
                                                            fontSize: '1em',
                                                            backgroundColor: '#2a166f'
                                                        }}

                                                        >
                                                            Finish
                       </Button>
                                                    </Popconfirm>
                                                }
                                                {TodoStore.getIsLoading &&
                                                    <Button style={{
                                                        color: '#ffffff',
                                                        fontFamily: 'Open Sans,sans-serif',
                                                        fontSize: '1em',
                                                        backgroundColor: '#2a166f'
                                                    }}

                                                    >
                                                        <Icon type="loading" />&nbsp;&nbsp;Loading...
                   </Button>
                                                }

                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

PreviewContent.propTypes = {

};

export default PreviewContent;