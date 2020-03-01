import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon } from 'antd';
import '../../index.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
@inject('TodoStore')
@observer
class AddRecord extends Component {

    render() {
        const TodoStore = this.props.TodoStore;

       

        const addRecord=()=>{

            var position = TodoStore.getPosition;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var middlename = TodoStore.getMiddlename;
            var orgid = reactLocalStorage.get('userid');

            var type="";
            var description="";
            var icontype="";
            var colors="";
            if ((position.length === 0) || (lastname.length === 0)|| (firstname.length === 0)|| (middlename.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                TodoStore.setIsLoading(true);
                const account = {
                    lastname: lastname,
                    middlename:middlename,
                    firstname:firstname,
                    position:position,
                    orgid: orgid
                  
                }
                var port = TodoStore.getPort;
                var url = port+"officerrouter/add";

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
                            description="Officer is already in the list";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                            
                        } else  {
                            console.log(res.data[0]);
                            TodoStore.setIsLoading(false);
                            type="Success";
                            description="New officer successfully added";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                           TodoStore.setCancelModal(false);
                          
                          window.open("org-officer","_self");
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
                        &nbsp;Add Officers</Button>

                    {/* Update Record */}
                    <Modal
                        style={{
                            fontFamily:'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getAddRecordModal}
                        title="Add New Officer"
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
                                backgroundColor: '#2a166f',
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
                                    Position:
                                </h4>
                           </Col>
                           <Col span={24}>
                                <Input placeholder="Enter position here..." style={{
                                 width:'100%',
                                 fontFamily:'Open Sans,sans-serif'
                                }}
                                value={TodoStore.getPosition}
                                onChange={TodoStore.setPosition}/>
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
                                   Middle Name:
                                </h4>
                           </Col>
                           <Col span={24}>
                                <Input placeholder="Enter middle name here..." style={{
                                 width:'100%',
                                 fontFamily:'Open Sans,sans-serif'
                                }}
                                value={TodoStore.getMiddlename}
                                onChange={TodoStore.setMiddlename}/>
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