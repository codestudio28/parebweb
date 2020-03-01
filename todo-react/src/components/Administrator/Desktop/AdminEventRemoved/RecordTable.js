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
            fetch('http://localhost:8080/eventrouter/')
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
                fetch('http://localhost:8080/eventrouter/')
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
            var url = port+"eventrouter/retrieve/"+id;
            var status="DRAFT";
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
                            description="Event successfully retieved";
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
      
       
        const dataSource = [];

        records.map(records => (
            dataSource.push({
                key: records._id,
                title: records.title,
                dates:records.dates,
                content: records.content,
                banner: records.banner,
                times: records.times,
                place: records.place,
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
            } else if (TodoStore.filter === 'Date') {
                return records.dates.indexOf(TodoStore.search) >= 0
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
                <td style={{
                    paddingLeft:'0.5em'
                }}>{record.title}</td>
                <td>{record.dates+' / '+record.times}</td>
                <td>{record.place}</td>
                <td>{record.status}</td>
              
                <td>
                    <Popconfirm placement="topLeft" title={"Retrieve this record?"} onConfirm={(event)=>removeRecord(record.key)} okText="Yes" cancelText="No">
                        <Button style={{
                            color: '#ffffff',
                            backgroundColor: '#722ed1'
                        }}>
                            {TodoStore.getIsLoading &&
                                 <Icon type="loading" />        
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
                                List of News
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
                                            width: '20%',
                                            paddingLeft:'0.5em'

                                        }}>Title</th>
                                        <th style={{
                                            width: '15%'
                                        }}>Event Date/Time</th>
                                        <th style={{
                                            width: '10%'
                                        }}>Event Place</th>
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