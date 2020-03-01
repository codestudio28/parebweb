import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button, Modal,Popconfirm, Input, notification, Icon, InputNumber, Select, Tooltip, Spin, Skeleton } from 'antd';
import '../../index.css';
import { reactLocalStorage } from 'reactjs-localstorage';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
const { Option } = Select;


var i = 0;
var j=0;
var userid = '';
var realid = null;

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
            member: [],
            user: [],
            realty: [],
            expertise: [],
            interest:[],
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        if (TodoStore.getIsLoadData === true) {
            fetch(TodoStore.getPort + 'memberrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        member: json,

                    })

                });

            fetch(TodoStore.getPort + 'realtyrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        realty: json,

                    })

                });
            fetch(TodoStore.getPort + 'expertiserouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        expertise: json,

                    })

                });
                fetch(TodoStore.getPort + 'interestrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        interest: json,

                    })

                });

            fetch(TodoStore.getPort + 'accountrouter/')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        user: json,
                    })

                });

            TodoStore.setIsLoadData(false);
        }
        userid = reactLocalStorage.get('userid');
        console.log(userid);
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { member, user, realty, expertise,interest } = this.state;
        const dataMember = [];
        const dataExpertise = [];
        const dataInterest = [];
        var real = null;
        realid = null;

        realty.map((records) => {
            if (records.userid === userid) {
                real = records.realty;
                realid = records._id;
            }
        })

        i = 0;
        j=0;

       
        member.map((records) => {
            var email;
            var profile;
            var userids;
            var link;
            var mainid;
            TodoStore.setLoadingMemberInfo(true);
            if (records.userid === userid) {
               userids=records.userid;
               link=records.link;
               mainid=records._id;
                user.map((records) => {
                   
                    if (records._id === userid) {
                        
                        email = records.email;
                        profile = records.profile;
                        dataMember.push({
                            key: records._id,
                            mainid:mainid,
                            userid: userids,
                            link: link,
                            email: email,
                            profile: profile,
                            lastname: records.lastname,
                            firstname: records.firstname,
                            middlename: records.middlename,
                            realty: real,
                            realid: realid,
                            status: records.status,
                        })
                        TodoStore.setLoadingMemberInfo(false);
                    }
                    

                });
               
              
               
            }
        });
       
        expertise.map((records) => {
            if (records.userid === userid) {
                dataExpertise.push({
                    key: records._id,
                    expert: records.expertise
                })
            }
        })

        interest.map((records) => {
            if (records.userid === userid) {
                dataInterest.push({
                    key: records._id,
                    interest: records.interest
                })
            }
        })

       
      var ids;
        const newrecords = dataMember.filter(records => {
            return records;
        }).map((record, index) => {
            if (TodoStore.getEditFirstname === false) {
                TodoStore.setFirstname2(record.firstname);
            }
            if (TodoStore.getEditMiddlename === false) {
                TodoStore.setMiddlename2(record.middlename);
            }
            if (TodoStore.getEditLastname === false) {
                TodoStore.setLastname2(record.lastname);
            }
            if (TodoStore.getEditLink === false) {
                if(record.link==="NoLink"){
                    TodoStore.setLink2('');
                }else{
                    TodoStore.setLink2(record.link);
                }
               
            }

            if (record.realty === null) {
                TodoStore.setAddRealty(true);
                TodoStore.setEditRealty(false);
            } else {
                TodoStore.setAddRealty(false);
                if (TodoStore.getEditRealty === false) {
                    TodoStore.setRealty2(record.realty);
                }

            }

            if(TodoStore.getEditLogo===false){
                TodoStore.setProfile(record.profile);
            }
            ids = record.mainid;
        });

        const newinterest = dataInterest.filter(records => {
            return records;
        }).map((record, index) => {
            j++;
            return (
                <Col key={i} span={24}
                    style={{
                        minHeight: '2em',
                        height: 'auto'
                    }}
                >
                    <Row>
                        <Col span={2} style={{
                            height: '2em',
                            paddingTop: '1em'
                        }}>
                        </Col>
                        <Col span={12} style={{
                            height: '2em',
                            paddingTop: '1em'
                        }}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                fontSize: '1em',
                                fontWeight: '500'
                            }}
                                onDoubleClick={(event) => getThisInterest(record.key, record.interest)}
                            >
                                {j + '. ' + record.interest}
                            </h4>

                        </Col>

                        <Col span={4} style={{
                            height: '2em',
                            paddingTop: '0.5em',
                            paddingLeft: '1em'
                        }}>

                        </Col>
                    </Row>
                </Col>
            )
        })

        const newexpert = dataExpertise.filter(records => {
            return records;
        }).map((record, index) => {
            i++;
            return (
                <Col key={i} span={24}
                    style={{
                        minHeight: '2em',
                        height: 'auto'
                    }}
                >
                    <Row>
                        <Col span={2} style={{
                            height: '2em',
                            paddingTop: '1em'
                        }}>
                        </Col>
                        <Col span={12} style={{
                            height: '2em',
                            paddingTop: '1em'
                        }}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                fontSize: '1em',
                                fontWeight: '500'
                            }}
                                onDoubleClick={(event) => getThisExpertise(record.key, record.expert)}
                            >
                                {i + '. ' + record.expert}
                            </h4>

                        </Col>

                        <Col span={4} style={{
                            height: '2em',
                            paddingTop: '0.5em',
                            paddingLeft: '1em'
                        }}>

                        </Col>
                    </Row>
                </Col>
            )
        })
        const updateLink=()=>{
            var links = TodoStore.getLink;
            var link = links.replace(" ", "");
            var id = ids;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            TodoStore.setLoadingLink(true);
            if (link.length === 0) {
                type = "Warning";
                description = "Link is required";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                var checkmatch = 0;
                member.map((records) => {

                    if ((records.userid !== userid) && (records.link === link)) {
                        checkmatch = 1;
                    } else {

                    }

                });
                if (checkmatch === 1) {
                    TodoStore.setLoadingLink(false);
                    type = "Warning";
                    description = "Link you enter is not available.";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else {
                    var port = TodoStore.getPort;
                    var url = port + "memberrouter/link/" + id;
                    const account = {
                        link: link
                    }
                    axios.post(url, account)
                        .then(res => {
                            if (res.data === '404') {
                                TodoStore.setLoadingLink(false);
                                type = "Warning";
                                description = "Server Error";
                                icontype = "warning";
                                colors = "#ffc53d";
                                openNotification(type, description, icontype, colors);
                            } else if (res.data === '101') {
                                type = "Success";
                                description = "Your link successfully updated";
                                icontype = "check";
                                colors = "#73d13d";
                                openNotification(type, description, icontype, colors);
                               TodoStore.setEditLink(false);
                                TodoStore.setLoadingLink(false);
                                loadRecords();
                            }
                        });
                }
            }
        }
        const getThisInterest=(id, value)=>{
            TodoStore.setArticleId(id);
            TodoStore.setInterest2(value);
            TodoStore.setEditInterest(true);
        }
        const updateInterest=()=>{
            var id = TodoStore.getArticleId;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var interest = TodoStore.getInterest;

            if (interest.length === 0) {
                type = "Warning";
                description = "Don not leave business/interest field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                TodoStore.setLoadingInterest(true);
                const account = {
                    interest: interest
                }
                var port = TodoStore.getPort;
                var url = port + "interestrouter/update/" + id;

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            TodoStore.setLoadingInterest(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {
                            type = "Success";
                            description = "One of your business/interest successfully updated";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadingInterest(false);
                            TodoStore.setEditInterest(false);
                            TodoStore.setInterest2('');
                            loadRecords();
                        }
                    });
            }
        }
        const getThisExpertise = (id, value) => {
            TodoStore.setArticleId(id);
            TodoStore.setExpertise2(value);
            TodoStore.setEditExpertise(true);
        }
        const deleteInterest=()=>{
            var id = TodoStore.getArticleId;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var port = TodoStore.getPort;
            TodoStore.setIsDeleting(true);
            var url = port + "interestrouter/" + id;
            axios.delete(url)
            .then(res => {
                if (res.data === '404') {
                    TodoStore.setIsDeleting(false);
                    type = "Warning";
                    description = "Server Error";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else if (res.data === '101') {
                    type = "Success";
                    description = "One of your business/interest successfully deleted";
                    icontype = "check";
                    colors = "#73d13d";
                    openNotification(type, description, icontype, colors);
                    TodoStore.setIsDeleting(false);
                    TodoStore.setEditInterest(false);
                    TodoStore.setInterest2('');
                    loadRecords();
                }
            })
        }
        const deleteExpertise=()=>{
            var id = TodoStore.getArticleId;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var port = TodoStore.getPort;
            TodoStore.setIsDeleting(true);
            var url = port + "expertiserouter/" + id;
            axios.delete(url)
            .then(res => {
                if (res.data === '404') {
                    TodoStore.setIsDeleting(false);
                    type = "Warning";
                    description = "Server Error";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else if (res.data === '101') {
                    type = "Success";
                    description = "One of your expertise successfully deleted";
                    icontype = "check";
                    colors = "#73d13d";
                    openNotification(type, description, icontype, colors);
                    TodoStore.setIsDeleting(false);
                    TodoStore.setEditExpertise(false);
                    TodoStore.setExpertise2('');
                    loadRecords();
                }
            })
        }
        const updateExpertise = () => {
            var id = TodoStore.getArticleId;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var expertise = TodoStore.getExpertise;

            if (expertise.length === 0) {
                type = "Warning";
                description = "Don not leave expertise field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                TodoStore.setLoadingExpertise(true);
                const account = {
                    expertise: expertise
                }
                var port = TodoStore.getPort;
                var url = port + "expertiserouter/update/" + id;

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            TodoStore.setLoadingExpertise(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {
                            type = "Success";
                            description = "One of your expertise successfully updated";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadingExpertise(false);
                            TodoStore.setEditExpertise(false);
                            TodoStore.setExpertise2('');
                            loadRecords();
                        }
                    });
            }
        }
        const closeInterest=()=>{
            TodoStore.setEditInterest(false);
            TodoStore.setInterest2('');
        }
        const closeExpertise = () => {
            TodoStore.setEditExpertise(false);
            TodoStore.setExpertise2('');
        }
        const updateFirstname = () => {
            var userid = reactLocalStorage.get('userid');
            var users = userid;

            var lastname = TodoStore.getLastname;
            var middlename = TodoStore.getMiddlename;
            var firstname = TodoStore.getFirstname;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            if (firstname.length === 0) {
                type = "Warning";
                description = "Last name is required";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                var checkmatch = 0;
                user.map((records) => {

                    if ((records._id !== userid) && (records.firstname === firstname)
                        && (records.middlename === middlename) && (records.lastname === lastname)) {
                        checkmatch = 1;
                    } else {

                    }

                });
                if (checkmatch === 1) {

                    type = "Warning";
                    description = "Some member have the same firstname, middlename and lastname.";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else {
                    TodoStore.setIsLoading(true);
                    const account = {
                        firstname: firstname
                    }
                    var port = TodoStore.getPort;
                    var url = port + "accountrouter/update/member/firstname/" + users;

                    axios.post(url, account)
                        .then(res => {
                            if (res.data === '404') {
                                // openNotification("Exist");
                                type = "Warning";
                                description = "Server Error";
                                icontype = "warning";
                                colors = "#ffc53d";
                                openNotification(type, description, icontype, colors);
                            } else if (res.data === '101') {
                                updateMemberFirstname();

                            }
                        });
                }
            }
        }
        const updateMemberFirstname = () => {
            var id = ids;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var firstname = TodoStore.getFirstname;
            const account = {
                firstname: firstname
            }
            var port = TodoStore.getPort;
            var url = port + "memberrouter/update/firstname/" + id;

            axios.post(url, account)
                .then(res => {
                    if (res.data === '404') {
                        // openNotification("Exist");
                        type = "Warning";
                        description = "Server Error";
                        icontype = "warning";
                        colors = "#ffc53d";
                        openNotification(type, description, icontype, colors);
                    } else if (res.data === '101') {
                        TodoStore.setIsLoading(false);
                        type = "Success";
                        description = "First name successfully updated";
                        icontype = "check";
                        colors = "#73d13d";
                        openNotification(type, description, icontype, colors);
                        TodoStore.setIsLoadData(true);
                        TodoStore.setEditFirstname(false);
                        loadRecords();
                    }
                });
        }
        const updateMiddlename = () => {
            var userid = reactLocalStorage.get('userid');
            var users = userid;

            var lastname = TodoStore.getLastname;
            var middlename = TodoStore.getMiddlename;
            var firstname = TodoStore.getFirstname;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            if (middlename.length === 0) {
                type = "Warning";
                description = "Middle name is required";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                var checkmatch = 0;
                user.map((records) => {

                    if ((records._id !== userid) && (records.firstname === firstname)
                        && (records.middlename === middlename) && (records.lastname === lastname)) {
                        checkmatch = 1;
                    } else {

                    }

                });
                if (checkmatch === 1) {

                    type = "Warning";
                    description = "Some member have the same firstname, middlename and lastname.";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else {
                    TodoStore.setIsLoading(true);
                    const account = {
                        middlename: middlename
                    }
                    var port = TodoStore.getPort;
                    var url = port + "accountrouter/update/member/middlename/" + users;

                    axios.post(url, account)
                        .then(res => {
                            if (res.data === '404') {
                                // openNotification("Exist");
                                type = "Warning";
                                description = "Server Error";
                                icontype = "warning";
                                colors = "#ffc53d";
                                openNotification(type, description, icontype, colors);
                            } else if (res.data === '101') {
                                updateMemberMiddlename();

                            }
                        });
                }
            }
        }
        const updateMemberMiddlename = () => {
            var id = ids;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var middlename = TodoStore.getMiddlename;
            const account = {
                middlename: middlename
            }
            var port = TodoStore.getPort;
            var url = port + "memberrouter/update/middlename/" + id;

            axios.post(url, account)
                .then(res => {
                    if (res.data === '404') {
                        // openNotification("Exist");
                        type = "Warning";
                        description = "Server Error";
                        icontype = "warning";
                        colors = "#ffc53d";
                        openNotification(type, description, icontype, colors);
                    } else if (res.data === '101') {
                        TodoStore.setIsLoading(false);
                        type = "Success";
                        description = "Middle name successfully updated";
                        icontype = "check";
                        colors = "#73d13d";
                        openNotification(type, description, icontype, colors);
                        TodoStore.setIsLoadData(true);
                        TodoStore.setEditMiddlename(false);
                        loadRecords();
                    }
                });
        }
        const updateLastname = () => {
            var userid = reactLocalStorage.get('userid');
            var users = userid;

            var lastname = TodoStore.getLastname;
            var middlename = TodoStore.getMiddlename;
            var firstname = TodoStore.getFirstname;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            if (lastname.length === 0) {
                type = "Warning";
                description = "Last name is required";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                var checkmatch = 0;
                user.map((records) => {

                    if ((records._id !== userid) && (records.firstname === firstname)
                        && (records.middlename === middlename) && (records.lastname === lastname)) {
                        checkmatch = 1;
                    } else {

                    }

                });
                if (checkmatch === 1) {

                    type = "Warning";
                    description = "Some member have the same firstname, middlename and lastname.";
                    icontype = "warning";
                    colors = "#ffc53d";
                    openNotification(type, description, icontype, colors);
                } else {
                    TodoStore.setIsLoading(true);
                    const account = {
                        lastname: lastname
                    }
                    var port = TodoStore.getPort;
                    var url = port + "accountrouter/update/member/lastname/" + users;

                    axios.post(url, account)
                        .then(res => {
                            if (res.data === '404') {
                                // openNotification("Exist");
                                type = "Warning";
                                description = "Server Error";
                                icontype = "warning";
                                colors = "#ffc53d";
                                openNotification(type, description, icontype, colors);
                            } else if (res.data === '101') {
                                updateMemberLastname();

                            }
                        });
                }
            }
        }
        const updateMemberLastname = () => {
            var id = ids;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var lastname = TodoStore.getLastname;
            const account = {
                lastname: lastname
            }
            var port = TodoStore.getPort;
            var url = port + "memberrouter/update/lastname/" + id;

            axios.post(url, account)
                .then(res => {
                    if (res.data === '404') {
                        // openNotification("Exist");
                        type = "Warning";
                        description = "Server Error";
                        icontype = "warning";
                        colors = "#ffc53d";
                        openNotification(type, description, icontype, colors);
                    } else if (res.data === '101') {
                        TodoStore.setIsLoading(false);
                        type = "Success";
                        description = "Last name successfully updated";
                        icontype = "check";
                        colors = "#73d13d";
                        openNotification(type, description, icontype, colors);
                        TodoStore.setIsLoadData(true);
                        TodoStore.setEditLastname(false);
                        loadRecords();
                    }
                });
        }
        const addInterest=()=>{
            var interest = TodoStore.getInterest;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";

            if (interest.length === 0) {
                type = "Warning";
                description = "Don not leave business/interest field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                const realtys = {
                    userid: userid,
                    interest: interest
                }
                TodoStore.setLoadingInterest(true);
                var port = TodoStore.getPort;
                var url = port + "interestrouter/add";

                axios.post(url, realtys)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            TodoStore.setLoadingInterest(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {

                            type = "Success";
                            description = "Business/Interest successfully added";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadingInterest(false);
                            TodoStore.setInterest2('');
                            loadRecords();
                        }
                    });
            }
        }
        const addExpertise = () => {
            var expertise = TodoStore.getExpertise;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";

            if (expertise.length === 0) {
                type = "Warning";
                description = "Don not leave expertise field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                const realtys = {
                    userid: userid,
                    expertise: expertise
                }
                TodoStore.setLoadingExpertise(true);
                var port = TodoStore.getPort;
                var url = port + "expertiserouter/add";

                axios.post(url, realtys)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            TodoStore.setLoadingExpertise(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {

                            type = "Success";
                            description = "Expertise successfully added";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadingExpertise(false);
                            TodoStore.setExpertise2('');
                            loadRecords();
                        }
                    });
            }
        }
        const addRealty = () => {
            var realty = TodoStore.getRealty;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";

            if (realty.length === 0) {
                type = "Warning";
                description = "Don not leave realty field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                const realtys = {
                    userid: userid,
                    realty: realty
                }
                TodoStore.setLoadRealty(true);
                var port = TodoStore.getPort;
                var url = port + "realtyrouter/add";

                axios.post(url, realtys)
                    .then(res => {
                        if (res.data === '404') {
                            // openNotification("Exist");
                            TodoStore.setLoadRealty(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {

                            type = "Success";
                            description = "Realty successfully added";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadRealty(false);
                            loadRecords();
                        }
                    });
            }
        }
        const updateRealty = (value) => {
            var id = value;
            var type = "";
            var description = "";
            var icontype = "";
            var colors = "";
            var realty = TodoStore.getRealty;

            if (realty.length === 0) {
                type = "Warning";
                description = "Don not leave realty field blank";
                icontype = "warning";
                colors = "#ffc53d";
                openNotification(type, description, icontype, colors);
            } else {
                TodoStore.setLoadRealty(true);
                const account = {
                    realty: realty
                }
                var port = TodoStore.getPort;
                var url = port + "realtyrouter/update/" + id;

                axios.post(url, account)
                    .then(res => {
                        if (res.data === '404') {
                            TodoStore.setLoadRealty(false);
                            type = "Warning";
                            description = "Server Error";
                            icontype = "warning";
                            colors = "#ffc53d";
                            openNotification(type, description, icontype, colors);
                        } else if (res.data === '101') {
                            type = "Success";
                            description = "Realty successfully updated";
                            icontype = "check";
                            colors = "#73d13d";
                            openNotification(type, description, icontype, colors);
                            TodoStore.setLoadRealty(false);
                            TodoStore.setEditRealty(false);
                            loadRecords();
                        }
                    });
            }


        }
        const loadRecords = () => {
            const TodoStore = this.props.TodoStore;
            TodoStore.setIsLoadData(true);
            if (TodoStore.getIsLoadData === true) {
                fetch(TodoStore.getPort + 'memberrouter/')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            member: json,

                        })

                    });

                fetch(TodoStore.getPort + 'realtyrouter/')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            realty: json,

                        })

                    });
                fetch(TodoStore.getPort + 'expertiserouter/')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            expertise: json,

                        })

                    });
                    fetch(TodoStore.getPort + 'interestrouter/')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            interest: json,
    
                        })
    
                    });    
                fetch(TodoStore.getPort + 'accountrouter/')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            user: json,
                        })

                    });

                TodoStore.setIsLoadData(false);
            }
            userid = reactLocalStorage.get('userid');
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
        const updateProfile=()=>{
            var id = userid;
            var profile = TodoStore.getProfile;
            var type="";
            var description="";
            var icontype="";
            var colors="";
            if(profile.length===0){
                type="Warning";
                description="Browse image first.";
                icontype="warning";
                colors="#ffc53d";    
                openNotification(type,description,icontype,colors);
            }else{
                TodoStore.setIsLoading(true);
                    const account = {
                        profile:profile
                    }
                    var port = TodoStore.getPort;
                    var url = port+"accountrouter/update/memberprofile/"+id;
    
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
                                description="Your profile photo successfully updated";
                                icontype="check";
                                colors="#73d13d";    
                                openNotification(type,description,icontype,colors);
                                TodoStore.setCancelModal(false);
                                TodoStore.setIsLoadData(true);
                                reactLocalStorage.set('userprofile', TodoStore.getProfile);
                                TodoStore.setEditLogo(false);
                                window.open("/member-info","_self");
                            }
                        });
            }
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
                {/* <Skeleton loading={TodoStore.getLoadingMemberInfo}> */}
                    <Col span={24}
                        style={{
                            minHeight: '40em',
                            height: 'auto'
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
                                        Profile Photo
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
                                             height:'8em',
                                             width:'8em',
                                             borderRadius:'50%'
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
                                        onClick={(event) => updateProfile()}
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
                            {/* First Name */}
                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Member's Link:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        {TodoStore.getEditLink &&
                                            <Input addonBefore="https://www.pareb.org/member/" placeholder="Enter your link here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                value={TodoStore.getLink}
                                                onChange={TodoStore.setLink} />
                                        }
                                        {!TodoStore.getEditLink &&
                                            <Input addonBefore="https://www.pareb.org/member/" placeholder="Enter your link name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                disabled
                                                value={TodoStore.getLink}
                                                onChange={TodoStore.setLink} />
                                        }

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditLink &&
                                            <Button style={{
                                                color: '#ffffff',
                                                backgroundColor: '#52c41a'
                                            }}
                                                onClick={(event) => TodoStore.setEditLink(true)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                        }
                                        {TodoStore.getEditLink &&
                                            <React.Fragment>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff'
                                                }}
                                                    onClick={(event) => updateLink()}
                                                >
                                                    {!TodoStore.getLoadingLink &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getLoadingLink &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => TodoStore.setEditLink(false)}
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
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            First Name:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        {TodoStore.getEditFirstname &&
                                            <Input placeholder="Enter first name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                value={TodoStore.getFirstname}
                                                onChange={TodoStore.setFirstname} />
                                        }
                                        {!TodoStore.getEditFirstname &&
                                            <Input placeholder="Enter first name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                disabled
                                                value={TodoStore.getFirstname}
                                                onChange={TodoStore.setFirstname} />
                                        }

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditFirstname &&
                                            <Button style={{
                                                color: '#ffffff',
                                                backgroundColor: '#52c41a'
                                            }}
                                                onClick={(event) => TodoStore.setEditFirstname(true)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                        }
                                        {TodoStore.getEditFirstname &&
                                            <React.Fragment>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff'
                                                }}
                                                    onClick={(event) => updateFirstname()}
                                                >
                                                    {!TodoStore.getIsLoading &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getIsLoading &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => TodoStore.setEditFirstname(false)}
                                                >

                                                    <i className="fa fa-times"></i>


                                                </Button>
                                            </React.Fragment>
                                        }
                                    </Col>

                                </Row>
                            </Col>
                            {/* Middle Name */}
                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Middle Name:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        {TodoStore.getEditMiddlename &&
                                            <Input placeholder="Enter middle name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                value={TodoStore.getMiddlename}
                                                onChange={TodoStore.setMiddlename} />
                                        }
                                        {!TodoStore.getEditMiddlename &&
                                            <Input placeholder="Enter middle name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                disabled
                                                value={TodoStore.getMiddlename}
                                                onChange={TodoStore.setMiddlename} />
                                        }

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditMiddlename &&
                                            <Button style={{
                                                color: '#ffffff',
                                                backgroundColor: '#52c41a'
                                            }}
                                                onClick={(event) => TodoStore.setEditMiddlename(true)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                        }
                                        {TodoStore.getEditMiddlename &&
                                            <React.Fragment>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff'
                                                }}
                                                    onClick={(event) => updateMiddlename()}
                                                >
                                                    {!TodoStore.getIsLoading &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getIsLoading &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => TodoStore.setEditMiddlename(false)}
                                                >

                                                    <i className="fa fa-times"></i>


                                                </Button>
                                            </React.Fragment>
                                        }
                                    </Col>

                                </Row>
                            </Col>
                            {/* Last Name */}
                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Last Name:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        {TodoStore.getEditLastname &&
                                            <Input placeholder="Enter last name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                value={TodoStore.getLastname}
                                                onChange={TodoStore.setLastname} />
                                        }
                                        {!TodoStore.getEditLastname &&
                                            <Input placeholder="Enter last name here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                disabled
                                                value={TodoStore.getLastname}
                                                onChange={TodoStore.setLastname} />
                                        }

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditLastname &&
                                            <Button style={{
                                                color: '#ffffff',
                                                backgroundColor: '#52c41a'
                                            }}
                                                onClick={(event) => TodoStore.setEditLastname(true)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                        }
                                        {TodoStore.getEditLastname &&
                                            <React.Fragment>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff'
                                                }}
                                                    onClick={(event) => updateLastname()}
                                                >
                                                    {!TodoStore.getIsLoading &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getIsLoading &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button>
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => TodoStore.setEditLastname(false)}
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
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Realty:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        {TodoStore.getAddRealty &&
                                            <Input placeholder="Enter realty here..." style={{
                                                width: '100%',
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                                value={TodoStore.getRealty}
                                                onChange={TodoStore.setRealty} />
                                        }
                                        {!TodoStore.getAddRealty &&
                                            <React.Fragment>
                                                {!TodoStore.getEditRealty &&
                                                    <Input placeholder="Enter realty here..." style={{
                                                        width: '100%',
                                                        fontFamily: 'Open Sans,sans-serif'
                                                    }}
                                                        disabled
                                                        value={TodoStore.getRealty}
                                                        onChange={TodoStore.setRealty} />
                                                }
                                                {TodoStore.getEditRealty &&
                                                    <Input placeholder="Enter realty here..." style={{
                                                        width: '100%',
                                                        fontFamily: 'Open Sans,sans-serif'
                                                    }}
                                                        value={TodoStore.getRealty}
                                                        onChange={TodoStore.setRealty} />
                                                }
                                            </React.Fragment>
                                        }


                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {TodoStore.getAddRealty &&
                                            <Button style={{
                                                fontFamily: 'Open Sans,sans-serif',
                                                color: '#ffffff',
                                                backgroundColor: '#2a166f'
                                            }}
                                                onClick={(event) => addRealty()}
                                            >
                                                {!TodoStore.getLoadRealty &&
                                                    <i className="fa fa-plus"></i>
                                                }
                                                {TodoStore.getLoadRealty &&
                                                    <Icon type="loading" />
                                                }

                                            </Button>
                                        }
                                        {!TodoStore.getAddRealty &&
                                            <React.Fragment>
                                                {TodoStore.getEditRealty &&
                                                    <React.Fragment>
                                                        <Button style={{
                                                            fontFamily: 'Open Sans,sans-serif',
                                                            color: '#ffffff',
                                                            backgroundColor: '#1890ff '
                                                        }}
                                                            onClick={(event) => updateRealty(realid)}
                                                        >
                                                            {!TodoStore.getLoadRealty &&
                                                                <i className="fa fa-save"></i>
                                                            }
                                                            {TodoStore.getLoadRealty &&
                                                                <Icon type="loading" />
                                                            }

                                                        </Button> <Button style={{
                                                            color: '#ffffff',
                                                            backgroundColor: '#f5222d'
                                                        }}
                                                            onClick={(event) => TodoStore.setEditRealty(false)}
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </Button>
                                                    </React.Fragment>
                                                }
                                                {!TodoStore.getEditRealty &&
                                                    <React.Fragment>
                                                        <Button style={{
                                                            color: '#ffffff',
                                                            backgroundColor: '#52c41a'
                                                        }}
                                                            onClick={(event) => TodoStore.setEditRealty(true)}
                                                        >
                                                            <i className="fa fa-pencil"></i>
                                                        </Button>
                                                    </React.Fragment>

                                                }
                                            </React.Fragment>
                                        }


                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Expertise:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        <Input placeholder="Enter expertise here..." style={{
                                            width: '100%',
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                            value={TodoStore.getExpertise}
                                            onChange={TodoStore.setExpertise}
                                        />

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditExpertise &&
                                            <Button style={{
                                                fontFamily: 'Open Sans,sans-serif',
                                                color: '#ffffff',
                                                backgroundColor: '#2a166f'
                                            }}
                                                onClick={(event) => addExpertise()}
                                            >
                                                {!TodoStore.getLoadingExpertise &&
                                                    <i className="fa fa-plus"></i>
                                                }
                                                {TodoStore.getLoadingExpertise &&
                                                    <Icon type="loading" />
                                                }

                                            </Button>
                                        }
                                        {TodoStore.getEditExpertise &&
                                            <React.Fragment>
                                                <Button style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff '
                                                }}
                                                    onClick={(event) => updateExpertise()}
                                                >
                                                    {!TodoStore.getLoadingExpertise &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getLoadingExpertise &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button> 
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => closeExpertise()}
                                                >
                                                    <i className="fa fa-times"></i>
                                                </Button>
                                                <Popconfirm placement="topLeft" title={"Do you want to remove this expertise"} onConfirm={(event)=>deleteExpertise()} okText="Yes" cancelText="No">
                                                    <Button style={{
                                                        color: '#ffffff',
                                                        backgroundColor: '#a8071a'
                                                    }}
                                                    >
                                                        {!TodoStore.getIsDeleting &&
                                                             <i className="fa fa-trash"></i>
                                                        }
                                                        {TodoStore.getIsDeleting &&
                                                           <Icon type="loading" />
                                                        }
                                                       
                                                    </Button>
                                                </Popconfirm>
                                            </React.Fragment>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            List of Expertise:
                                    </h4>



                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        <Tooltip
                                            style={{
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                            placement="topLeft" title="Double click single expertise below to edit/remove">
                                            <Button style={{
                                                color: '#8c8c8c',
                                                backgroundColor: '#e8e8e8'
                                            }}>
                                                <i className="fa fa-question"></i>
                                            </Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>

                            {newexpert}

                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto',
                                    marginTop:'2em'
                                }}
                            >
                                <Row>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            Other Business/Interest:
                                    </h4>
                                    </Col>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>
                                        <Input placeholder="Enter other business/interest here..." style={{
                                            width: '100%',
                                            fontFamily: 'Open Sans,sans-serif'
                                        }}
                                            value={TodoStore.getInterest}
                                            onChange={TodoStore.setInterest}
                                        />

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        {!TodoStore.getEditInterest &&
                                            <Button style={{
                                                fontFamily: 'Open Sans,sans-serif',
                                                color: '#ffffff',
                                                backgroundColor: '#2a166f'
                                            }}
                                                onClick={(event) => addInterest()}
                                            >
                                                {!TodoStore.getLoadingInterest &&
                                                    <i className="fa fa-plus"></i>
                                                }
                                                {TodoStore.getLoadingInterest &&
                                                    <Icon type="loading" />
                                                }

                                            </Button>
                                        }
                                        {TodoStore.getEditInterest &&
                                            <React.Fragment>
                                                <Button style={{
                                                    fontFamily: 'Open Sans,sans-serif',
                                                    color: '#ffffff',
                                                    backgroundColor: '#1890ff '
                                                }}
                                                    onClick={(event) => updateInterest()}
                                                >
                                                    {!TodoStore.getLoadingInterest &&
                                                        <i className="fa fa-save"></i>
                                                    }
                                                    {TodoStore.getLoadingInterest &&
                                                        <Icon type="loading" />
                                                    }

                                                </Button> 
                                                <Button style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#f5222d'
                                                }}
                                                    onClick={(event) => closeInterest()}
                                                >
                                                    <i className="fa fa-times"></i>
                                                </Button>
                                                <Popconfirm placement="topLeft" title={"Do you want to remove this business/interest"} onConfirm={(event)=>deleteInterest()} okText="Yes" cancelText="No">
                                                    <Button style={{
                                                        color: '#ffffff',
                                                        backgroundColor: '#a8071a'
                                                    }}
                                                    >
                                                        {!TodoStore.getIsDeleting &&
                                                             <i className="fa fa-trash"></i>
                                                        }
                                                        {TodoStore.getIsDeleting &&
                                                           <Icon type="loading" />
                                                        }
                                                       
                                                    </Button>
                                                </Popconfirm>
                                                
                                            </React.Fragment>
                                        }
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}
                                style={{
                                    minHeight: '3em',
                                    height: 'auto'
                                }}
                            >
                                <Row>
                                    <Col span={8} style={{
                                        height: '3em',
                                        paddingTop: '1em'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'Open Sans,sans-serif',
                                            fontSize: '1em',
                                            fontWeight: '500'
                                        }}>
                                            List of other Business/Interest:
    </h4>



                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em'
                                    }}>

                                    </Col>
                                    <Col span={4} style={{
                                        height: '3em',
                                        paddingTop: '0.5em',
                                        paddingLeft: '1em'
                                    }}>
                                        <Tooltip
                                            style={{
                                                fontFamily: 'Open Sans,sans-serif'
                                            }}
                                            placement="topLeft" title="Double click single business/interest below to edit">
                                            <Button style={{
                                                color: '#8c8c8c',
                                                backgroundColor: '#e8e8e8'
                                            }}>
                                                <i className="fa fa-question"></i>
                                            </Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>

                            {newinterest}
                        </Row>


                    </Col>
                {/* </Skeleton> */}
            </React.Fragment>
        );
    }
}

AddRecord.propTypes = {

};

export default AddRecord;