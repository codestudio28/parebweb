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

       

        const addRecord=()=>{
            var today = new Date();

            var email = TodoStore.getEmail;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var usertype="administrator";
            var password="1234567";
            var profile="https://res.cloudinary.com/lipacity/image/upload/v1581656466/201912240254avatar_eoq2pa.png";
            var datecreated=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var status="ACTIVE";

            var type="";
            var description="";
            var icontype="";
            var colors="";
            if ((email.length === 0) || (lastname.length === 0)|| (firstname.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                TodoStore.setIsLoading(true);
                const account = {
                    email: email,
                    lastname:lastname,
                    firstname:firstname,
                    usertype:usertype,
                    password: password,
                    profile:profile,
                    datecreated:datecreated,
                    status:status
                }
                var port = TodoStore.getPort;
                var url = port+"accountrouter/add";

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else if (res.data === '202') {
                            TodoStore.setIsLoading(false);
                            type="Warning";
                            description="Email is already existing";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                            
                        } else  {
                            console.log(res.data[0]);
                            TodoStore.setIsLoading(false);
                            type="Success";
                            description="New administrator successfully created";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                           TodoStore.setCancelModal(false);
                          
                          window.open("admin-list-admin","_self");
                        }
                    });
            }
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
                    <Button onClick={TodoStore.setAddRecordModal} style={{
                        backgroundColor: '#2a166f',
                        fontFamily: 'Open Sans,sans-serif',
                        color: '#ffffff'
                    }}>
                        <i className="fa fa-plus"></i>
                        &nbsp;Add Administrator</Button>

                    {/* Update Record */}
                    <Modal
                        style={{
                            fontFamily:'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getAddRecordModal}
                        title="Add New Administrator"
                        onOk={addRecord}
                        onCancel={TodoStore.setCancelModal}
                        footer={[
                            <Button key="back" style={{
                                backgroundColor: '#faad14',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={TodoStore.setCancelModal}>
                                Cancel
            </Button>,
                     
                            <Button key="submit" style={{
                                backgroundColor: '2a166f',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={addRecord}>
                                 {!TodoStore.getIsLoading &&
                                        <React.Fragment>
                                            Save
                                        </React.Fragment>
                                }
                                {TodoStore.getIsLoading &&
                                    <React.Fragment>
                                       <Icon type="loading" style={{
                                        marginTop:'-0.25em'
                                        }} />
                                        &nbsp;&nbsp;Loading...
                                    </React.Fragment>
                                       
                                }
            </Button>,
                        ]}
                    >
                       <Row>
                            <Col span={24}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Email:
                                </h4>
                           </Col>
                           <Col span={24}>
                                <Input placeholder="Enter email here..." style={{
                                 width:'100%',
                                 fontFamily:'Open Sans,sans-serif'
                                }}
                                value={TodoStore.getEmail}
                                onChange={TodoStore.setEmail}/>
                           </Col>
                           <Col span={24} style={{paddingTop:'0.5em'}}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                   First Name:
                                </h4>
                           </Col>
                           <Col span={24}>
                                <Input placeholder="Enter first name here..." style={{
                                 width:'100%',
                                 fontFamily:'Open Sans,sans-serif'
                                }}
                                value={TodoStore.getFirstname}
                                onChange={TodoStore.setFirstname}/>
                           </Col>
                           <Col span={24} style={{paddingTop:'0.5em'}}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                   Last Name:
                                </h4>
                           </Col>
                           <Col span={24}>
                                <Input placeholder="Enter last name here..." style={{
                                 width:'100%',
                                 fontFamily:'Open Sans,sans-serif'
                                }}
                                value={TodoStore.getLastname}
                                onChange={TodoStore.setLastname}/>
                           </Col>
                       </Row>
                    </Modal>


                </Col>
            </React.Fragment>
        );
    }
}

AddRecord.propTypes = {

};

export default AddRecord;