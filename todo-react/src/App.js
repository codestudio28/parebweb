import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from './components/index';
import Home from './components/Public/Home/Index';
import Login  from './components/Public/Login/Index';
import Events from './components/Public/Events/Index';
import News from './components/Public/News/Index';
import SingleNews from './components/Public/SingleNews/Index';
import SingleEvents from './components/Public/SingleEvents/Index';
import Organization  from './components/Public/Organization/Index';
import Member  from './components/Public/Member/Index';

// Desktop Admin
import AdminIndex from './components/Administrator/Index';
import AdminDashboard from './components/Administrator/Desktop/Dashboard/Index';
import AdminList from './components/Administrator/Desktop/AdminUser/Index';
import AdminListRemoved from './components/Administrator/Desktop/AdminUserRemoved/Index';
import AdminNews from './components/Administrator/Desktop/AdminNews/Index';
import AdminNewsRemove from './components/Administrator/Desktop/AdminNewsRemoved/Index';
import AdminEvents from './components/Administrator/Desktop/AdminEvent/Index';
import AdminEventsRemove from './components/Administrator/Desktop/AdminEventRemoved/Index';

import AdminMember from './components/Administrator/Desktop/AdminMember/Index';
import AdminMemberRemoved from './components/Administrator/Desktop/AdminMemberRemoved/Index';
import AdminOrganization from './components/Administrator/Desktop/AdminOrganization/Index';
import AdminOrganizationRemoved from './components/Administrator/Desktop/AdminOrganizationRemoved/Index';

import OrgDashboard from './components/Administrator/Desktop/OrgDashboard/Index';
import OrgOfficer from './components/Administrator/Desktop/OrgOfficer/Index';
import OrgMember from './components/Administrator/Desktop/OrgMember/Index';
import OrgInfo from './components/Administrator/Desktop/OrgInfo/Index';

import MemberDashboard from './components/Administrator/Desktop/MemberDashboard/Index';
import MemberInfo from './components/Administrator/Desktop/MemberInfo/Index';
function App() {

  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Index}></Route>
          <Route path="/members" exact component={Member}></Route>
          <Route path="/members/:link" exact component={Member}></Route>
          <Route path="/organization" exact component={Organization}></Route>
          <Route path="/organization/:pages" exact component={Organization}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/events" exact component={Events}></Route>
          <Route path="/news" exact component={News}></Route>
          <Route path="/news/:single" exact component={News}></Route>
          <Route path="/single-events" exact component={SingleEvents}></Route>
          <Route path="/events/:single" exact component={SingleEvents}></Route>
          {/* <Route path="/single-news" exact component={SingleNews}></Route> */}
         

          {/* Admin */}
          <Route path="/admin-index" exact component={AdminIndex}></Route>
          <Route path="/admin-dashboard" exact component={AdminDashboard}></Route>
          <Route path="/admin-list-admin" exact component={AdminList}></Route>
          <Route path="/admin-removed-admin" exact component={AdminListRemoved}></Route>
          <Route path="/admin-list-member" exact component={AdminMember}></Route>
          <Route path="/admin-removed-member" exact component={AdminMemberRemoved}></Route>
          <Route path="/admin-list-organization" exact component={AdminOrganization}></Route>
          <Route path="/admin-removed-organization" exact component={AdminOrganizationRemoved}></Route>
          <Route path="/admin-news" exact component={AdminNews}></Route>
          <Route path="/admin-news-removed" exact component={AdminNewsRemove}></Route>
          <Route path="/admin-events" exact component={AdminEvents}></Route>
          <Route path="/admin-events-removed" exact component={AdminEventsRemove}></Route>
          
          {/* Organization */}
          <Route path="/org-dashboard" exact component={OrgDashboard}></Route>
          <Route path="/org-officer" exact component={OrgOfficer}></Route>
          <Route path="/org-member" exact component={OrgMember}></Route>
          <Route path="/org-info" exact component={OrgInfo}></Route>

          {/* Member */}
          <Route path="/member-dashboard" exact component={MemberDashboard}></Route>
          <Route path="/member-info" exact component={MemberInfo}></Route>
        </Switch>
    </Router>
  );
}

export default App;
