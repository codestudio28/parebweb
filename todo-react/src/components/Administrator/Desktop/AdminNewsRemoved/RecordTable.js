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
            fetch('http://localhost:8080/newsrouter/')
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
                fetch('http://localhost:8080/newsrouter/')
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
            var url = port+"newsrouter/remove/"+id;
            var status="DRAFT";
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
                            TodoStore.setIsLoading(false);
                            type="Success";
                            description="News successfully retrieved";
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
            // TodoStore.setUpdateRecordId(value);
            // TodoStore.setUpdateRecordModal();
            dataSource.filter(records => {
                return records.key.indexOf(value) >= 0
            }).map((record, index) => {
                TodoStore.setTitle2(record.title);
                TodoStore.setContent2(record.content);
                TodoStore.setImageURL(record.banner);
                TodoStore.setArticleId(record.key);
            });
            TodoStore.setUpdateNews(true);
            TodoStore.setIsCreateNews(true);

        }
        const gotoSingleNews=(value)=>{
            window.open("/news/"+value);
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

        records.map(records => (
            dataSource.push({
                key: records._id,
                title: records.title,
                content: records.content,
                banner: records.banner,
                datecreated: records.datecreated,
                status: records.status,

            })
            
        ));
        i = 0;
        var starts = 0;
        var ends = 0;

        var display = TodoStore.getDisplay;
        var page = TodoStore.getPage;


        ends = parseInt(page) * parseInt(display);
        starts = ends - parseInt(display);


        const newrecords = dataSource.filter(records => {
            if (TodoStore.filter === 'All') {
                return records.title.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Title') {
                return records.title.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Date Created') {
                return records.datecreated.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Status') {
                return records.status.indexOf(TodoStore.search) >= 0
            } 
        }).map((record, index) => {
           i++;
           if ((index >= starts) && (index < ends) && (record.status==="REMOVED")) {
            return(
                <tr>
                <td>{i}</td>
                <td><img src={record.banner}
                        style={{
                            width:'98%'
                        }}
                    />
                </td>
                <td>{record.title}</td>
                <td>{record.datecreated}</td>
                <td>{record.status}</td>
              
                <td>
                    <Popconfirm placement="topLeft" title={"Retrieve this record?"} onConfirm={(event)=>removeRecord(record.key)} okText="Yes" cancelText="No">
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
                                List of Removed News
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
                                        }}>Banner</th>
                                         <th style={{
                                            width: '25%'
                                        }}>Title</th>
                                        <th style={{
                                            width: '20%'
                                        }}>Date Created</th>
                                        <th style={{
                                            width: '10%'
                                        }}>Status</th>
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
                  
                </Col>
            </React.Fragment>
        );
    }
}

RecordTable.propTypes = {

};

export default RecordTable;