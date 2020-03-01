import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Pagination, Avatar, Comment, Form, Button, List, Input, Tooltip } from 'antd';
import News from './News';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import SidePanelEvent from './SidePanelEvent';
// import SidePanelNews from './SidePanelNews';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
var i=0;
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
        var dayname='';
        var dates='';
        var times='';
        var banner='';
        var title='';
        var content='';
        var place='';
        var authors='';
        var profile='';
        var link='';
        const getUser=(value)=>{
            var userid=value;
            const author = dataUser.filter(records => {
                return records.key.indexOf(userid) >= 0
            }).map((record, index) => {
                authors=record.firstname+' '+record.lastname;
            })
        } 
        const getProfile=(value)=>{
            var userid=value;
            const author = dataUser.filter(records => {
                return records.key.indexOf(userid) >= 0
            }).map((record, index) => {
                profile=record.profile;
            })
        } 
        const sideevent = dataSource.filter(records => {
            return records;
        }).map((record, index) => {
            
            if((record.status==="PUBLISHED")&&(record.key!==this.props.event)){
                i++;
                link = record.key;
                getProfile(record.userid)
                return(
                    <React.Fragment>
                        <SidePanelEvent 
                            title={record.title}
                            dates={record.dates}
                            place={record.place}
                            profile={profile}
                            link={link}/>
                    </React.Fragment>
                )
            }
        })

        const getEvent =(value)=>{
            dataSource.filter(records => {
                return records;
            }).map((record, index) => {
                if(record.key===value){
                    getUser(record.userid);
                    var dt = moment(record.dates, "YYYY-MM-DD");
                    // console.log(dt.format('dddd'));
                    dates=record.dates;
                    times=record.times;
                    dayname=dt.format('dddd');
                    banner=record.banner;
                    title=record.title;
                    place=record.place;
                    content=record.content;
                }
              
                
            })
        }
       
        return (
            <React.Fragment>
                <Content style={{
                    minHeight: '37.5375em',
                    height: 'auto',
                    backgroundColor: '#f5f5f5'

                }}>
                    {getEvent(this.props.event)}
                    <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={24} style={{
                                    marginTop: '1em'
                                }}>

                                </Col>
                                <Col span={24} style={{
                                    minHeight: '28.1375em',
                                    height: 'auto'
                                }}>

                                    <Col span={17} style={{
                                        minHeight: '28.1375em',
                                        height: 'auto',
                                        marginTop: '1em'
                                    }}>
                                        <Row>
                                            <Col span={24} style={{
                                                height: '24em'
                                            }}>
                                                <img style={{
                                                    width: '100%',
                                                    height: '24em'
                                                }}
                                                    src={banner} />
                                            </Col>
                                            <Col span={24} style={{
                                                height: '3em',
                                                paddingLeft: '1em',
                                                paddingTop: '0.5em'
                                            }}>
                                                <h4 style={{
                                                    fontFamily: 'Open Sans, sans-serif',
                                                    fontSize: '1.5em',
                                                    fontWeight: '700'
                                                }}>
                                                    {title}
                                           </h4>
                                            </Col>
                                            <Col span={24} style={{
                                                height: '3em',
                                                paddingLeft: '1em'
                                            }}>
                                                <Avatar src="https://res.cloudinary.com/lipacity/image/upload/v1581244829/avatar1_er4qlz.jpg"
                                                    style={{
                                                        width: '2.5em',
                                                        height: '2.5em',
                                                        float: 'left'
                                                    }}></Avatar>

                                                <h4 style={{
                                                    fontFamily: 'Open Sans, sans-serif',
                                                    fontSize: '1em',
                                                    float: 'left',
                                                    fontWeight: '700',
                                                    marginLeft: '0.5em',
                                                    marginTop: '0.75em',
                                                    color: '#000000'
                                                }}>
                                                    {authors}
                                           </h4>

                                                <i className="fa fa-calendar-alt"
                                                    style={{
                                                        fontSize: '1.5em',
                                                        float: 'left',
                                                        fontWeight: '700',
                                                        marginLeft: '2em',
                                                        marginTop: '0.25em',
                                                        color: '#000000'
                                                    }}
                                                >

                                                </i>
                                                <h4 style={{
                                                    fontFamily: 'Open Sans, sans-serif',
                                                    fontSize: '1em',
                                                    float: 'left',
                                                    fontWeight: '700',
                                                    marginLeft: '0.5em',
                                                    marginTop: '0.75em',
                                                    color: '#000000'
                                                }}>
                                                    {dates+' '+dayname+', '+times}
                                           </h4>
                                           <i className="fa fa-map-marker"
                                                    style={{
                                                        fontSize: '1.5em',
                                                        float: 'left',
                                                        fontWeight: '700',
                                                        marginLeft: '2em',
                                                        marginTop: '0.25em',
                                                        color: '#000000'
                                                    }}
                                                >

                                                </i>
                                                <h4 style={{
                                                    fontFamily: 'Open Sans, sans-serif',
                                                    fontSize: '1em',
                                                    float: 'left',
                                                    fontWeight: '700',
                                                    marginLeft: '0.5em',
                                                    marginTop: '0.75em',
                                                    color: '#000000'
                                                }}>
                                                   {place}
                                           </h4>
                                            </Col>

                                            <Col span={24} style={{
                                                borderBottom: '2px solid',
                                                borderColor: '#bfbfbf'
                                            }}>

                                            </Col>
                                            <Col span={24} style={{
                                                minHeight: '5em',
                                                height: 'auto',
                                                paddingTop: '2em',
                                                paddingLeft: '0.5em',
                                                paddingRight: '0.5em',
                                                textAlign: 'justify'
                                            }}>
                                               
                                               {ReactHtmlParser(content)}
                                            </Col>
                                            <Col span={12} style={{
                                                height: '3em',
                                                paddingLeft: '1em'
                                            }}>
                                            </Col>
                                           
                                        </Row>
                                    </Col>
                                    {/* Right Side */}
                                    <Col span={7} style={{
                                        minHeight: '28.1375em',
                                        height: 'auto',
                                        marginTop: '1em',
                                        paddingLeft: '1em',
                                        paddingRight: '1em',
                                        paddingTop: '1em'
                                    }}>
                                        <Row>
                                            {i>0 &&
                                                <React.Fragment>
                                                    <Col span={24} style={{
                                                minHeight: '3em',
                                                height: 'auto',
                                                borderBottom:'2px solid',
                                                borderColor:'#bfbfbf'

                                            }}>
                                                 <h4 style={{
                                                    fontSize: '1em',
                                                    fontFamily: 'Open Sans, sans-serif',
                                                    fontWeight:'700'
                                                }}>
                                                    Other Events
                                                                </h4>
                                            </Col>
                                           {sideevent}
                                           
                                           <Col span={24} style={{
                                                height: '2em',
                                                padding:'1em'
                                            }}>
                                                <Pagination
                                                current={TodoStore.getPage}
                                                total={(i / TodoStore.getDisplay) * 10}
                                                onChange={TodoStore.setPage} />
                                            </Col>
                                                </React.Fragment>
                                            

                                            }
                                            
                                        </Row>
                                    </Col>

                                </Col>

                                <Col span={24} style={{
                                    height: '1em'
                                }}>
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

EventSection.propTypes = {

};

export default EventSection;