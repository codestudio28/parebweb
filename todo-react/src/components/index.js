import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Index from './Public/Home/Index';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizes: 0
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav === true) {
            this.setState({ sizes: 1 });
        }
    }
    render() {
        const gotoPage=()=>{
            window.open("/home","_self");
        }
        const  gotoPageMobile=()=>{
            window.open("/home","_self");
        }
        var { sizes } = this.state;
        return (
           <React.Fragment>

               {sizes===0 &&
                    gotoPage()
               }
               {sizes===1 &&
                     gotoPageMobile()
               }

           </React.Fragment>
        );
    }
}

index.propTypes = {

};

export default index;