import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Modal,Input,notification,Icon,Steps } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

const { Step } = Steps;
@inject('TodoStore')
@observer
class StepGuide extends Component {
    render() {
        const TodoStore = this.props.TodoStore;
        return (
            <React.Fragment>
                <Row>
                    <Col span={24} style={{
                        minHeight:'3em',
                        height:'auto'
                    }}>
                    <Steps style={{
                        fontFamily:'Open Sans, sans-serif'
                    }}
                    current={TodoStore.getNewsStep}>
                        {!TodoStore.getUpdateNews &&
                            <Step title="Create Event" />
                        }
                        {TodoStore.getUpdateNews &&
                            <Step title="Update Event" />
                        }
                        
                        <Step title="Upload Banner" />
                        <Step title="Preview Event" />
                        <Step title="Finished" />
                    </Steps>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

StepGuide.propTypes = {

};

export default StepGuide;