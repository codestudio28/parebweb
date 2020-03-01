import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification, Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';


@inject('TodoStore')
@observer
class Index extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        const gotoLogin=()=>{
            var email = TodoStore.getEmail;
            var password = TodoStore.getPassword;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if ((email.length === 0) || (password.length === 0)) {
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            } else {
                TodoStore.setIsLoading(true);
                const account = {
                    email: email,
                    password: password
                }
                var port = TodoStore.getPort;
                var url = port+"accountrouter/login";

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else if (res.data === '303') {
                            TodoStore.setIsLoading(false);
                            type="Warning";
                            description="Wrong email/password";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                            
                        } else {
                            console.log(res.data[0]);
                            TodoStore.setIsLoading(false);
                            type="Success";
                           
                            icontype="check";
                            colors="#73d13d";  
                            if(res.data[0].usertype==="administrator"){
                                description="Welcome back "+res.data[0].firstname;
                                openNotification(type,description,icontype,colors);
                                reactLocalStorage.set('userid', res.data[0]._id);
                                reactLocalStorage.set('userlastname', res.data[0].lastname);
                                reactLocalStorage.set('userfirstname', res.data[0].firstname);
                                reactLocalStorage.set('userprofile', res.data[0].profile);
                                reactLocalStorage.set('userpassword', res.data[0].password);
                                reactLocalStorage.set('usertype', res.data[0].usertype);
                                
                                window.open("/","_self");
                            }else if(res.data[0].usertype==="organization"){
                                description="Welcome back";
                                openNotification(type,description,icontype,colors);
                                reactLocalStorage.set('userid', res.data[0]._id);
                                reactLocalStorage.set('userprofile', res.data[0].profile);
                                reactLocalStorage.set('userpassword', res.data[0].password);
                                reactLocalStorage.set('usertype', res.data[0].usertype);
                                
                                window.open("/","_self");
                            }else if(res.data[0].usertype==="member"){
                                if(res.data[0].status==="ACTIVE"){
                                    description="Welcome back "+res.data[0].firstname;
                                    openNotification(type,description,icontype,colors);
                                    reactLocalStorage.set('userid', res.data[0]._id);
                                    reactLocalStorage.set('userlastname', res.data[0].lastname);
                                    reactLocalStorage.set('userfirstname', res.data[0].firstname);
                                    reactLocalStorage.set('userprofile', res.data[0].profile);
                                    reactLocalStorage.set('userpassword', res.data[0].password);
                                    reactLocalStorage.set('usertype', res.data[0].usertype);
                                    
                                    window.open("/","_self");
                                }else{
                                    type="Warning";
                                    description="You are not yet a member of the national organization";
                                    icontype="warning";
                                    colors="#ffc53d";
                                    openNotification(type,description,icontype,colors);
                                }
                                
                            } 
                           
                        }
                    });
            }
        }
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
                <Row>
                    <Col span={24}
                        style={{
                            minHeight: '32em',
                            height: 'auto',
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <Row>
                            <Col span={4}>

                            </Col>
                            <Col span={16}
                                style={{
                                    minHeight: '32em',
                                    height: 'auto',
                                    paddingTop: '3em'
                                }}
                            >
                                <Row>

                                    <Col span={8}
                                        style={{
                                            minHeight: '26.5em',
                                            height: 'auto',
                                            width: '41.875em',
                                            marginLeft: '17%',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '1em 1em 1em 1em'
                                        }}
                                    >
                                        <Row>
                                            <Col span={24}
                                                style={{
                                                    height: '11.25em',
                                                    borderRadius: '1em 1em 0 0',
                                                    backgroundColor: '#ffffff'

                                                }}
                                            >
                                                <img
                                                    style={{
                                                        height: '11.25em',
                                                        borderRadius: '1em 1em 0 0',
                                                        width: '100%',
                                                        opacity: '0.8'

                                                    }}
                                                    src="https://res.cloudinary.com/lipacity/image/upload/v1581907424/cityhall_jdkjdp.png" />
                                                <center>
                                                    <h4 style={{
                                                        fontSize: '1.75em',
                                                        lineHeight: '2em',
                                                        fontFamily: 'Open Sans,sans-serif',
                                                        color: '#ffffff',
                                                        fontWeight: '700',
                                                        position: 'absolute',
                                                        zIndex: '2',
                                                        marginTop: '-4em',
                                                        marginLeft: '40%'

                                                    }}>
                                                        LOGIN
                                                </h4>
                                                </center>
                                            </Col>
                                            <Col span={24}
                                                style={{
                                                    textAlign: 'center',
                                                    paddingTop: '1em'
                                                }}
                                            >
                                                <Row>
                                                    <Col span={4}>
                                                    </Col>
                                                    <Col span={16}>
                                                        <Row>
                                                            <Col span={6}>
                                                                <Row>
                                                                    <Col span={24} style={{
                                                                        paddingTop: '1em',
                                                                        textAlign:'left'
                                                                    }}>
                                                                        <h4 style={{
                                                                            fontSize: '1em',
                                                                            lineHeight: '1.5em',
                                                                            fontFamily: 'Open Sans,sans-serif'
                                                                        }}>
                                                                            Email
                                                                        </h4>
                                                                    </Col>
                                                                    <Col span={24} style={{
                                                                        paddingTop: '1em',
                                                                        textAlign:'left'
                                                                    }}>
                                                                        <h4 style={{
                                                                            fontSize: '1em',
                                                                            lineHeight: '1.5em',
                                                                            fontFamily: 'Open Sans,sans-serif'
                                                                        }}>
                                                                            Password
                                                                        </h4>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col span={18}>
                                                                <Row>
                                                                    <Col span={24} style={{
                                                                        paddingTop:'0.75em'
                                                                    }}>
                                                                        <Input
                                                                            style={{
                                                                                fontSize: '1em',
                                                                                lineHeight: '1.5em',
                                                                                fontFamily: 'Open Sans,sans-serif'
                                                                            }}
                                                                            placeholder="Enter email here"
                                                                            onChange={TodoStore.setEmail}
                                                                             />
                                                                    </Col>
                                                                    <Col span={24} style={{
                                                                        paddingTop:'0.75em'
                                                                    }}>
                                                                        <Input.Password
                                                                            style={{
                                                                                fontSize: '1em',
                                                                                lineHeight: '1.5em',
                                                                                fontFamily: 'Open Sans,sans-serif'
                                                                            }}
                                                                            placeholder="Enter password here" 
                                                                            onChange={TodoStore.setPassword}
                                                                             />
                                                                    </Col>
                                                                </Row>

                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={4}>
                                                    </Col>
                                                </Row>
                                            </Col>
                                           
                                            <Col span={24}
                                                style={{
                                                    textAlign: 'center',
                                                    paddingTop: '1em'
                                                    
                                                }}
                                            >
                                               <Button style={{
                                                   color:'#ffffff',
                                                   backgroundColor:'#2a166f',
                                                   fontFamily:'Open Sans,sans-serif',
                                                   fontSize:'1em',
                                                   width:'10em',
                                                   height:'3em'
                                               }}
                                               onClick={gotoLogin}
                                               >
                                                   {TodoStore.getIsLoading &&
                                                        <React.Fragment>
                                                            <Icon type="loading" style={{
                                                                marginTop:'-0.25em'
                                                            }} />
                                                             &nbsp;&nbsp;Loading...
                                                        </React.Fragment>
                                                        
                                                   }
                                                   {!TodoStore.getIsLoading &&
                                                        <React.Fragment>
                                                           Login
                                                        </React.Fragment>
                                                        
                                                   }

                                               </Button>
                                            </Col>
                                            
                                            <Col span={24}
                                                style={{
                                                    textAlign: 'right',
                                                    paddingTop: '0.5em',
                                                    paddingRight:'7em'
                                                   
                                                }}
                                            >
                                                <a href="#" style={{
                                                    textDecoration:'none',
                                                    color:'#000000'
                                                }}><h4
                                                style={{
                                                    fontSize:'1em',
                                                    lineHeight: '1.25em',
                                                    fontFamily: 'Open Sans,sans-serif'
                                                }}
                                                >Forgot Password?</h4>
                                                </a>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>

                            </Col>
                            <Col span={4}>

                            </Col>
                        </Row>
                    </Col>
                </Row>



            </React.Fragment>
        );
    }
}

Index.propTypes = {

};

export default Index;