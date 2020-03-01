import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Input, Icon, Tooltip, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import styled from 'styled-components';
import Headers from '../Headers';
import Navbars from './Navbars';
import Slider from './Slider';
import NewsSection from './NewsSection';
import Footers from './Footers';

@inject('TodoStore')
@observer
class Index extends Component {
    render() {
        const TodoStore = this.props.TodoStore;

        TodoStore.setArticleId(this.props.newsid);
        
        return (
           <React.Fragment>
               <Headers/>
               <Navbars/>
               {/* <Slider/>
               <EventSection/> */}
               <NewsSection/>
               <Footers/>
           </React.Fragment>
        );
    }
}

Index.propTypes = {

};

export default Index;