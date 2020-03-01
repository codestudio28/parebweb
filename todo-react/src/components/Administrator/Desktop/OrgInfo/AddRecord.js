import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon,InputNumber,Select,Tooltip,Spin } from 'antd';
import '../../index.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Option } = Select;
var cities = require('philippines/cities');
var province = require('philippines/provinces');

var i = 0;
var orgid='';
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
@inject('TodoStore')
@observer
class AddRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            network: []
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
               
            });

            fetch(TodoStore.getPort+'networkrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    network: json,
                })
                
            });
           
            TodoStore.setIsLoadData(false);
        }
        orgid = reactLocalStorage.get('userid');
       
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { records,network } = this.state;
        const dataSource = [];
        const dataNetwork = [];
        i = 0;
        // Org Name and Accronym
        records.map((records)=>{ 
            if(records.userid===orgid){
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
            }
               
            });
          
            network.map((records)=>{ 
                if(records.userid===orgid){
                    dataNetwork.push({
                        key: records._id,
                        userid: records.userid,
                        network: records.network,
                    }) 
                }
                   
                });
     
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
        var ids='';
        const newrecords = dataSource.filter(records => {
           return records;
        }).map((record, index) => {
            if(TodoStore.getEditOrgName===false){
                TodoStore.setOrgName2(record.orgname);
            }
            if(TodoStore.getEditOrgAccr===false){
                TodoStore.setOrgAccronym2(record.orgaccr);
            }
            if(TodoStore.getEditOrgPresident===false){
                TodoStore.setPresident2(record.president);
            }
            if(TodoStore.getEditOrgCity===false){
                TodoStore.setCity(record.city);
            }
            if(TodoStore.getEditOrgProvince===false){
                TodoStore.setProvince(record.province);
            }
            if(TodoStore.getEditLogo===false){
                TodoStore.setProfile(record.logo);
            }
           ids = record.key;
           
           

        });

        const newnetwork = dataNetwork.filter(records => {
            return records;
         }).map((record, index) => {
             i++;
            return(
                <Col span={24}
                            style={{
                                minHeight:'2em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={2} style={{
                                     height:'2em',
                                     paddingTop:'1em'
                                }}>
                                </Col>
                                <Col span={2} style={{
                                     height:'2em',
                                     paddingTop:'0.5em',
                                     textAlign:'right',
                                    paddingRight:'1em'

                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        {i+'. '}
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'2em',
                                     paddingTop:'0.5em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}
                                    onDoubleClick={(event)=>getNetwork(record.key,record.network)}
                                    >
                                       {record.network}
                                    </h4>
                                </Col>
                                <Col span={4} style={{
                                     height:'2em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    
                                </Col>
                            </Row>
                        </Col>
            )
 
         });
         const closeNetwork=()=>{
            TodoStore.setEditNetwork(false);
            TodoStore.setNetwork2('');
         }
         const getNetwork=(id,network)=>{
            
             TodoStore.setArticleId(id);
            TodoStore.setEditNetwork(true);
            TodoStore.setNetwork2(network);
         }
         const updateNetwork=()=>{
            var id = TodoStore.getArticleId;
            var network = TodoStore.getNetwork;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(network.length===0){
                type="Warning";
                description="Network/Affiliate name is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                    TodoStore.setIsLoading(true);
                    const account = {
                        network:network
                    }
                    var port = TodoStore.getPort;
                    var url = port+"networkrouter/update/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Network successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditNetwork(false);
                                TodoStore.setNetwork2('');
                                TodoStore.setArticleId('');
                                loadRecords();
                            }
                        });
            }
        }
        const updateOrgPresident=()=>{
            var id = ids;
            var president = TodoStore.getPresident;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(president.length===0){
                type="Warning";
                description="Organization accronym is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                var checkmatch=0;
                records.map((records)=>{ 
                    if((records.userid!==orgid)&&(records.president===president)){
                        checkmatch=1;
                    }else{
                        
                    }
                       
                });
                if(checkmatch===1){
                    type="Warning";
                    description="This president is already president of other organizations ";
                    icontype="warning";
                    colors="#ffc53d";    
                    openNotification(type,description,icontype,colors);
                }else{
                    TodoStore.setIsLoading(true);
                    const account = {
                        president:president
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/president/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="President successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditOrgPresident(false);
                                loadRecords();
                            }
                        });
                }
              
            
            }
        }
        const updateOrgAccr=()=>{
            var id = ids;
            var orgaccr = TodoStore.getOrgAccronym;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(orgaccr.length===0){
                type="Warning";
                description="Organization accronym is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                var checkmatch=0;
                records.map((records)=>{ 
                    if((records.userid!==orgid)&&(records.orgaccr===orgaccr)){
                        checkmatch=1;
                    }else{
                        
                    }
                       
                });
                if(checkmatch===1){
                    type="Warning";
                    description="Organization accronym is not available";
                    icontype="warning";
                    colors="#ffc53d";    
                    openNotification(type,description,icontype,colors);
                }else{
                    TodoStore.setIsLoading(true);
                    const account = {
                        orgaccr:orgaccr
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/orgaccr/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Organization accronym successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditOrgAccr(false);
                                loadRecords();
                            }
                        });
                }
              
            
            }
        }
        const updateOrgName=()=>{
            var id = ids;
            var orgname = TodoStore.getOrgName;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(orgname.length===0){
                type="Warning";
                description="Organization name is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                var checkmatch=0;
                records.map((records)=>{ 
                    if((records.userid!==orgid)&&(records.orgname===orgname)){
                        checkmatch=1;
                    }else{
                        
                    }
                       
                });
                if(checkmatch===1){
                    type="Warning";
                    description="Organization name is not available";
                    icontype="warning";
                    colors="#ffc53d";    
                    openNotification(type,description,icontype,colors);
                }else{
                    TodoStore.setIsLoading(true);
                    const account = {
                        orgname:orgname
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/orgname/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Organization name successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditOrgName(false);
                                loadRecords();
                            }
                        });
                }
            }
        }
        const updateOrgProvince=()=>{
            var id = ids;
            var province = TodoStore.getProvince;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(province.length===0){
                type="Warning";
                description="Province is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                TodoStore.setIsLoading(true);
                    const account = {
                        province:province
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/province/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Province successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditOrgProvince(false);
                                loadRecords();
                            }
                        });
            }
        }
        const updateOrgCity=()=>{
            var id = ids;
            var city = TodoStore.getCity;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(city.length===0){
                type="Warning";
                description="City is required";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                TodoStore.setIsLoading(true);
                    const account = {
                        city:city
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/city/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="City successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                TodoStore.setEditOrgCity(false);
                                loadRecords();
                            }
                        });
            }
        }
        const updateOrgLogo=()=>{
            var id = ids;
            var logo = TodoStore.getProfile;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(logo.length===0){
                type="Warning";
                description="Browse image first.";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                TodoStore.setIsLoading(true);
                    const account = {
                        logo:logo
                    }
                    var port = TodoStore.getPort;
                    var url = port+"orgrouter/update/logo/"+id;
    
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
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Organization logo successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                reactLocalStorage.set('userprofile', TodoStore.getProfile);
                                TodoStore.setEditLogo(false);
                                window.open("/org-info","_self");
                            }
                        });
            }
        }
        const addNetwork=()=>{
            var id = orgid;
            var network = TodoStore.getNetwork;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(network.length===0){
                type="Warning";
                description="Do not leave blank space.";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                TodoStore.setIsLoading(true);
                    const networks = {
                        userid:id,
                        network:network
                    }
                    var port = TodoStore.getPort;
                    var url = port+"networkrouter/add";
    
                    axios.post(url, networks)
                        .then(res => {
                            if (res.data === '404') {
                                // openNotification("Exist");
                                type="Warning";
                                description="Server Error";
                                icontype="warning";
                                colors="#ffc53d";    
                                openNotification(type,description,icontype,colors);
                            } else  if (res.data === '101') {
                               
                                TodoStore.setIsLoading(false);
                                type="Success";
                                description="Network/Affiliates successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setNetwork2('');
                                TodoStore.setIsLoadData(true);
                                loadRecords();
                            }
                        });
            }
        }
        const loadRecords=()=>{
            const TodoStore = this.props.TodoStore;
            if(TodoStore.getIsLoadData===true){
                fetch(TodoStore.getPort+'orgrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        records: json,
                    })
                    
                   
                });
                fetch(TodoStore.getPort+'networkrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        network: json,
                    })
                    
                });
               
                TodoStore.setIsLoadData(false);
            }
            orgid = reactLocalStorage.get('userid');
        }

        const uploadImage = async e => {
            var image = '';
            TodoStore.setImageURL(image);
            TodoStore.setIsImage(false);
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'lipalogo');
            TodoStore.setUploadLoading(true);
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/lipacity/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            TodoStore.setImageURL(file.secure_url);
            TodoStore.setProfile(file.secure_url);    
            if (TodoStore.getImageURL != '') {
                console.log('URL: ' + TodoStore.getImageURL);
                TodoStore.setUploadLoading(false);
                TodoStore.setIsImage(true);
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
                <Col span={24}
                    style={{
                        minHeight:'40em',
                        height:'auto'
                    }}
                >
                   <Row>
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                             <Row>
                                <Col span={4} style={{
                                     height:'10em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Organization's Logo
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'10em',
                                     paddingTop:'0.5em'
                                }}>
                                    <center>
                                    {TodoStore.getUploadLoading &&
                                        <Spin size="large" />
                                    } 
                                    
                                    {!TodoStore.getUploadLoading &&
                                         <img 
                                         style={{
                                             height:'8em'
                                         }}
                                         src={TodoStore.getProfile}/>
                                    }
                                       
                                    </center>
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'3em',
                                     paddingLeft:'1em'
                                }}>
                                    {TodoStore.getEditLogo &&
                                     <React.Fragment>
                                        <input type="file"
                                        name="file"
                                        placeholder="Upload an image"
                                        onChange={uploadImage}
                                        />
                                       
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgLogo()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditLogo(false)}
                                        >
                                             <i className="fa fa-times"></i>
                                           
                                            
                                        </Button>
                                        </React.Fragment>
                                    }
                                    {!TodoStore.getEditLogo &&
                                         <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditLogo(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                   
                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Organization's Name:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                    {TodoStore.getEditOrgName &&
                                         <Input placeholder="Enter organization name here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                         }}
                                            value={TodoStore.getOrgName}
                                            onChange={TodoStore.setOrgName}/>
                                    }
                                    {!TodoStore.getEditOrgName &&
                                         <Input placeholder="Enter organization name here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                         }}
                                            disabled
                                            value={TodoStore.getOrgName}
                                            onChange={TodoStore.setOrgName}/>
                                    }
                                   
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    {/* onClick={(event) => getUpdateRecordId(record.key)} */}
                                    {!TodoStore.getEditOrgName &&
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgName(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                    {TodoStore.getEditOrgName &&
                                        <React.Fragment>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgName()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgName(false)}
                                        >
                                             <i className="fa fa-times"></i>
                                           
                                            
                                        </Button>
                                        </React.Fragment>
                                    }
                                    
                                </Col>
                            </Row>
                        </Col>
                        {/* Org Accronym */}
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Organization's Accronym:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                      {TodoStore.getEditOrgAccr &&
                                         <Input placeholder="Enter organization accronym here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            value={TodoStore.getOrgAccronym}
                                            onChange={TodoStore.setOrgAccronym}/>
                                      }
                                      {!TodoStore.getEditOrgAccr &&
                                         <Input placeholder="Enter organization accronym here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            disabled
                                            value={TodoStore.getOrgAccronym}
                                            onChange={TodoStore.setOrgAccronym}/>
                                      }
                                   
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                     {!TodoStore.getEditOrgAccr &&
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgAccr(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                    {TodoStore.getEditOrgAccr &&
                                     <React.Fragment>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgAccr()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgAccr(false)}
                                        >
                                           
                                        <i className="fa fa-times"></i>
                                         
                                           
                                        </Button>
                                        </React.Fragment>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        {/* Org President */}
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        President:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                     {TodoStore.getEditOrgPresident &&
                                        <Input placeholder="Enter president full name here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            value={TodoStore.getPresident}
                                            onChange={TodoStore.setPresident}/>
                                     }
                                     {!TodoStore.getEditOrgPresident &&
                                        <Input placeholder="Enter president full name here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            disabled
                                            value={TodoStore.getPresident}
                                            onChange={TodoStore.setPresident}/>
                                     }
                                    
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    {!TodoStore.getEditOrgPresident &&
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgPresident(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                    {TodoStore.getEditOrgPresident &&
                                    <React.Fragment>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgPresident()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgPresident(false)}
                                        >
                                           
                                        <i className="fa fa-times"></i>
                                         
                                           
                                        </Button>
                                        </React.Fragment>
                                    }
                                </Col>
                            </Row>
                        </Col>
                         {/* Active member number */}
                         {/* <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                       Total Active Member:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                    <InputNumber placeholder="Enter total number of active member here..." style={{
                                    width:'100%',
                                    fontFamily:'Open Sans,sans-serif'
                                    }}
                                    min={0}
                                    value={TodoStore.getTotal}
                                    onChange={TodoStore.setTotal}/>
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                  
                                    <Button  style={{
                                        color: '#ffffff',
                                        backgroundColor: '#52c41a'
                                    }}>
                                        <i className="fa fa-pencil"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </Col> */}
                         {/* Location Label */}
                         <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Location:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                   
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                   
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        City:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                    {TodoStore.getEditOrgCity &&
                                         <Select 
                                            showSearch
                                            style={{ width: '100%',fontFamily:'Open Sans,sans-serif' }}
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
                                    }
                                     {!TodoStore.getEditOrgCity &&
                                        <Input placeholder="Enter city/municipality here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            disabled
                                            value={TodoStore.getCity}
                                            onChange={TodoStore.setCity}/>
                                     }
                                   
                                 
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    {!TodoStore.getEditOrgCity &&
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgCity(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                    {TodoStore.getEditOrgCity &&
                                        <React.Fragment>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgCity()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgCity(false)}
                                        >
                                           
                                        <i className="fa fa-times"></i>
                                         
                                           
                                        </Button>
                                        </React.Fragment>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Province:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                     {TodoStore.getEditOrgProvince &&
                                        <Select style={{
                                            fontFamily:'Open Sans,sans-serif'
                                        }}
                                         showSearch
                                         style={{ width: '100%',fontFamily:'Open Sans,sans-serif' }}
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
                                     }
                                      {!TodoStore.getEditOrgProvince &&
                                        <Input placeholder="Enter province here..." style={{
                                        width:'100%',
                                        fontFamily:'Open Sans,sans-serif'
                                        }}
                                        disabled
                                        value={TodoStore.getProvince}
                                        onChange={TodoStore.setProvince}/>
                                      }
                                   
                                 
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                     {!TodoStore.getEditOrgProvince &&
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#52c41a'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgProvince(true)}
                                        >
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                    }
                                    {TodoStore.getEditOrgProvince &&
                                        <React.Fragment>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#1890ff'
                                        }}
                                        onClick={(event) => updateOrgProvince()}
                                        >
                                            {!TodoStore.getIsLoading &&
                                                <i className="fa fa-save"></i>
                                            }
                                            {TodoStore.getIsLoading &&
                                                <Icon type="loading" />
                                            }
                                            
                                        </Button>
                                        <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => TodoStore.setEditOrgProvince(false)}
                                        >
                                           
                                        <i className="fa fa-times"></i>
                                         
                                           
                                        </Button>
                                        </React.Fragment>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        Network/Affiliations:
                                    </h4>
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                   <Input placeholder="Enter network/affiliation here..." style={{
                                            width:'100%',
                                            fontFamily:'Open Sans,sans-serif'
                                            }}
                                            value={TodoStore.getNetwork}
                                            onChange={TodoStore.setNetwork}/>
                                   
                                 
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    {!TodoStore.getEditNetwork &&
                                         <Button style={{
                                            fontFamily:'Open Sans,sans-serif',
                                            color:'#ffffff',
                                            backgroundColor:'#2a166f'
                                        }}
                                        onClick={(event)=> addNetwork()}
                                        >
                                             {!TodoStore.getIsLoading &&
                                                    <i className="fa fa-plus"></i>
                                                }
                                                {TodoStore.getIsLoading &&
                                                    <Icon type="loading" />
                                                }
                                            
                                        </Button>
                                    }
                                    {TodoStore.getEditNetwork &&
                                         <React.Fragment>
                                             <Button style={{
                                            fontFamily:'Open Sans,sans-serif',
                                            color:'#ffffff',
                                            backgroundColor:'#1890ff '
                                        }}
                                        onClick={(event)=>updateNetwork()}
                                        >
                                             {!TodoStore.getIsLoading &&
                                                    <i className="fa fa-save"></i>
                                                }
                                                {TodoStore.getIsLoading &&
                                                    <Icon type="loading" />
                                                }
                                            
                                        </Button> <Button  style={{
                                            color: '#ffffff',
                                            backgroundColor: '#f5222d'
                                        }}
                                        onClick={(event) => closeNetwork()}
                                        > 
                                            <i className="fa fa-times"></i>
                                        </Button>
                                         </React.Fragment>
                                    }
                                   
                                </Col>
                            </Row>
                        </Col>
                         {/* Location Label */}
                         <Col span={24}
                            style={{
                                minHeight:'3em',
                                height:'auto'
                            }}
                        >
                            <Row>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'1em'
                                }}>
                                    <h4 style={{
                                        fontFamily:'Open Sans,sans-serif',
                                        fontSize:'1em',
                                        fontWeight:'500'
                                    }}>
                                        List of Network/Affiliations:
                                    </h4>
                                        
                                   
                                   
                                </Col>
                                <Col span={8} style={{
                                     height:'3em',
                                     paddingTop:'0.5em'
                                }}>
                                   
                                </Col>
                                <Col span={4} style={{
                                     height:'3em',
                                     paddingTop:'0.5em',
                                     paddingLeft:'1em'
                                }}>
                                    <Tooltip 
                                    style={{
                                        fontFamily:'Open Sans,sans-serif'
                                    }}
                                    placement="topLeft" title="Double click network/affiliate name below to edit">
                                        <Button style={{
                                            color:'#8c8c8c',
                                            backgroundColor:'#e8e8e8'
                                        }}>
                                            <i className="fa fa-question"></i>
                                        </Button>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                       {/* List network */}
                       {newnetwork}
                       
                        {/*  */}
                    </Row> 


                </Col>
            </React.Fragment>
        );
    }
}

AddRecord.propTypes = {

};

export default AddRecord;