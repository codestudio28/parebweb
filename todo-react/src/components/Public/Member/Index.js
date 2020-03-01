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
import Member from './Member';
import Individual from './Individual';

const Index = ({ match, location }) => {
    const {
        params: { link }
      } = match;
    const getPage=()=>{
      console.log(link);
      if(link===undefined){
        // return(
        //  <Member/>
         
        // )
        window.open("/","_self");
      }else{
        return(
         <React.Fragment>
        <Individual member={link} />
         </React.Fragment>
         
         
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