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
            user:[],
            accounts: [],
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
                    user: json,
                })
               
            });

            fetch('http://localhost:8080/memberrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    accounts: json,
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
        var { accounts,org,user } = this.state;
        const dataSource = [];
        const dataOrg=[];
        const dataUser=[];
        
        const loadRecords=()=>{
            if(TodoStore.getIsLoadData===true){
                fetch('http://localhost:8080/accountrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        user: json,
                    })
                   
                });
    
                fetch('http://localhost:8080/memberrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        accounts: json,
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
        const removeRecord=(value,userids)=>{
            var id = value;
            var userid = userids;

            var type="";
            var description="";
            var icontype="";
            var colors="";

            var port = TodoStore.getPort;
            var url = port+"accountrouter/retrieve/"+id;
            var status="ACTIVE";
            TodoStore.setIsLoading(true);
            const account = {
                status:status
            }
            axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            TodoStore.setIsLoading(false);
                            openNotification(type,description,icontype,colors);

                        } else  if (res.data === '101') {
                            removeMember(userid);
                            
                        }
                    });

        }
        const removeMember=(value)=>{
            var id = value;
            var type="";
            var description="";
            var icontype="";
            var colors="";

            var port = TodoStore.getPort;
            var url = port+"memberrouter/retrieve/"+id;
            var status="ACTIVE";
            const account = {
                status:status
            }
            axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";  
                            TodoStore.setIsLoading(false);  
                            openNotification(type,description,icontype,colors);

                        } else  if (res.data === '101') {
                            type="Success";
                            description="Member successfully retrieved";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                            TodoStore.setCancelModal(false);
                            TodoStore.setIsLoading(false);
                            TodoStore.setIsLoadData(true);
                            loadRecords();
                        }
                    });
        }
       
       
       
        user.map((records) => {
            var userid=records._id;
            var mainid='';
            var orgaccr='';
            var orgid='';
            var memberid='';
            if((records.usertype==="member")&&(records.status==="REMOVED")){
                accounts.map((records) => {
                    if(userid===records.userid){
                        memberid=records.userid;
                        mainid=records._id;
                        orgid=records.orgid;
                        org.map((records) => {
                            if(orgid===records.userid){
                               orgaccr=records.orgaccr;
                           }
                        });
                    }
                })
                dataSource.push({
                    key: records._id,
                    userid: memberid,
                    orgid:orgid,
                    orgaccr: orgaccr,
                    mainid: mainid,
                    email: records.email,
                    firstname: records.firstname,
                    middlename: records.middlename,
                    lastname: records.lastname,
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
            } else if (TodoStore.filter === 'Middle Name') {
                return records.middlename.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Email') {
                return records.email.indexOf(TodoStore.search) >= 0
            }else if (TodoStore.filter === 'Organization') {
                return records.orgaccr.indexOf(TodoStore.search) >= 0
            }

        }).map((record, index) => {
           i++;
           if ((index >= starts) && (index < ends)) {
              
            return(
                <tr key={i}>
                <td>{i}</td>
                <td>{record.email}</td>
                <td>{record.lastname+', '+record.firstname+' '+record.middlename}</td>
                <td>{record.orgaccr}</td>
                <td>
                    <Popconfirm placement="topLeft" title={"Retrieve this record?"} onConfirm={(event)=>removeRecord(record.key,record.mainid)} okText="Yes" cancelText="No">
                        <Button style={{
                            color: '#ffffff',
                            backgroundColor: '#722ed1'
                        }}>
                            {TodoStore.getIsLoading &&
                                <Icon type="loading"/>
                            }
                            {!TodoStore.getIsLoading &&
                                 <i className="fa fa-sync"></i>
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
                                List of Removed Member
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
                                            width: '20%'
                                        }}>Email</th>
                                        <th style={{
                                            width: '30%'
                                        }}>Name</th>
                                        <th style={{
                                            width: '25%'
                                        }}>Organization</th>
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
                   
                </Col>
            </React.Fragment>
        );
    }
}

RecordTable.propTypes = {

};

export default RecordTable;