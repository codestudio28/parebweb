import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import News from './News';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;

@inject('TodoStore')
@observer

class NewsSection extends Component {
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
        const getUser=(value)=>{
            var userid=value;
            const author = dataUser.filter(records => {
                return records.key.indexOf(userid) >= 0
            }).map((record, index) => {
                authors=record.firstname+' '+record.lastname;
            })
        } 
        const newrecords = dataSource.filter(records => {
            return records;
        }).map((record, index) => {
            if(record.status==="PUBLISHED"){
                getUser(record.userid);
                var link="/news/"+record.key;
                return (
                    <News banner={record.banner} 
                          date={record.datecreated} 
                          title={record.title}
                          author={authors}
                          link={link}
                    />
                )

            }
           
                // console.log(record.banner)
        })
        return (
            <React.Fragment>
                <Content style={{
                    minHeight: '37.5375em',
                    height:'auto',
                    backgroundColor: '#ffffff'

                }}>
                    <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={24}>
                                    <h4 style={{
                                        fontFamily: 'Open Sans,sans-serif',
                                        fontSize: '2.5em',
                                        lineHeight: '3em',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        textTransform: 'uppercase'
                                    }}>
                                        LATEST NEWS
                                    </h4>
                                </Col>
                                <Col span={24} style={{
                                    minHeight: '28.1375em',
                                    height: 'auto'
                                }}>
                                    <Row>
                                       {/* <News/>
                                       <News/>
                                       <News/> */}
                                       {newrecords}
                                      
                                    </Row>


                                </Col>
                                <Col span={24}
                                    style={{height: '1em'}}
                                >
                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}>
                        </Col>
                    </Row>
                </Content>
            </React.Fragment>
        );
    }
}

NewsSection.propTypes = {

};

export default NewsSection;