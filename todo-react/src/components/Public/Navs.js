import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

// import { BurgerIcon } from './'
import styled from "styled-components";

const Navigation = styled.header`
  width: 100%;
  border-bottom: 5px solid #800000;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 10em 1em 10em;
  height: 7.5em;
  background: #f8f8f8;

  .logo a {
    // padding-top: 33px;
    display: flex;
    flex-direction: column;
    clear: both;
    //padding-bottom: 30px;
    text-decoration: none;

    p {
      width: 500px;
      display: block;
    }
    em {
      font-size: 0.5em;
      float: left;
      display: block;
      img {
        display: inline-block;
        margin-top: 5px;
        width: 15px;
        float: left;
      }
      .letterhead {
        display: inline-block;
        line-height: 260%;
        float: left;
      }
    }
  }
  .gray {
    color: #ccc;
  }
  a {
    color: #222;
    opacity: 1;
    transition: all 0.6s;
    color: #222;
    font-size: 1em;
  }
  a:hover {
    opacity: 1;
  }
  .fa-bars {
    display: none;
    color: #222;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      margin: 0 15px;
      justify-content: space-between;
      font-size: 1em;
    }
    a {
      font-size: 1em;
      text-decoration: none;
      .active {
        color: tomato;
      }
    }
    a.active {
      color: #222;
    }
  }
  @media only screen and (max-width: 1600px) {
    padding: 0px;
    .logo {
      padding-left: 15px;
      padding-top: 0px !important;
    }
    .mylogo{
      width:10em;
    }
  }
  @media only screen and (max-width: 800px) {
    padding: 0px;
    .logo {
      padding-left: 15px;
      padding-top: 0px !important;
    }
    .mylogo{
      width:5em;
    }
  }
  @media only screen and (max-width: 600px) {
    height: auto;
    min-height: 50px;
    display: block;
    position: relative;
    .logo {
      width: 100%;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
      }
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 1em;
      right: 1em;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;

      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
    .mylogo{
      width:2em;
    }
  }
  .navi{
      color:#092b00;
      font-weight:'bold';
  }
  .navi:hover{
    color:#73d13d;
    font-weight:'bold';
  }
  .navbars{
    width:10em;
    height:3em;
    padding-top:1em;
    text-align:center;
    border-radius:0.25em;
    color:#092b00;
    margin-Right:0.25em;
    font-size:1.2em;
    font-family:'Open Sans',sans-serif;
  }
  .navbars:hover{
    width:10em;
    height:3em;
    background-color:#800000;
    padding-top:1em;
    text-align:center;
    border-radius:0.25em;
    color:#ffffff;
    margin-Right:0.25em;
    font-family:'Open Sans',sans-serif;
  }
  .activenav{
    width:10em;
    height:3em;
    background-color:#800000;
    padding-top:1em;
    text-align:center;
    border-radius:0.25em;
    color:#ffffff;
    margin-Right:0.25em;
    font-family:'Open Sans',sans-serif;
  }
  .nav-inquire{
    width:8em;
    height:3em;
    background-color:#73d13d;
    padding-top:1em;
    text-align:center;
    border-radius:0.25em;
    color:#135200;
    margin-Right:0.5em;
  }
  .nav-inquire:hover{
    width:8em;
    height:3em;
    background-color:#135200;
    padding-top:1em;
    text-align:center;
    border-radius:0.25em;
    color:#ffffff;
    margin-Right:0.5em;
  }
`;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      count:0,
      navs:false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  render() {
    const { isExpanded } = this.state;

    return (
      <Navigation>
        <div className="logo">
          <Link to="/">
            <img style={{width:'10em'}} src="https://res.cloudinary.com/lipacity/image/upload/v1580789165/lipalogo_enmjhd.png"/>
            {/* <em>
              <div className="letterhead">
                <span className="name" style={{fontSize:'1.75em',fontFamily:'Open Sans, sans-serif',fontWeight:'bold'}}>Mount Malarayat Property Development Corp.</span>
               
              </div>
            </em> */}
          </Link>
        </div>
        <nav className="nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <NavLink activeClassName="active" to="/">
                <div className="navbars activenav">
                    <li >HOME</li>
                </div>
                
            </NavLink>
            <NavLink activeClassName="active" to="/about">
                <div className="navbars">
                    <li >NEWS</li>
                </div>
              
            </NavLink>
            <NavLink activeClassName="active" to="/about">
                <div className="navbars">
                    <li >EVENTS</li>
                </div>
              
            </NavLink>
            <NavLink activeClassName="active" to="/login">
                <div className="navbars">
                    <li>GOVERNMENT</li>
                </div>
            </NavLink>
            <NavLink activeClassName="active" to="/contact">
                <div className="navbars">
                    <li>SERVICES</li>
                </div>
            </NavLink>

            <NavLink activeClassName="active" to="/login">
                <div className="navbars">
                    <li>DIRECTORY</li>
                </div>
            </NavLink>
           
          
          
               
           
          </ul>
        </nav>
      </Navigation>
    );
  }
}

export default Nav;
