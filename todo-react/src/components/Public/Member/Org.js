import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Tooltip, notification, Col, Row, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

var posorgid = 0;
@inject('TodoStore')
@observer
class Org extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            officer: [],
            member:[],
            network:[]
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        TodoStore.setIsLoading(true);
        fetch(TodoStore.getPort + 'orgrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                })
            });
        fetch(TodoStore.getPort + 'officerrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    officer: json,
                })
            });
        fetch(TodoStore.getPort + 'memberrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    member: json,
                })
            });
        fetch(TodoStore.getPort + 'networkrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    network: json,
                })
        });
            TodoStore.setIsLoading(false);
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { records, officer,member,network } = this.state;
        const dataSource = [];
        const dataOfficer = [];
        const dataMember = [];
        const dataNetwork = [];

        records.map(records => (
            dataSource.push({
                key: records._id,
                email: records.email,
                userid: records.userid,
                logo: records.logo,
                president: records.president,
                orgaccr: records.orgaccr,
                orgname: records.orgname,
                city: records.city,
                province: records.province,

            })
        ));
        officer.map(records => (
            dataOfficer.push({
                key: records._id,
                lastname: records.lastname,
                firstname: records.firstname,
                middlename: records.middlename,
                position: records.position,
                orgid: records.orgid,

            })
        ));
        member.map(records => (
            dataMember.push({
                key: records._id,
                lastname: records.lastname,
                firstname: records.firstname,
                middlename: records.middlename,
                orgid: records.orgid,
                status:records.status

            })
        ));

        network.map(records => (
            dataNetwork.push({
                key: records._id,
                network: records.network,
                orgid: records.userid,

            })
        ));

        const newnetwork = dataNetwork.filter(records => {
            return records.orgid.indexOf(posorgid) >= 0

        }).map((record, index) => {
            return (
                <React.Fragment>
                    <Col key={record.key} span={24} style={{
                        height: '2em'
                    }}>
                        <Row>
                            <Col span={2}>
                            </Col>
                           
                            <Col span={22}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    fontSize: '1em',
                                    color: '#000000',
                                    fontWeight: '500'
                                }}>
                                    <i className="fa fa-dot-circle" 
                                    style={{
                                        color:'#8c8c8c',
                                        fontSize:'0.75em'
                                    }}></i>&nbsp;&nbsp;{record.network}
                                </h4>
                            </Col>
                        </Row>
                    </Col>
                </React.Fragment>
            )
        })

        const newmember = dataMember.filter(records => {
            return records.orgid.indexOf(posorgid) >= 0

        }).map((record, index) => {
           
            return (
                <React.Fragment>
                    <Col key={record.key} span={24} style={{
                        height: '2em'
                    }}>
                        <Row>
                            <Col span={2}>
                            </Col>
                           
                            <Col span={22}>
                              {record.status==="ACTIVE" &&
                                <React.Fragment>
                                   <NavLink to="/">
                                     <h4 style={{
                                        fontFamily: 'Open Sans,sans-serif',
                                        fontSize: '1em',
                                        color: '#2f54eb',
                                        fontWeight: '500'
                                    }}>
                                        {record.firstname + ' ' + record.middlename + ' ' + record.lastname}
                                    </h4>
                                    </NavLink> 

                                </React.Fragment>
                               
                              }
                              {record.status!=="ACTIVE" &&
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    fontSize: '1em',
                                    color: '#000000',
                                    fontWeight: '500'
                                }}>
                                    {record.firstname + ' ' + record.middlename + ' ' + record.lastname}
                                </h4>
                              }
                                
                            </Col>
                        </Row>
                    </Col>
                </React.Fragment>
            )
        })

        const newofficer = dataOfficer.filter(records => {
            return records.orgid.indexOf(posorgid) >= 0

        }).map((record, index) => {
            return (
                <React.Fragment>
                    <Col key={record.key} span={24} style={{
                        height: '2em'
                    }}>
                        <Row>
                            <Col span={2}>
                            </Col>
                            <Col span={8}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    fontSize: '1em',
                                    color: '#8c8c8c',
                                    fontWeight: '500'
                                }}>
                                    {record.position}
                                </h4>
                            </Col>
                            <Col span={14}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    fontSize: '1em',
                                    color: '#000000',
                                    fontWeight: '500'
                                }}>
                                    {': ' + record.firstname + ' ' + record.middlename + ' ' + record.lastname}
                                </h4>
                            </Col>
                        </Row>
                    </Col>
                </React.Fragment>
            )
        })



        const newrecords = dataSource.filter(records => {
            return records.orgaccr.indexOf(this.props.orgname) >= 0

        }).map((record, index) => {
            posorgid = record.userid;
            return (
                <Row>
                    <Col span={24} style={{
                        height: 'auto',
                        textAlign: 'center'
                    }}>
                        <center><img src={record.logo}
                            style={{
                                width: '8em'
                            }} />
                        </center>
                    </Col>
                    <Col span={24} style={{
                        height: 'auto',
                        textAlign: 'left',
                        marginTop: '1em'
                    }}>
                        <h4 style={{
                            fontFamily: 'Open Sans,sans-serif',
                            fontSize: '1em',
                            fontWeight: '700'
                        }}>
                            Organization's Name:&nbsp;&nbsp;
                           <span style={{ fontWeight: '100' }}>
                                {record.orgname}
                            </span>
                        </h4>
                    </Col>
                    <Col span={24} style={{
                        height: 'auto',
                        textAlign: 'left'
                    }}>
                        <h4 style={{
                            fontFamily: 'Open Sans,sans-serif',
                            fontSize: '1em',
                            fontWeight: '700'
                        }}>
                            Locations:&nbsp;&nbsp;
                           <span style={{ fontWeight: '100' }}>
                                {record.city + ', ' + record.province}
                            </span>
                        </h4>
                    </Col>


                </Row>
            )
        });

        return (
            <React.Fragment>
                <Row>
                    <Col span={24} style={{
                        minHeight: '40em',
                        height: 'auto'
                    }}>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                <Row>
                                    {newrecords}
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '700'
                                        }}>
                                            Officers:&nbsp;&nbsp;
                           <p style={{ fontWeight: '100' }}>

                                            </p>
                                        </h4>
                                    </Col>
                                    
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>

                                        {TodoStore.getIsLoading &&
                                             <Spin size="small" />
                                        }
                                        {!TodoStore.getIsLoading &&
                                            newofficer
                                        }
                                    </Col>
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '700'
                                        }}>
                                            Network/Affiliations:&nbsp;&nbsp;
                                                <p style={{ fontWeight: '100' }}>
                                            </p>
                                        </h4>
                                    </Col>
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>
                                        {TodoStore.getIsLoading &&
                                             <Spin size="small" />
                                        }
                                        {!TodoStore.getIsLoading &&
                                            newnetwork  
                                        }
                                        
                                    </Col>
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '700'
                                        }}>
                                            Members:&nbsp;&nbsp;
                                                <p style={{ fontWeight: '100' }}>
                                            </p>
                                        </h4>
                                    </Col>
                                    <Col span={24} style={{
                                        height: 'auto',
                                        textAlign: 'left'
                                    }}>
                                        {TodoStore.getIsLoading &&
                                             <Spin size="small" />
                                        }
                                        {!TodoStore.getIsLoading &&
                                            newmember
                                        }
                                        
                                    </Col>
                                </Row>

                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Org.propTypes = {

};

export default Org;