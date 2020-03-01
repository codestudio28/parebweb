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
import SingleNews from '../SingleNews/Index';
import Footers from './Footers';


const Index = ({ match, location }) => {
    const {
        params: { single }
      } = match;

      const gotoPage=()=>{
          if(single==undefined){
              return(
                <React.Fragment>
                <Headers/>
                <Navbars/> 
                <NewsSection/>
                <Footers/>
                </React.Fragment>
              )
          }else{
            return(
                <React.Fragment>
                 <SingleNews newsid={single}/>
                </React.Fragment>
              )
          }
      }
        return (
           <React.Fragment>
               {
                   gotoPage()
               }
              
             
           </React.Fragment>
        );
    
}

Index.propTypes = {

};

export default Index;