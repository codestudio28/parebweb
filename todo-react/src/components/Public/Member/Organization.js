import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Tooltip, notification, Col, Row } from 'antd';
import SingleOrg from './SingleOrg';
import { inject, observer } from 'mobx-react';


@inject('TodoStore')
@observer
class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }
    componentDidMount() {
        const TodoStore = this.props.TodoStore;
        fetch(TodoStore.getPort + 'orgrouter/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    records: json,
                })
            });
    }
    render() {
        const TodoStore = this.props.TodoStore;
        var { records} = this.state;
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
                orgid:records.userid

            })
        ));
        var link='';
        const newrecords = dataSource.filter(records => {
            return records;


        }).map((record, index) => {
            link="/organization/"+record.orgaccr;
            return (
                <SingleOrg logo={record.logo}
                           orgaccr={record.orgaccr}
                           orgid={record.orgid}
                           city={record.city}
                           province={record.province}
                           link={link}
                />
            )
        });
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}
                        style={{
                            height: 'auto',
                            minHeight: '18em'
                        }}
                    >
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <Row>
                                {newrecords}
                               
                            </Row>
                        </Col>
                        <Col span={2}>
                        </Col>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

Organization.propTypes = {

};

export default Organization;