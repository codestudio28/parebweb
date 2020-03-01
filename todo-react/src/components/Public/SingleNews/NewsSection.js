import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Pagination, Avatar, Comment, Form, Button, List, Input, Tooltip } from 'antd';
import News from './News';
import moment from 'moment';
import SidePanelNews from './SidePanelNews';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
var i = 0;
var j=false;
const data = [
    {
        // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
        </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                        .subtract(1, 'days')
                        .fromNow()}
                </span>
            </Tooltip>
        ),
    },
    {
        // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
        </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(2, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
                <span>
                    {moment()
                        .subtract(2, 'days')
                        .fromNow()}
                </span>
            </Tooltip>
        ),
    },
];
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
        fetch(TodoStore.getPort + 'newsrouter')
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

       
        
        var authors='';
        var dates='';
        var banner='';
        var title='';
        var content='';
      
        i=0;
        const newrecords = dataSource.filter(records => {
            return records;
        }).map((record, index) => {
            
            if(record.status==="PUBLISHED"){
                i=i+1;
            }
            // getUser(record.userid);
            if(record.key===TodoStore.getArticleId){
                dates=record.datecreated;
                banner=record.banner;
                title=record.title;
                content=record.content;
               
            }

        })

        return (
            <React.Fragment>
                <Content style={{
                    minHeight: '37.5375em',
                    height: 'auto',
                    backgroundColor: '#f5f5f5'
                }}>
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
                                                    Jerwin Cruz
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
                                                    {dates}
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
                                            <Col span={12} style={{
                                                height: '3em',
                                                paddingLeft: '1em'
                                            }}>
                                                <i className="fa fa-thumbs-up"
                                                    style={{
                                                        fontSize: '1.5em',
                                                        float: 'left',
                                                        fontWeight: '700',
                                                        marginLeft: '12em',
                                                        marginTop: '0.25em',
                                                        color: '#8c8c8c'
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
                                                    1k
                                           </h4>

                                                <i className="fa fa-comment"
                                                    style={{
                                                        fontSize: '1.5em',
                                                        float: 'left',
                                                        fontWeight: '700',
                                                        marginLeft: '1em',
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
                                                    2
                                           </h4>
                                            </Col>
                                            <Col span={24} style={{
                                                borderBottom: '2px solid',
                                                borderColor: '#bfbfbf'
                                            }}>

                                            </Col>
                                            <Col span={24} style={{
                                                minHeight: '8em',
                                                height: 'auto'
                                            }}>
                                                <Row>
                                                    <Col span={2} style={{
                                                        minHeight: '8em',
                                                        height: 'auto',
                                                        padding: '1em'
                                                    }}>
                                                        <Avatar style={{
                                                            width: '2.5em',
                                                            height: '2.5em'
                                                        }}

                                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    </Col>
                                                    <Col span={22} style={{
                                                        minHeight: '8em',
                                                        height: 'auto',
                                                        padding: '1em'
                                                    }}>
                                                        <TextArea rows={4} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={24} style={{
                                                minHeight: '3em',
                                                height: 'auto',
                                                textAlign: 'right',
                                                paddingRight: '1em'
                                            }}>
                                                <Button style={{
                                                    backgroundColor: '#2a166f',
                                                    color: '#ffffff',
                                                    fontFamily: 'Open Sans, sans-serif'
                                                }}>Add Comment</Button>
                                            </Col>
                                            <Col span={24} style={{
                                                minHeight: '8em',
                                                height: 'auto'
                                            }}>
                                                <List
                                                    className="comment-list"
                                                    header={`${data.length} comments`}
                                                    itemLayout="horizontal"
                                                    dataSource={data}
                                                    renderItem={item => (
                                                        <li>
                                                            <Comment
                                                                // actions={item.actions}
                                                                author={item.author}
                                                                avatar={item.avatar}
                                                                content={item.content}
                                                                datetime={item.datetime}
                                                            />
                                                        </li>
                                                    )}
                                                />
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
                                                        Other News
                                                                    </h4>
                                                </Col>
                                                <SidePanelNews/>
                                            </React.Fragment>
                                           }
                                            <Col span={24} style={{
                                                height: '2em',
                                                padding:'1em'
                                            }}>
                                                 <Pagination
                                                    current={TodoStore.getPage}
                                                    total={(i / TodoStore.getDisplay) * 10}
                                                    onChange={TodoStore.setPage} />
                                            </Col>
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

NewsSection.propTypes = {

};

export default NewsSection;