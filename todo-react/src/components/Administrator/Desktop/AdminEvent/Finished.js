import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button, Modal, Input, notification, Icon, Popconfirm, Result } from 'antd';
import '../../index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { inject, observer } from 'mobx-react';
import { reactLocalStorage } from 'reactjs-localstorage';

@inject('TodoStore')
@observer
class Finished extends Component {
    render() {
        const TodoStore = this.props.TodoStore;
        const gotoNews = () => {

            window.open("admin-events","_self");
        }
        const publishNews = () => {
            var id = TodoStore.getArticleId;
            var status = "PUBLISHED";
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            TodoStore.setIsLoading(true);
            const news = {
                status: status
            }
            var port = TodoStore.getPort;
            var url = port + "eventrouter/publish/" + id;
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
                        description = "Event successfully published";
                        icontype = "check";
                        colors = "#73d13d";
                        openNotification(type, description, icontype, colors);

                    }
                });
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
                            minHeight: '20em',
                            height: 'auto'
                        }}
                    >
                        {/* Creating */}
                        {!TodoStore.getUpdateNews &&

                            <React.Fragment>
                                {!TodoStore.getIsLoading &&
                                    <Result
                                        style={{
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                        status="success"
                                        title="Successfully create event!"
                                        subTitle="Your article is not yet publish. Click [Publish] to publish this article"
                                        extra={[
                                            <Button
                                                onClick={(event) => gotoNews()}
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a',
                                                    color: '#ffffff'
                                                }} key="console">
                                                List of Events
                             </Button>,

                                            <Button
                                                onClick={(event) => publishNews()}
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#2a166f',
                                                    color: '#ffffff'
                                                }} key="buy">
                                                Publish
                             </Button>,
                                        ]}
                                    />
                                }
                                {TodoStore.getIsLoading &&
                                    <Result
                                        style={{
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                        status="success"
                                        title="Successfully create event!"
                                        subTitle="Your article is not yet publish. Click [Publish] to publish this article"
                                        extra={[
                                            <Button
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a',
                                                    color: '#ffffff'
                                                }} key="console">
                                                List of Events
                             </Button>,

                                            <Button
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#2a166f',
                                                    color: '#ffffff'
                                                }} key="buy">
                                                <Icon type="loading" />&nbsp;&nbsp;Loading...
                             </Button>,
                                        ]}
                                    />
                                }
                            </React.Fragment>
                        }


                        {TodoStore.getUpdateNews &&
                            <React.Fragment>
                                {!TodoStore.getIsLoading &&
                                    <Result
                                        style={{
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                        status="success"
                                        title="Successfully update event!"
                                        subTitle="Your article is not yet publish. Click [Publish] to publish this article"
                                        extra={[
                                            <Button
                                                onClick={(event) => gotoNews()}
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a',
                                                    color: '#ffffff'
                                                }} key="console">
                                                List of Events
                                 </Button>,

                                            <Button
                                                onClick={(event) => publishNews()}
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#2a166f',
                                                    color: '#ffffff'
                                                }} key="buy">
                                                Publish
                                 </Button>,
                                        ]}
                                    />
                                }
                                {TodoStore.getIsLoading &&
                                    <Result
                                        style={{
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                        status="success"
                                        title="Successfully create event!"
                                        subTitle="Your article is not yet publish. Click [Publish] to publish this article"
                                        extra={[
                                            <Button
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#52c41a',
                                                    color: '#ffffff'
                                                }} key="console">
                                                List of Events
                                 </Button>,

                                            <Button
                                                style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    fontSize: '1em',
                                                    backgroundColor: '#2a166f',
                                                    color: '#ffffff'
                                                }} key="buy">
                                                <Icon type="loading" />&nbsp;&nbsp;Loading...
                                 </Button>,
                                        ]}
                                    />
                                }
                            </React.Fragment>
                        }



                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Finished.propTypes = {

};

export default Finished;