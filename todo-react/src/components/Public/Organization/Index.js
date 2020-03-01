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
import Org from './Org';
import Organization from './Organization';

const Index = ({ match, location }) => {
    const {
        params: { pages }
      } = match;
    const getPage=()=>{
      console.log(pages);
      if(pages===undefined){
        return(
          <Organization/>
        )
      }else{
        return(
          <Org orgname={pages} />
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