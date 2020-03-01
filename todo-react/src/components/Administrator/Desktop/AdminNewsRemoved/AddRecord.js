import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
@inject('TodoStore')
@observer
class AddRecord extends Component {

    render() {
        const TodoStore = this.props.TodoStore;

        const createNews =()=>{
            TodoStore.setUpdateNews(false);
            TodoStore.setIsCreateNews(true);
        }
        const openNotification = (type,description,icontype,colors) => {
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
                <Col span={24}
                    style={{
                        textAlign: 'right',
                        paddingRight: '1em'
                    }}
                >
                    <Button onClick={(event)=>createNews()} style={{
                        backgroundColor: '#2a166f',
                        fontFamily: 'Open Sans,sans-serif',
                        color: '#ffffff'
                    }}>
                        <i className="fa fa-plus"></i>
                        &nbsp;Create News</Button>

                </Col>
            </React.Fragment>
        );
    }
}

AddRecord.propTypes = {

};

export default AddRecord;