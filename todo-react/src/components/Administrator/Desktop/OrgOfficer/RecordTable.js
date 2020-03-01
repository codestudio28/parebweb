import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button,Icon, Select, Popconfirm, message, Modal, Input, Pagination,Avatar,Skeleton,notification } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
function confirm() {
    message.info('Clicked on Yes.');
}
var i = 0;
var orgid='';

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
            fetch(TodoStore.getPort+'officerrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                    
                })
                
                TodoStore.setIsLoadData(false);
            });
        }
        orgid = reactLocalStorage.get('userid');
       
    }


    render() {
        const TodoStore = this.props.TodoStore;
        var { records } = this.state;
        
        const loadRecords=()=>{
            if(TodoStore.getIsLoadData===true){
                fetch(TodoStore.getPort+'officerrouter/')
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
            var url = port+"officerrouter/"+id;
            axios.delete(url)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else  if (res.data === '101') {
                            type="Success";
                            description="Officer successfully deleted";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                            TodoStore.setCancelModal(false);
                            TodoStore.setIsLoadData(true);
                            loadRecords();
                        }
                    });

        }
        const updateRecord = () => {
            var id = TodoStore.getUpdateRecordId;
            var position = TodoStore.getPosition;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var middlename = TodoStore.getMiddlename;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if ((lastname.length === 0)|| (firstname.length === 0)
            || (middlename.length === 0)|| (position.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                TodoStore.setIsLoading(true);
                const account = {
                    lastname:lastname,
                    firstname:firstname,
                    middlename:middlename,
                    position:position
                }
                var port = TodoStore.getPort;
                var url = port+"officerrouter/update/"+id;

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
                            description="Officer information successfully updated";
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
                TodoStore.setMiddlename2(record.middlename);
                TodoStore.setLastname2(record.lastname);
                TodoStore.setFirstname2(record.firstname);
                TodoStore.setPosition2(record.position);
            });
        }
       
        const dataSource = [];

        records.map((records)=>{ 
            if(records.orgid===orgid){
                dataSource.push({
                    key: records._id,
                    lastname: records.lastname,
                    firstname: records.firstname,
                    middlename: records.middlename,
                    position: records.position,
                    orgid: records.orgid,
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
            } else if (TodoStore.filter === 'Middle Name') {
                return records.middlename.indexOf(TodoStore.search) >= 0
            }else if (TodoStore.filter === 'Position') {
                return records.position.indexOf(TodoStore.search) >= 0
            }

        }).map((record, index) => {
            i++;
           if ((index >= starts) && (index < ends)) {
            return(
                <tr>
                <td>{i}</td>
                <td>{record.position}</td>
                <td>{record.lastname+', '+record.firstname+' '+record.middlename}</td>
                <td>
                    <Button onClick={(event)=>getUpdateRecordId(record.key)} style={{
                        color: '#ffffff',
                        backgroundColor: '#52c41a'
                    }}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                   
                    <Popconfirm placement="topLeft" title={"Remove this record?"} onConfirm={(event)=>removeRecord(record.key)} okText="Yes" cancelText="No">
                        <Button style={{
                            color: '#ffffff',
                            backgroundColor: '#f5222d'
                        }}>
                            <i className="fa fa-trash"></i>
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
                                List of Officers
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
                                            width: '10%'
                                        }}>#</th>
                                        <th style={{
                                            width: '25%'
                                        }}>Position</th>
                                        <th style={{
                                            width: '35%'
                                        }}>Name</th>
                                        <th style={{
                                            width: '30%'
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
                                backgroundColor: '#2a166f',
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

RecordTable.propTypes = {

};

export default RecordTable;