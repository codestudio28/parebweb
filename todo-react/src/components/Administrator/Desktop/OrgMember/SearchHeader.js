import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Row, Col, Button,Select,Input } from 'antd';
import '../../index.css';
import { inject, observer } from 'mobx-react';
const { Option } = Select;

@inject('TodoStore')
@observer
class SearchHeader extends Component {
    render() {
        const TodoStore = this.props.TodoStore;
        const changeFilter=(value)=>{
           TodoStore.setFilter(value);
           console.log(TodoStore.getFilter);
        }
        const changeRow=(value)=>{
           TodoStore.setDisplay(value);
        }
        return (
            <React.Fragment>
                <Col span={24} style={{
                    paddingTop: '1em'
                }}>
                    <Row>
                        <Col span={6}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                color: '#bfbfbf',
                                fontSize: '1em'
                            }}>
                                Filter by:
                            </h4>
                        </Col>
                        <Col span={6}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                color: '#bfbfbf',
                                fontSize: '1em'
                            }}>
                                Number of rows:
                                                </h4>
                        </Col>
                        <Col span={6}>
                            <h4 style={{
                                fontFamily: 'Open Sans,sans-serif',
                                color: '#bfbfbf',
                                fontSize: '1em'
                            }}>
                                Search:
                                                </h4>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={6}>
                            <Select defaultValue="All" style={{ 
                                width:'90%',
                                fontFamily:'Open Sans,sans-serif'
                            }} onChange={changeFilter}>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="All">All</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="Middle Name">Middle Name</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="Last Name">Last Name</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="First Name">First Name</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="National Status">National Status</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <Select defaultValue="10" style={{ 
                                width:'90%',
                                fontFamily:'Open Sans,sans-serif'
                            }} onChange={changeRow}>
                                 <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="1">1</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="10">10</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="15">15</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="20">20</Option>
                                <Option style={{
                                     fontFamily:'Open Sans,sans-serif'
                                }} value="50">50</Option>
                            </Select>   
                        </Col>
                        <Col span={6}>
                            <Input placeholder="Search here..." style={{
                                 width:'90%',
                                 fontFamily:'Open Sans,sans-serif'
                            }}
                            onChange={TodoStore.setSearch}
                            />
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        );
    }
}

SearchHeader.propTypes = {

};

export default SearchHeader;