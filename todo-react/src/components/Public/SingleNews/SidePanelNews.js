import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Pagination, Avatar, Comment, Form, Button, List, Input, Tooltip } from 'antd';
import News from './News';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
var i=0;

@inject('TodoStore')
@observer
class SidePanelNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            user:[]
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        fetch(TodoStore.getPort + 'newsrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                })
            });
            fetch(TodoStore.getPort + 'accountrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    user: json,
                })
            });
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { records,user} = this.state;
        const dataSource = [];
        const dataUser = [];

        i = 0;
        var starts = 0;
        var ends = 0;

        var display = TodoStore.getDisplay;
        var page = TodoStore.getPage;


        ends = parseInt(page) * parseInt(display);
        starts = ends - parseInt(display);

        records.map(records => (
            dataSource.push({
                key: records._id,
                title : records.title,
                content: records.content,
                banner: records.banner,
                userid: records.userid,
                datecreated: records.datecreated,
                status: records.status
               
            })
        ));
        user.map(records => (
            dataUser.push({
                key: records._id,
                lastname : records.lastname,
                firstname: records.firstname,
                profile: records.profile
             
               
            })
        ));
      
        var authors='';
        var profile='';
        const getUser=(value)=>{
            var userid=value;
            const author = dataUser.filter(records => {
                return records.key.indexOf(userid) >= 0
            }).map((record, index) => {
                authors=record.firstname+' '+record.lastname;
                profile=record.profile;
            })
        } 
        const newrecords = dataSource.filter(records => {
            return records;
        }).map((record, index) => {
            if((index >= starts) && (index < ends) && (record.status==="PUBLISHED")
            && (record.key!==TodoStore.getArticleId)){
                getUser(record.userid);
                var link="/news/"+record.key;
                return (
                    <React.Fragment>
                        <Col span={24} style={{
                        minHeight: '1em',
                        height: 'auto',
                        borderBottom: '1.5px solid',
                        borderColor: '#bfbfbf'
    
                    }}>
    
                        <Row>
                            <Col span={4} style={{
                                minHeight: '3em',
                                height: 'auto',
                                paddingTop: '0.5em',
                                textAlign: 'center'
                            }}>
                                <Avatar src={profile}
                                    style={{
                                        width: '2.5em',
                                        height: '2.5em'
                                    }}></Avatar>
                            </Col>
                            <Col span={20} style={{
                                minHeight: '3em',
                                height: 'auto'
    
                            }}>
                                <Row>
                                    <Col span={24} style={{
                                        minHeight: '2em',
                                        height: 'auto',
                                        paddingTop: '0.3em'
                                    }}>
                                        <NavLink to={link}><h4 style={{
                                            fontSize: '1em',
                                            fontFamily: 'Open Sans, sans-serif'
                                        }}>
                                            {record.title}
                                                                    </h4>
                                        </NavLink>
                                    </Col>
                                    <Col span={24} style={{
                                        minHeight: '1em',
                                        height: 'auto',
                                        textAlign: 'right'
                                    }}>
                                        <h4 style={{
                                            fontSize: '0.75em',
                                            fontFamily: 'Open Sans, sans-serif'
                                        }}>
                                           {record.datecreated}
                                                                    </h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                    </React.Fragment>
                )
            }
           
        })
        return (
            <React.Fragment>
                {newrecords}
            </React.Fragment>
        );
    }
}

SidePanelNews.propTypes = {

};

export default SidePanelNews;