import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Tooltip, notification, Col, Row, Spin, Skeleton } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

var posorgid = 0;
var link='';
var fullname='';
var memberrealty='';
var localorg='';
var profiles='';
var i=0;
var j=0;
@inject('TodoStore')
@observer
class Individual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            expertise: [],
            member:[],
            realty:[],
            interest:[],
            users:[],
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        TodoStore.setIsLoading(true);
        fetch(TodoStore.getPort + 'orgrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    orgs: json,
                })
            });
            fetch(TodoStore.getPort + 'accountrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    users: json,
                })
            });
        fetch(TodoStore.getPort + 'expertiserouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    expertise: json,
                })
            });
        fetch(TodoStore.getPort + 'interestrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    interest: json,
                })
        });
        fetch(TodoStore.getPort + 'memberrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    member: json,
                })
            });
        fetch(TodoStore.getPort + 'realtyrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    realty: json,
                })
        });
            TodoStore.setIsLoading(false);
            link=this.props.member;
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { orgs, expertise,member,realty,interest,users } = this.state;
        const dataSource = [];
        const dataExpertise = [];
        const dataMember = [];
        const dataInterest = [];

        j=0;
        i=0;
        member.map((records) => {

            if(records.link===link){
                var user = records.userid;
                var orgids=records.orgid;
                var orgaccr='';
                var orgname='';
                var realtys='';
                var profile='';
              

                orgs.map((records) => {
                    if(records.userid===orgids){
                        orgaccr=records.orgaccr;
                        orgname=records.orgname;
                    }
                });
                
                realty.map((records) => {
                    console.log("This is: "+records.userid);
                    if(records.userid===user){
                        realtys=records.realty;
                        
                    }
                });

                users.map((records) => {
                    if(records._id===user){
                        profile=records.profile;
                       
                    }
                });

                dataMember.push({
                    key: records._id,
                    lastname: records.lastname,
                    firstname: records.firstname,
                    middlename: records.middlename,
                    orgid: records.orgid,
                    orgaccr: orgaccr,
                    realty:realtys,
                    orgname: orgname,
                    profile: profile,
                    status:records.status
    
                })

                expertise.map((records) => {
                    if(records.userid===user){
                        dataExpertise.push({
                            key: records._id,
                            userid: records.userid,
                            expertise:records.expertise
            
                        })
                    }
                })

                interest.map((records) => {
                    if(records.userid===user){
                        dataInterest.push({
                            key: records._id,
                            userid: records.userid,
                            interest:records.interest
            
                        })
                    }
                })
            }
        });
       console.log(dataExpertise);
        const newrecords = dataMember.filter(records => {
            return records;

        }).map((record, index) => {
            fullname=record.lastname+", "+record.firstname+" "+record.middlename;
            localorg=record.orgaccr+" ( "+record.orgname+" )";
            memberrealty=record.realty;
            profiles=record.profile;
        })

        const newexpertise = dataExpertise.filter(records => {
            return records;
        }).map((record, index) => {
            j++;
           return(
            <Col key={record.key} span={24}>
                <Row>
                    <Col span={8}>
                
                    </Col>
                    <Col span={16}>
                        <h4 style={{
                            fontFamily:'Open Sans,sans-serif',
                            fontSize:'1em',
                            color:'#000000',
                            fontWeight:'500'
                        }}>
                            {j+". "+record.expertise}
                            </h4> 
                    </Col>                                      
                </Row>
            </Col>
           )
        })

        const newinterest = dataInterest.filter(records => {
            return records;
        }).map((record, index) => {
            i++;
           return(
            <Col key={record.key} span={24}>
                <Row>
                    <Col span={8}>
                
                    </Col>
                    <Col span={16}>
                        <h4 style={{
                            fontFamily:'Open Sans,sans-serif',
                            fontSize:'1em',
                            color:'#000000',
                            fontWeight:'500'
                        }}>
                            {i+". "+record.interest}
                            </h4> 
                    </Col>                                      
                </Row>
            </Col>
           )
        })

        return (
            <React.Fragment>
                <Row>
                <Skeleton loading={TodoStore.getIsLoading}>  
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
                                    <img src={profiles}
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
                                                <Col span={8}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Name
                                                    </h4> 
                                                </Col>
                                                <Col span={16}>
                                                    <h4 style={{
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontSize:'1em',
                                                        color:'#000000',
                                                        fontWeight:'500'
                                                    }}>
                                                        : {fullname}
                                                        </h4> 
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={8}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Local Organization
                                                    </h4> 
                                                </Col>
                                                <Col span={16}>
                                                    <h4 style={{
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontSize:'1em',
                                                        color:'#000000',
                                                        fontWeight:'500'
                                                    }}>
                                                        : {localorg}
                                                        </h4> 
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={8}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                    Realty
                                                    </h4> 
                                                </Col>
                                                <Col span={16}>
                                                    <h4 style={{
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontSize:'1em',
                                                        color:'#000000',
                                                        fontWeight:'500'
                                                    }}>
                                                        : {memberrealty}
                                                        </h4> 
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Row>
                                                <Col span={8}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                   List of Expertise
                                                    </h4> 
                                                </Col>
                                                <Col span={16}>
                                                    
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        {newexpertise}
                                      
                                        <Col span={24} style={{
                                            marginTop:'2em'
                                        }}>
                                            <Row>
                                                <Col span={8}>
                                                <h4 style={{
                                                    fontFamily:'Open Sans,sans-serif',
                                                    fontSize:'1em',
                                                    color:'#8c8c8c',
                                                    fontWeight:'700'
                                                }}>
                                                   List of other Business/Interest
                                                    </h4> 
                                                </Col>
                                                <Col span={16}>
                                                    
                                                </Col>                                      
                                            </Row>
                                        </Col>
                                        {newinterest}
                                    </Row>
                                </Col>
                                <Col span={4}>
                                </Col>
                            </Col>
                            
                        </Row>
                    </Col>
                    </Skeleton>  
                </Row>
                
            </React.Fragment>
        );
    }
}

Individual.propTypes = {

};

export default Individual;