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
import EventSection from './EventSection';
import Footers from './Footers';


const Index = ({ match, location }) => {
    const {
        params: { single }
      } = match;
    const getPage=()=>{
      console.log(single);
      if(single===undefined){
        
      }else{
        return(
          <EventSection event={single} />
        )
      }
     
    }
        return (
          <React.Fragment>
             <Headers />
            <Navbars />
            {getPage()}
            <Footers />
             
          </React.Fragment>
         
           
        );
    
}

Index.propTypes = {

};

export default Index;