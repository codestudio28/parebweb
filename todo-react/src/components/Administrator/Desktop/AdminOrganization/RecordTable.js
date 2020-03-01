import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button,Icon, Select, Popconfirm, message, Modal, Input, Pagination,Avatar,Skeleton,notification } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Option } = Select;
var cities = require('philippines/cities');
var province = require('philippines/provinces');
function confirm() {
    message.info('Clicked on Yes.');
}
var i = 0;


@inject('TodoStore')
@observer
class RecordTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }


    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        if(TodoStore.getIsLoadData===true){
            fetch(TodoStore.getPort+'orgrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                    
                })
                
                TodoStore.setIsLoadData(false);
            });
        }
       
    }


    render() {
        const TodoStore = this.props.TodoStore;
        var { records } = this.state;
        
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

        const loadRecords=()=>{
            if(TodoStore.getIsLoadData===true){
                fetch(TodoStore.getPort+'orgrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        records: json,
                        
                    })
                    
                    TodoStore.setIsLoadData(false);
                });
            }
        }
        const removeRecord=(value)=>{
            var id = value;
            var type="";
            var description="";
            var icontype="";
            var colors="";

            var port = TodoStore.getPort;
            var url = port+"accountrouter/remove/"+id;
            var status="REMOVED";
            const account = {
                status:status
            }
            axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            type="Warning";
                            description="Server Error";
                            icontype="warning";
                            colors="#ffc53d";    
                            openNotification(type,description,icontype,colors);
                        } else  if (res.data === '101') {
                            type="Success";
                            description="Administrator information successfully removed";
                            icontype="check";
                            colors="#73d13d";    
                            openNotification(type,description,icontype,colors);
                            TodoStore.setCancelModal(false);
                            TodoStore.setIsLoadData(true);
                            loadRecords();
                        }
                    });

        }
        const updateRecord = () => {
            var id = TodoStore.getUpdateRecordId;
            var email = TodoStore.getEmail;
            var president = TodoStore.getPresident;
            var orgaccr = TodoStore.getOrgAccronym;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            // if ((lastname.length === 0)|| (firstname.length === 0)) {
            //     type="Warning";
            //     description="Do not leave a blank space";
            //     icontype="warning";
            //     colors="#ffc53d";    
            //     openNotification(type,description,icontype,colors);
            // } else {
            //     TodoStore.setIsLoading(true);
            //     const account = {
            //         lastname:lastname,
            //         firstname:firstname
            //     }
            //     var port = TodoStore.getPort;
            //     var url = port+"accountrouter/update/"+id;

            //     axios.post(url, account)
            //         .then(res => {
            //             if (res.data === '404') {
            //                 // openNotification("Exist");
            //                 type="Warning";
            //                 description="Server Error";
            //                 icontype="warning";
            //                 colors="#ffc53d";    
            //                 openNotification(type,description,icontype,colors);
            //             } else  if (res.data === '101') {
            //                 console.log(res.data[0]);
            //                 TodoStore.setIsLoading(false);
            //                 type="Success";
            //                 description="Administrator information successfully updated";
            //                 icontype="check";
            //                 colors="#73d13d";    
            //                 openNotification(type,description,icontype,colors);
            //                 TodoStore.setCancelModal(false);
            //                 TodoStore.setIsLoadData(true);
            //                 loadRecords();
            //             }
            //         });
            // }
          
        }
        const getUpdateRecordId=(value)=>{
            TodoStore.setUpdateRecordId(value);
            TodoStore.setUpdateRecordModal();
            dataSource.filter(records => {
                return records.key.indexOf(value) >= 0
            }).map((record, index) => {
                TodoStore.setEmail2(record.email);
                TodoStore.setPresident2(record.president);
                TodoStore.setOrgAccronym2(record.orgaccr);
                TodoStore.setOrgName2(record.orgname);
                TodoStore.setCity(record.city);
                TodoStore.setProvince(record.province);
            });
        }
        const getViewRecordId=(value)=>{
            TodoStore.setUpdateRecordId(value);
            TodoStore.setViewRecordModal();
            dataSource.filter(records => {
                return records.key.indexOf(value) >= 0
            }).map((record, index) => {
                TodoStore.setEmail2(record.email);
                TodoStore.setLastname2(record.lastname);
                TodoStore.setFirstname2(record.firstname);
                TodoStore.setProfile(record.profile);
            });
        }
        const dataSource = [];

        records.map(records => (
            dataSource.push({
                key: records._id,
                email: records.email,
                logo: records.logo,
                president: records.president,
                orgaccr: records.orgaccr,
                orgname: records.orgname,
                city: records.city,
                province: records.province,

            })
            
        ));
        i = 0;
        var starts = 0;
        var ends = 0;

        var display = TodoStore.getDisplay;
        var page = TodoStore.getPage;


        ends = parseInt(page) * parseInt(display);
        starts = ends - parseInt(display);


        const newrecords = dataSource.filter(records => {
            if (TodoStore.filter === 'All') {
                return records;
            } else if (TodoStore.filter === 'President') {
                return records.president.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'City') {
                return records.city.indexOf(TodoStore.search) >= 0
            } else if (TodoStore.filter === 'Province') {
                return records.province.indexOf(TodoStore.search) >= 0
            }else if (TodoStore.filter === 'Org. Name') {
                return records.orgname.indexOf(TodoStore.search) >= 0
            }

        }).map((record, index) => {
           i++;
           if ((index >= starts) && (index < ends)) {
            return(
                <tr>
                <td>{i}</td>
                <td>
                    <img src={record.logo}
                        style={{
                            width:'4em'
                        }}
                    />
                </td>
                <td>{record.email}</td>
                <td>{record.orgname}</td>
                <td>{record.president}</td>
                <td>{record.city+','+record.province}</td>
                <td>
                    <Button onClick={(event)=>getUpdateRecordId(record.key)} style={{
                        color: '#ffffff',
                        backgroundColor: '#52c41a'
                    }}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                   
                    
                    <Popconfirm placement="topLeft" title={"Remove this record?"} onConfirm={(event)=>removeRecord(record.key)} okText="Yes" cancelText="No">
                        <Button style={{
                            color: '#ffffff',
                            backgroundColor: '#f5222d'
                        }}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Popconfirm>
                </td>
            </tr>
            );
           }
            

        });
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
                <Col span={24} style={{
                    paddingTop: '1em'
                }}>
                    <Row>
                        <Col span={24}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                color: '#bfbfbf',
                                fontSize: '1em'
                            }}>
                                List of Administrator
                            </h4>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight: '3em',
                                height: 'auto'
                            }}
                        >
                            <Skeleton loading={TodoStore.getIsLoadData}>
                            <table className="table-condensed" style={{
                                width: '100%',
                                fontFamily: 'Open Sans,sans-serif'
                            }}>
                                <thead>
                                    <tr>
                                    <th style={{
                                            width: '5%'
                                        }}>#</th>
                                        <th style={{
                                            width: '10%'
                                        }}>Logo</th>
                                        <th style={{
                                            width: '15%'
                                        }}>Email</th>
                                        <th style={{
                                            width: '20%'
                                        }}>Org. Name</th>
                                        <th style={{
                                            width: '15%'
                                        }}>President</th>
                                        <th style={{
                                            width: '20%'
                                        }}>City and Province</th>
                                        <th style={{
                                            width: '15%'
                                        }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {newrecords}
                                   
                                </tbody>
                            </table>
                            </Skeleton>
                        </Col>
                        <Col span={24} style={{
                            height: '3em',
                            paddingTop: '1em',
                            borderTop: '2px solid',
                            borderColor: '#d9d9d9',
                            marginTop: '0.5em '
                        }}>
                             <Pagination
                            current={TodoStore.getPage}
                            total={(i / TodoStore.getDisplay) * 10}
                            onChange={TodoStore.setPage} />
                        </Col>
                    </Row>
                     {/* Update Record */}
                     <Modal
                        style={{
                            fontFamily: 'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getUpdateRecordModal}
                        title="Update Organization Information"
                        onOk={updateRecord}
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
                                backgroundColor: '#800000',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={updateRecord}>
                                {!TodoStore.getIsLoading &&
                                        <React.Fragment>
                                            Save
                                        </React.Fragment>
                                }
                                {TodoStore.getIsLoading &&
                                    <React.Fragment>
                                       <Icon type="loading" style={{
                                        marginTop:'-0.25em'
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
                    {/* View Record */}
                    <Modal
                        style={{
                            fontFamily: 'Open Sans,sans-serif'
                        }}
                        visible={TodoStore.getViewRecordModal}
                        title="View Administrator Information"
                        onCancel={TodoStore.setCancelModal}
                        footer={[
                            <Button key="back" style={{
                                backgroundColor: '#faad14',
                                color: '#ffffff',
                                fontFamily: 'Open Sans,sans-serif'
                            }} onClick={TodoStore.setCancelModal}>
                                Cancel
</Button>,

                        ]}
                    >
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>

                                    </Col>
                                    <Col span={12}>
                                        <img src={TodoStore.getProfile} 
                                        style={{
                                            width:'100%',
                                            borderRadius:'50%'
                                        }}/>
                                    </Col>
                                    <Col span={6}>
                                        
                                    </Col>
                                </Row>
                               
                            </Col>
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
                                }} disabled 
                                value={TodoStore.getEmail}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    First Name:
        </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter first name here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} disabled 
                                value={TodoStore.getFirstname}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: '0.5em' }}>
                                <h4 style={{
                                    fontFamily: 'Open Sans,sans-serif',
                                    color: '#bfbfbf',
                                    fontSize: '1em'
                                }}>
                                    Last Name:
        </h4>
                            </Col>
                            <Col span={24}>
                                <Input placeholder="Enter last name here..." style={{
                                    width: '100%',
                                    fontFamily: 'Open Sans,sans-serif'
                                }} disabled
                                value={TodoStore.getLastname}
                                />
                            </Col>
                        </Row>
                    </Modal>
                </Col>
            </React.Fragment>
        );
    }
}

RecordTable.propTypes = {

};

export default RecordTable;