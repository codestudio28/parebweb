import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button,Icon, Select, Popconfirm, message, Modal, Input, Pagination,Avatar,Skeleton,notification } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
function confirm() {
    message.info('Clicked on Yes.');
}
var i = 0;


@inject('TodoStore')
@observer
class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }


    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        if(TodoStore.getIsLoadData===true){
            fetch('http://localhost:8080/accountrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                    
                })
                
                TodoStore.setIsLoadData(false);
            });
        }
       
    }


    render() {
        const TodoStore = this.props.TodoStore;
        var { records } = this.state;
        
        const loadRecords=()=>{
            if(TodoStore.getIsLoadData===true){
                fetch('http://localhost:8080/accountrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        records: json,
                        
                    })
                    
                    TodoStore.setIsLoadData(false);
                });
            }
        }
        const removeRecord=(value)=>{
            var id = value;
            var type="";
            var description="";
            var icontype="";
            var colors="";

            var port = TodoStore.getPort;
            var url = port+"accountrouter/remove/"+id;
            var status="REMOVED";
            TodoStore.setIsLoading(true);
            const account = {
                status:status
            }
            axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            TodoStore.setIsLoading(false);
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else  if (res.data === '101') {
                            type="Success";
                            description="Administrator information successfully removed";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                            TodoStore.setCancelModal(false);
                            TodoStore.setIsLoadData(true);
                            TodoStore.setIsLoading(false);
                            loadRecords();
                        }
                    });

        }
        const updateRecord = () => {
            var id = TodoStore.getUpdateRecordId;
            var email = TodoStore.getEmail;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if ((lastname.length === 0)|| (firstname.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                TodoStore.setIsLoading(true);
                const account = {
                    lastname:lastname,
                    firstname:firstname
                }
                var port = TodoStore.getPort;
                var url = port+"accountrouter/update/"+id;

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else  if (res.data === '101') {
                            console.log(res.data[0]);
                            TodoStore.setIsLoading(false);
                            type="Success";
                            description="Administrator information successfully updated";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                            TodoStore.setCancelModal(false);
                            TodoStore.setIsLoadData(true);
                            loadRecords();
                        }
                    });
            }
          
        }
        const getUpdateRecordId=(value)=>{
            TodoStore.setUpdateRecordId(value);
            TodoStore.setUpdateRecordModal();
            dataSource.filter(records => {
                return records.key.indexOf(value) >= 0
            }).map((record, index) => {
                TodoStore.setEmail2(record.email);
                TodoStore.setLastname2(record.lastname);
                TodoStore.setFirstname2(record.firstname);
            });
        }
        const getViewRecordId=(value)=>{
            TodoStore.setUpdateRecordId(value);
            TodoStore.setViewRecordModal();
            dataSource.filter(records => {
                return records.key.indexOf(value) >= 0
            }).map((record, index) => {
                TodoStore.setEmail2(record.email);
                TodoStore.setLastname2(record.lastname);
                TodoStore.setFirstname2(record.firstname);
                TodoStore.setProfile(record.profile);
            });
        }
        const dataSource = [];

        records.map((records)=> {
            if(records.usertype==="administrator"){
                dataSource.push({
                    key: records._id,
                    usertype: records.usertype,
                    email: records.email,
                    profile: records.profile,
                    lastname: records.lastname,
                    firstname: records.firstname,
                    datecreated: records.datecreated,
                    status: records.status,
    
                })
            }
           
            
        });
        i = 0;
        var starts = 0;
        var ends = 0;

        var display = TodoStore.getDisplay;
        var page = TodoStore.getPage;


        ends = parseInt(page) * parseInt(display);
        starts = ends - parseInt(display);


        const newrecords = dataSource.filter(records => {
           
            if (TodoStore.filter === 'All') {
                return records.lastname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Last Name') {
                return records.lastname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'First Name') {
                return records.firstname.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Email') {
                return records.email.indexOf(TodoStore.search) >= 0
            }

        }).map((record, index) => {
           i++;
           if ((index >= starts) && (index < ends) && (record.status==="ACTIVE")) {
            return(
                <tr>
                <td>{i}</td>
                <td><Avatar
                    style={{
                        width: '2em',
                        height: '2em'
                    }}
                    src={record.profile} /></td>
                <td>{record.email}</td>
                <td>{record.firstname}</td>
                <td>{record.lastname}</td>
                <td>Task here</td>
                <td>
                    <Button onClick={(event)=>getUpdateRecordId(record.key)} style={{
                        color: '#ffffff',
                        backgroundColor: '#52c41a'
                    }}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                   
                    <Button onClick={(event)=> getViewRecordId(record.key)} style={{
                        color: '#ffffff',
                        backgroundColor: '#1890ff'
                    }}>
                        <i className="fa fa-eye"></i>
                    </Button>
                    
                    <Popconfirm placement="topLeft" title={"Remove this record?"} onConfirm={(event)=>removeRecord(record.key)} okText="Yes" cancelText="No">
                        <Button style={{
                            color: '#ffffff',
                            backgroundColor: '#f5222d'
                        }}>
                            {!TodoStore.getIsLoading &&
                                 <i className="fa fa-trash"></i>
                            }
                            {TodoStore.getIsLoading &&
                                <Icon type="loading"/>
                            }
                           
                        </Button>
                    </Popconfirm>
                </td>
            </tr>
            );
           }
            

        });
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
                <Col span={24} style={{
                    paddingTop: '1em'
                }}>
                    <Row>
                        <Col span={24}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                color: '#bfbfbf',
                                fontSize: '1em'
                            }}>
                                List of Administrator
                            </h4>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight: '3em',
                                height: 'auto'
                            }}
                        >
                            <Skeleton loading={TodoStore.getIsLoadData}>
                            <table className="table-condensed" style={{
                                width: '100%',
                                fontFamily: 'Open Sans,sans-serif'
                            }}>
                                <thead>
                                    <tr>
                                    <th style={{
                                            width: '5%'
                                        }}>#</th>
                                        <th style={{
                                            width: '5%'
                                        }}>Profile</th>
                                        <th style={{
                                            width: '20%'
                                        }}>Email</th>
                                        <th style={{
                                            width: '15%'
                                        }}>First Name</th>
                                        <th style={{
                                            width: '15%'
                                        }}>Last Name</th>
                                        <th style={{
                                            width: '20%'
                                        }}>Task</th>
                                        <th style={{
                                            width: '20%'
                                        }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {newrecords}
                                   
                                </tbody>
                            </table>
                            </Skeleton>
                        </Col>
                        <Col span={24} style={{
                            height: '3em',
                            paddingTop: '1em',
                            borderTop: '2px solid',
                            borderColor: '#d9d9d9',
                            marginTop: '0.5em '
                        }}>
                             <Pagination
                            current={TodoStore.getPage}
                            total={(i / TodoStore.getDisplay) * 10}
                            onChange={TodoStore.setPage} />
                        </Col>
                    </Row>
                     {/* Update Record */}
                     <Modal
                        style={{
                            fontFamily: 'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getUpdateRecordModal}
                        title="Update Administrator Information"
                        onOk={updateRecord}
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
                                backgroundColor: '#800000',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={updateRecord}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} 
                                value={TodoStore.getEmail}
                                onChange={TodoStore.setEmail}
                                disabled/>
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} 
                                value={TodoStore.getFirstname}
                                onChange={TodoStore.setFirstname}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} 
                                value={TodoStore.getLastname}
                                onChange={TodoStore.setLastname}
                                />
                            </Col>
                        </Row>
                    </Modal>
                    {/* View Record */}
                    <Modal
                        style={{
                            fontFamily: 'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getViewRecordModal}
                        title="View Administrator Information"
                        onCancel={TodoStore.setCancelModal}
                        footer={[
                            <Button key="back" style={{
                                backgroundColor: '#faad14',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={TodoStore.setCancelModal}>
                                Cancel
</Button>,

                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>

                                    </Col>
                                    <Col span={12}>
                                        <img src={TodoStore.getProfile} 
                                        style={{
                                            width:'100%',
                                            borderRadius:'50%'
                                        }}/>
                                    </Col>
                                    <Col span={6}>
                                        
                                    </Col>
                                </Row>
                               
                            </Col>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} disabled 
                                value={TodoStore.getEmail}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} disabled 
                                value={TodoStore.getFirstname}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} disabled
                                value={TodoStore.getLastname}
                                />
                            </Col>
                        </Row>
                    </Modal>
                </Col>
            </React.Fragment>
        );
    }
}

RecordTable.propTypes = {

};

export default RecordTable;