import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout,Row, Col } from 'antd';
import Events from './Events';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

@inject('TodoStore')
@observer
class EventSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            user:[]
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        fetch(TodoStore.getPort + 'eventrouter/')
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

            var dt = moment("2020-01-24", "YYYY-MM-DD");
            console.log(dt);
            console.log(dt.format('dddd'));
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
                dates : records.dates,
                content: records.content,
                banner: records.banner,
                times: records.times,
                description:records.description,
                place: records.place,
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
                var dt = moment(record.dates, "YYYY-MM-DD");
                // console.log(dt.format('dddd'));
                var dayname=dt.format('dddd');
                var days=dt.format('DD');
                var months=dt.format('MMM');
                var content=((record.description).substring(0, 272)+'...');
                var link="/events/"+record.key;
                return (
                    <Events banner={record.banner} 
                        //   dates={record.dates} 
                           title={record.title}
                           daytime={dayname+', '+record.times}
                           place={record.place}
                           author={authors}
                           days={days}
                           months={months.toUpperCase()}
                           content={content}
                          link={link}
                    />
                    // console.log(record.banner)
                )
            }
           
        })
        return (
            <React.Fragment>
                 <Content style={{
                    minHeight:'25.775em',
                    height:'auto'
                }}>
                    <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={24} style={{height:'9.4em'}}>
                                    <Row>
                                        <Col span={12} style={{ height:'9.4em'}}>
                                            <h4 style={{fontSize:'2.5em',
                                                        fontFamily:'Open Sans,sans-serif',
                                                        fontWeight:'700',
                                                        textTransform:'uppercase',
                                                        paddingTop:'1.25em'
                                                        }}>
                                                Upcoming Events
                                            </h4>
                                        </Col>
                                        <Col span={12} style={{ height:'9.4em'}}>
                                        <NavLink to="/events"><div  style={{width:'15em',
                                                         backgroundColor:'#2a166f',
                                                         height:'5em',
                                                         color:'#ffffff',
                                                         textAlign:'center',
                                                         letterSpacing:'1px',
                                                         fontWeight:'700',
                                                         lineHeight:'1.25em',
                                                         fontSize:'0.875em',
                                                         padding:'2em 1.4375em 2em 1.4375em',
                                                         textTransform:'uppercase',
                                                         marginLeft:'30em',
                                                         marginTop:'2em',
                                                         fontFamily:'Open Sans,sans-serif'}}>
                                                View All Events
                                            </div></NavLink>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* Event */}
                               {newrecords}
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

EventSection.propTypes = {

};

export default EventSection;