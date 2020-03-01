import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon} from 'antd';
import '../../index.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class CreateNews extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        const goBack=()=>{

            window.open("admin-news","_self");
        }
        const nextStep =()=>{
            var title = TodoStore.getTitle;
            var content = TodoStore.getContent;

            var type="";
            var description="";
            var icontype="";
            var colors="";
            if((title.length===0)||(content.length===0)){
                type="Warning";
                description="Do not leave a blank space";
                icontype="warning";
                colors="#ffc53d";
                openNotification(type,description,icontype,colors);
            }else{
                if(TodoStore.getUpdateNews===true){
                    TodoStore.setIsImage(true);
                }else{
                    TodoStore.setIsImage(false);
                }
                TodoStore.setNewsStep(1);
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
                            minHeight:'3em',
                            height:'auto'
                        }}
                    >
                        <Row>
                            <Col span={24} style={{
                                        borderBottom:'2px solid',
                                        borderColor:'#bfbfbf'
                                    }}>
                            </Col>
                            <Col span={24} style={{
                                       height:'1em'
                                    }}>
                            </Col>
                            <Col span={3}>

                            </Col>
                            <Col span={18}>
                                <Row>
                                    <Col span={4} style={{
                                        paddingTop:'0.6em',
                                        textAlign:'right',
                                        paddingRight:'1em'
                                    }}>
                                        <h4
                                            style={{
                                                fontFamily:'Open Sans,sans-serif',
                                                fontSize:'1em',
                                                color:'#bfbfbf'
                                            }}
                                        >
                                            News Title :
                                        </h4>
                                    </Col>
                                    <Col span={20}>
                                        <Input placeholder="Enter news title here..." style={{
                                        width:'100%',
                                        fontFamily:'Open Sans,sans-serif'
                                        }}
                                        value={TodoStore.getTitle}
                                        onChange={TodoStore.setTitle}/>
                                    </Col>
                                    <Col span={24} style={{
                                        marginTop:'1em',
                                        marginHeight:'3em',
                                        height:'auto'
                                    }}>
                                        <CKEditor
                                        editor={ClassicEditor}
                                        data={TodoStore.getContent}
                                        onChange={TodoStore.setContent}
                                        />
                                    </Col>
                                    <Col span={24} style={{
                                        marginTop:'1em',
                                        minHeight:'3em',
                                        height:'auto'
                                    }}>
                                       <Row>
                                           <Col span={12} style={{
                                               textAlign:'left'
                                           }}>
                                               <Button style={{
                                                   color:'#ffffff',
                                                   fontFamily:'Open Sans,sans-serif',
                                                   fontSize:'1em',
                                                   backgroundColor:'#faad14'
                                               }}
                                               onClick={(event)=>goBack()}
                                               >
                                                   Cancel
                                               </Button>
                                           </Col>
                                           <Col span={12} style={{
                                               textAlign:'right'
                                           }}>


                                               <Button style={{
                                                   color:'#ffffff',
                                                   fontFamily:'Open Sans,sans-serif',
                                                   fontSize:'1em',
                                                   backgroundColor:'#800000'
                                               }}
                                               onClick={(event)=>nextStep()}
                                               >
                                                   Next Step: Upload Banner
                                               </Button>
                                           </Col>
                                           
                                       </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3}>
                                
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

CreateNews.propTypes = {

};

export default CreateNews;