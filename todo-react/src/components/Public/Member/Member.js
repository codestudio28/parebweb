import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Tooltip, notification, Col, Row, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

var posorgid = 0;
@inject('TodoStore')
@observer
class Member extends Component {
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

       




        return (
            <React.Fragment>
                <Row>
                    <Col span={24} style={{
                        minHeight: '40em',
                        height: 'auto'
                    }}>
                        <Row>
                            <Col span={24} style={{
                            minHeight: '12em',
                            height: 'auto'
                            }}>
                                <Col span={4}>
                                </Col>
                                <Col span={16} style={{
                                    minHeight:'12em',
                                    height:'auto',
                                    paddingTop:'1em'
                                }}>
                                    <center>
                                    <img src="https://res.cloudinary.com/lipacity/image/upload/v1581656466/201912240254avatar_eoq2pa.png"
                                        style={{
                                            width:'10em',
                                            height:'10em',
                                            borderRadius:'50%'
                                        }}
                                    />
                                    </center>
                                </Col>
                                <Col span={4}>
                                </Col>
                            </Col>
                            <Col span={24} style={{
                            minHeight: '12em',
                            height: 'auto'
                            }}>
                                <Col span={4}>
                                </Col>
                                <Col span={16} style={{
                                    minHeight:'12em',
                                    height:'auto',
                                    paddingTop:'1em'
                                }}>
                                    <Row>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={4}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Name
                                                    </h4> 
                                                </Col>
                                                <Col span={20}>
                                                    <h4 style={{
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontSize:'1em',
                                                        color:'#000000',
                                                        fontWeight:'500'
                                                    }}>
                                                        : Jerwin Cruz
                                                        </h4> 
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={4}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Name
                                                    </h4> 
                                                </Col>
                                                <Col span={20}>
                                                    <h4 style={{
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontSize:'1em',
                                                        color:'#000000',
                                                        fontWeight:'500'
                                                    }}>
                                                        : Jerwin Cruz
                                                        </h4> 
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4}>
                                </Col>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Member.propTypes = {

};

export default Member;