import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification,Col,Row } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import styled from 'styled-components';
import Headers from '../Headers';
import Navbars from './Navbars';
import Footers from './Footers';
import Login from './Login';
@inject('TodoStore')
@observer
class Index extends Component {
    render() {
        return (
           <React.Fragment>
               <Headers/>
               <Navbars/>
               <Login/>
               <Footers/>
           </React.Fragment>
        );
    }
}

Index.propTypes = {

};

export default Index;