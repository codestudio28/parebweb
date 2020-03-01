import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button, Modal, Input, notification, Icon, Select } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Option } = Select;
var cities = require('philippines/cities');
var province = require('philippines/provinces');
function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

var i=0;
@inject('TodoStore')
@observer
class AddRecord extends Component {

    render() {
        const TodoStore = this.props.TodoStore;
        const dataCity = [];
        const dataProvince = [];

        cities.map(city=>{
            dataCity.push(city.name);
        });
        province.map(province=>{
            dataProvince.push(province.name);
        });
        var uniqueNames = [];
        uniqueNames = Array.from(new Set(dataCity));  
        uniqueNames.sort();

        var uniqueProvince = [];
        uniqueProvince = Array.from(new Set(dataProvince));  
        uniqueProvince.sort();
        const newcities = uniqueNames.filter(cities => {
            return cities;

        }).map((city, index) => {
         
            return (
                
                <Option key={index} value={city}>{city}</Option>
            );
        });

        const newprovince = uniqueProvince.filter(province => {
            return province;

        }).map((province, index) => {
          
            return (
                
                <Option key={index} value={province}>{province}</Option>
            );
        });



        const addRecord = () => {
            var today = new Date();

            var email = TodoStore.getEmail;
            var president = TodoStore.getPresident;
            var orgaccronym = TodoStore.getOrgAccronym;
            var orgname = TodoStore.getOrgName;
            var usertype = "organization";
            var password = "1234567";
            var city = TodoStore.getCity;
            var province = TodoStore.getProvince;
            var profile = "https://res.cloudinary.com/lipacity/image/upload/v1582290112/logo_dsxofa.png";
            var datecreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var status = "ACTIVE";

            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            if ((email.length === 0) || (president.length === 0) || (orgaccronym.length === 0)|| 
            (orgname.length === 0) || (city.length === 0)|| (province.length === 0)) {
                type = "Warning";
                description = "Do not leave a blank space";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                TodoStore.setIsLoading(true);
                const orgs = {
                    email: email,
                    usertype:usertype,
                    password: password,
                    profile:profile,
                    datecreated:datecreated,
                    status:status
                }
             
                var port = TodoStore.getPort;
                var url = port + "accountrouter/add";

                axios.post(url, orgs)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '202') {
                            TodoStore.setIsLoading(false);
                            type = "Warning";
                            description = "Email is already existing";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);

                        } else {
                            console.log(res.data);
                            TodoStore.setIsLoading(false);
                            type = "Success";
                            description = "New organization successfully created";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setCancelModal(false);
                            saveOrganization(res.data);
                            window.open("admin-list-organization", "_self");
                        }
                    });
            }
        }
        const saveOrganization =(value)=>{
          
             var userid=value;
            var email = TodoStore.getEmail;
            var president = TodoStore.getPresident;
            var orgaccronym = TodoStore.getOrgAccronym;
            var orgname = TodoStore.getOrgName;
            var city = TodoStore.getCity;
            var province = TodoStore.getProvince;
            var profile = "https://res.cloudinary.com/lipacity/image/upload/v1582290112/logo_dsxofa.png";
            const orgs = {
                userid: userid,
                email: email,
                president:president,
                orgaccr: orgaccronym,
                logo:profile,
                orgname:orgname,
                city:city,
                province:province
               
            }
            var port = TodoStore.getPort;
            var url = port + "orgrouter/add";

            axios.post(url, orgs)
                .then(res => {
                    
            });
        }
        const openNotification = (type, description, icontype, colors) => {
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
                <Col span={24}
                    style={{
                        textAlign: 'right',
                        paddingRight: '1em'
                    }}
                >
                    <Button onClick={TodoStore.setAddRecordModal} style={{
                        backgroundColor: '#2a166f',
                        fontFamily: 'Open Sans,sans-serif',
                        color: '#ffffff'
                    }}>
                        <i className="fa fa-plus"></i>
                        &nbsp;Add Organization</Button>

                    {/* Update Record */}
                    <Modal
                        style={{
                            fontFamily: 'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getAddRecordModal}
                        title="Add New Organization"
                        onOk={addRecord}
                        onCancel={TodoStore.setCancelModal}
                        footer={[
                            <Button key="back" style={{
                                backgroundColor: '#faad14',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={TodoStore.setCancelModal}>
                                Cancel
            </Button>,

                            <Button key="submit" style={{
                                backgroundColor: '#2a166f',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={addRecord}>
                                {!TodoStore.getIsLoading &&
                                    <React.Fragment>
                                        Save
                                        </React.Fragment>
                                }
                                {TodoStore.getIsLoading &&
                                    <React.Fragment>
                                        <Icon type="loading" style={{
                                            marginTop: '-0.25em'
                                        }} />
                                        &nbsp;&nbsp;Loading...
                                    </React.Fragment>

                                }
                            </Button>,
                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Email:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter email here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }}
                                    value={TodoStore.getEmail}
                                    onChange={TodoStore.setEmail} />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    President's Full Name:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter president full name  here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }}
                                    value={TodoStore.getPresident}
                                    onChange={TodoStore.setPresident} />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Organization's Accronym:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter accronym  here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }}
                                    value={TodoStore.getOrgAccronym}
                                    onChange={TodoStore.setOrgAccronym} />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Organization's Name:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter name of organization here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }}
                                    value={TodoStore.getOrgName}
                                    onChange={TodoStore.setOrgName} />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    City/Municipality:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a city/municipality"
                                    optionFilterProp="children"
                                    onChange={TodoStore.setCity}
                                    onFocus={TodoStore.setCity}
                                    onBlur={TodoStore.setCity}
                                    onSearch={TodoStore.setCity}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {newcities}
                                </Select>

                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Province:
                                </h4>
                            </Col>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a province"
                                    optionFilterProp="children"
                                    onChange={TodoStore.setProvince}
                                    onFocus={TodoStore.setProvince}
                                    onBlur={TodoStore.setProvince}
                                    onSearch={TodoStore.setProvince}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {newprovince}
                                </Select>

                            </Col>
                        </Row>
                    </Modal>

                </Col>
            </React.Fragment>
        );
    }
}

AddRecord.propTypes = {

};

export default AddRecord;