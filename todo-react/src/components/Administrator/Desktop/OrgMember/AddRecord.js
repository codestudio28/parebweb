import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon,Select } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
const { Option } = Select;
@inject('TodoStore')
@observer
class AddRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            org:[]
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
               
            });

            fetch('http://localhost:8080/orgrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    org: json,
                    
                })
                TodoStore.setIsLoadData(false);
            });
        }
       
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { records,org } = this.state;
        const dataSource = [];
        const dataOrg=[];
       
        records.map((records) => {
            if(records.usertype==="member"){
                dataSource.push({
                    key: records._id,
                    usertype: records.usertype,
                    email: records.email,
                    profile: records.profile,
                    lastname: records.lastname,
                    firstname: records.firstname,
                    middlename: records.middlename,
                    datecreated: records.datecreated,
                    status: records.status,
                })
            }
        });
        org.map((records) => {
            dataOrg.push({
                key: records._id,
                userid: records.userid,
                logo: records.logo,
                orgaccr: records.orgaccr,
                orgname: records.orgname,
                city: records.city,
                province: records.province,
            })
        });
       
        const neworg = dataOrg.filter(records => {
            return records;
        }).map((record, index) => {
           return(
                 <Option key={record.key} style={{
                    fontFamily:'Open Sans,sans-serif'
                 }} value={record.userid}>{record.orgaccr}</Option>
           )

        })

        const filterMember=()=>{
            var checkmatch=0;
            var email = TodoStore.getEmail;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var middlename = TodoStore.getMiddlename;
            var org = reactLocalStorage.get('userid');

            var type="";
            var description="";
            var icontype="";
            var colors="";

            if ((org.length === 0) ||(email.length === 0) || (lastname.length === 0)|| (firstname.length === 0) || (middlename.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                records.map((records) => {
                    if(records.usertype==="member"){
                        if((records.lastname===lastname)&&(records.firstname===firstname)&&(records.middlename===middlename)){
                            checkmatch=1;
                        }else{
                            
                        }
                       
                    }
                });
                if(checkmatch===1){
                    type="Warning";
                    description="This member is already in the list";
                    icontype="warning";
                    colors="#ffc53d";    
                    openNotification(type,description,icontype,colors);
                }else{
                    addRecord();
                }
            }

           
        }
    
        const addRecord=()=>{
            var org = reactLocalStorage.get('userid');
            var today = new Date();
            var email = TodoStore.getEmail;
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var middlename = TodoStore.getMiddlename;
            var usertype="member";
            var password="1234567";
            var profile="https://res.cloudinary.com/lipacity/image/upload/v1581656466/201912240254avatar_eoq2pa.png";
            var datecreated=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var status="NOTACTIVE";

            var type="";
            var description="";
            var icontype="";
            var colors="";
           
                TodoStore.setIsLoading(true);
                const account = {
                    email: email,
                    lastname:lastname,
                    firstname:firstname,
                    middlename:middlename,
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
                            
                        } else {
                            console.log(res.data);
                            addMember(res.data);
                        //   window.open("admin-list-admin","_self");
                        }
                    });
            
        }
        const addMember=(value)=>{
            var userid=value;
            var org = reactLocalStorage.get('userid');
            var lastname = TodoStore.getLastname;
            var firstname = TodoStore.getFirstname;
            var middlename = TodoStore.getMiddlename;
            var status="NOTACTIVE";
            var type="";
            var description="";
            var link="NoLink";
            var icontype="";
            var colors="";
            const account = {
                userid: userid,
                link: link,
                lastname:lastname,
                firstname:firstname,
                middlename:middlename,
                orgid:org,
                status:status
              
            }
            var port = TodoStore.getPort;
            var url = port+"memberrouter/add";
            axios.post(url, account)
                    .then(res => {
                        TodoStore.setIsLoading(false);
                        type="Success";
                        description="New member successfully added";
                        icontype="check";
                        colors="#73d13d";    
                        openNotification(type,description,icontype,colors);
                       TodoStore.setCancelModal(false);
                       window.open("org-member","_self");
                    });
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
                        &nbsp;Add Member</Button>

                    {/* Update Record */}
                    <Modal
                        style={{
                            fontFamily:'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getAddRecordModal}
                        title="Add New Member"
                        onOk={filterMember}
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
                            }} onClick={filterMember}>
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
                           <Col span={24} style={{ paddingTop: '0.5em' }}>
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
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} 
                                value={TodoStore.getMiddlename}
                                onChange={TodoStore.setMiddlename}
                                />
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