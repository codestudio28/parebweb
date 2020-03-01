import React from 'react';
import { observable, action, computed } from 'mobx';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";  


class TodoStore {
@observable port="http://localhost:8080/";
@observable eventdate='2020-01-01';
@observable editLink=false;
@observable loadingLink=false;
@observable link='';
@observable times='00:00:00';
@observable place='';
@observable orgid='';
@observable description='';
@observable network='';
@observable realty='';
@observable expertise='';
@observable isdeleting=false;
@observable memberstatus=false;
@observable interest='';
@observable loadingrealty=false;
@observable loadingInterest=false;
@observable editExpertise=false;
@observable editInterest=false;
@observable loadingExpertise=false;
@observable loadingMemberInfo=false;
@observable editRealty=false;
@observable addRealty=false;
@observable editLogo=false;
@observable editNetwork=false;
@observable editOrgName=false;
@observable editOrgAccr=false;
@observable editOrgPresident=false;
@observable editOrgCity=false;
@observable editOrgProvince=false;
@observable editMemberLastname=false;
@observable editMemberFirstname=false;
@observable editMemberMiddlename=false;
@observable login=false;
@observable total=0;
@observable govpage=0;
@observable position='';
@observable updateRecordModal=false;
@observable viewRecordModal=false;
@observable addRecordModal=false;
@observable email='';
@observable lastname='';
@observable firstname='';
@observable middlename='';
@observable city='';
@observable province='';
@observable profile='';
@observable password='';
@observable orgname='';
@observable orgaccronym='';
@observable president='';
@observable city='';
@observable province='';
@observable password='';
@observable isloading=false;
@observable isloaddata=true;
@observable search='';
@observable filter='All';
@observable display = 10;
@observable currentpage = 1;
@observable updaterecordId = "0";
@observable newsstep = 0;
@observable iscreatenews = false;
@observable isupdatenews = false;
@observable editor = '';
@observable title = '';
@observable banner = '';
@observable uploadloading = false;
@observable imageurl = '';
@observable isimage = false;
@observable articleid = '';
@observable articledisplay = 10;

@action setLoadingLink = (value) => {
  this.loadingLink=value;
}
@action setLink = (e) => {
  this.link=e.target.value;
}
@action setLink2 = (value) => {
  this.link=value;
}
@action setEditLink = (value) => {
  this.editLink=value;
}
@action setDescription = (e) => {
  this.description=e.target.value;
}
@action setDescription2 = (value) => {
  this.description=value;
}
@action setPlace = (e) => {
  this.place=e.target.value;
}
@action setPlace2 = (value) => {
  this.place=value;
}
@action setTime = (value) => {
  this.times=value;
}
@action setEventDate = (date, dateString) => {
  this.eventdate=dateString;
}
@action setEventDate2 = (value) => {
  this.eventdate=value;
}
@action setMemberStatus = (value) => {
  this.memberstatus=value;
}
@action setIsDeleting = (value) => {
  this.isdeleting=value;
}
@action setEditExpertise = (value) => {
  this.editExpertise=value;
}
@action setEditInterest = (value) => {
  this.editInterest=value;
}
@action setLoadingInterest = (value) => {
  this.loadingInterest=value;
}
@action setInterest = (e) => {
  this.interest=e.target.value;
}
@action setInterest2 = (value) => {
  this.interest=value;
}
@action setExpertise = (e) => {
  this.expertise=e.target.value;
}
@action setExpertise2 = (value) => {
  this.expertise=value;
}
@action setLoadingExpertise = (value) => {
  this.loadingExpertise=value;
}
@action setLoadingMemberInfo = (value) => {
  this.loadingMemberInfo=value;
}
@action setLoadRealty = (value) => {
  this.loadingrealty=value;
}
@action setRealty = (e) => {
  this.realty=e.target.value;
}
@action setRealty2 = (value) => {
  this.realty=value;
}
@action setEditRealty = (value) => {
  this.editRealty=value;
}
@action setAddRealty = (value) => {
  this.addRealty=value;
}
@action setEditFirstname = (value) => {
  this.editMemberFirstname=value;
}
@action setEditMiddlename = (value) => {
  this.editMemberMiddlename=value;
}
@action setEditLastname = (value) => {
  this.editMemberLastname=value;
}
@action setOrgId = (value) => {
  this.orgid=value;
}
@action setEditLogo = (value) => {
  this.editLogo=value;
}
@action setNetwork = (e) => {
  this.network=e.target.value;
}
@action setNetwork2 = (value) => {
  this.network=value;
}
@action setEditNetwork = (value) => {
  this.editNetwork=value;
}
@action setEditOrgName = (value) => {
  this.editOrgName=value;
}
@action setEditOrgAccr = (value) => {
  this.editOrgAccr=value;
}
@action setEditOrgPresident = (value) => {
  this.editOrgPresident=value;
}
@action setEditOrgCity = (value) => {
  this.editOrgCity=value;
}
@action setEditOrgProvince = (value) => {
  this.editOrgProvince=value;
}
@action setTotal = (value) => {
  this.total=value;
}
@action setPosition = (e) => {
  this.position=e.target.value;
}
@action setPosition2 = (value) => {
  this.position=value;
}
@action setArticleDisplay = (value) => {
  this.articledisplay=value;
}

@action setPresident = (e) => {
  this.president=e.target.value;
}
@action setProvince = (value) => {
  this.province=value;
}
@action setCity = (value) => {
  this.city=value;
}
@action setOrgName = (e) => {
  this.orgname=e.target.value;
}
@action setOrgAccronym = (e) => {
  this.orgaccronym=e.target.value;
}
@action setOrgName2 = (value) => {
  this.orgname=value;
}
@action setOrgAccronym2 = (value) => {
  this.orgaccronym=value;
}
@action setPresident2 = (value) => {
  this.president=value;
}
@action setOrgAccronym = (e) => {
  this.orgaccronym=e.target.value;
}
@action setUpdateNews = (value) => {
  this.isupdatenews=value;
}
@action setArticleId = (value) => {
  this.articleid=value;
}
@action setIsImage = (value) => {
  this.isimage=value;
}
@action setSearch = (e) => {
  this.search=e.target.value;
}

@action setFilter = (value) => {
  this.filter=value;
}
@action setDisplay = (value) => {
  this.display=value;
}
@action setPage = (page) => {
  this.currentpage=page;
}
@action setGovPage = (value) => {
  this.govpage=value;
}
@action setAddRecordModal = () => {
  this.addRecordModal=true;
}
@action setUpdateRecordModal = () => {
  this.updateRecordModal=true;
}
@action setViewRecordModal = () => {
  this.viewRecordModal=true;
}
@action setPassword = (e) => {
  this.password=e.target.value;
}
@action setEmail = (e) => {
  this.email=e.target.value;
}
@action setLastname = (e) => {
  this.lastname=e.target.value;
}
@action setMiddlename = (e) => {
  this.middlename=e.target.value;
}
@action setFirstname = (e) => {
  this.firstname=e.target.value;
}
@action setProfile = (value) => {
  this.profile=value;
}
@action setEmail2 = (value) => {
  this.email=value;
}
@action setMiddlename2 = (value) => {
  this.middlename=value;
}
@action setLastname2 = (value) => {
  this.lastname=value;
}
@action setFirstname2 = (value) => {
  this.firstname=value;
}
@action setIsLoading = (value) => {
  this.isloading=value;
}
@action setIsLoadData = (value) => {
  this.isloaddata=value;
}
@action setCancelModal = () => {
  this.updateRecordModal=false;
  this.viewRecordModal=false;
  this.addRecordModal=false;
}
@action setLogin = (value) => {
  this.login=value;
}
@action setUpdateRecordId = (value) => {
  this.updaterecordId=value;
}
@action setNewsStep = (value) => {
  this.newsstep=value;
}
@action setIsCreateNews = (value) => {
  this.iscreatenews=value;
}
@action setContent = (e,editor) =>{
  this.editor = editor.getData();
}
@action setTitle = (e) => {
  this.title=e.target.value;
}
@action setContent2 = (value) =>{
  this.editor = value;
}
@action setTitle2 = (value) => {
  this.title=value;
}
@action setBanner = (value) => {
  this.banner=value;
}
@action setUploadLoading = (value) => {
  this.uploadloading=value;
}
@action setImageURL = (value) => {
  this.imageurl=value;
}
// Computed
@computed get getLoadingLink(){
  return this.loadingLink;
}
@computed get getEditLink(){
  return this.editLink;
}
@computed get getLink(){
  return this.link;
}
@computed get getDescription(){
  return this.description;
}
@computed get getPlace(){
  return this.place;
}
@computed get getTime(){
  return this.times;
}
@computed get getEventDate(){
  return this.eventdate;
}
@computed get getMemberStatus(){
  return this.memberstatus;
}
@computed get getIsDeleting(){
  return this.isdeleting;
}
@computed get getEditInterest(){
  return this.editInterest;
}
@computed get getLoadingInterest(){
  return this.loadingInterest;
}
@computed get getInterest(){
  return this.interest;
}
@computed get getEditExpertise(){
  return this.editExpertise;
}
@computed get getLoadingExpertise(){
  return this.loadingExpertise;
}
@computed get getExpertise(){
  return this.expertise;
}
@computed get getLoadingMemberInfo(){
  return this.loadingMemberInfo;
}
@computed get getLoadRealty(){
  return this.loadingrealty;
}
@computed get getRealty(){
  return this.realty;
}
@computed get getEditRealty(){
  return this.editRealty;
}
@computed get getAddRealty(){
  return this.addRealty;
}
@computed get getEditFirstname(){
  return this.editMemberFirstname;
}
@computed get getEditMiddlename(){
  return this.editMemberMiddlename;
}
@computed get getEditLastname(){
  return this.editMemberLastname;
}
@computed get getOrgId(){
  return this.orgid;
}
@computed get getEditLogo(){
  return this.editLogo;
}
@computed get getEditNetwork(){
  return this.editNetwork;
}
@computed get getNetwork(){
  return this.network;
}
@computed get getEditOrgName(){
  return this.editOrgName;
}
@computed get getEditOrgAccr(){
  return this.editOrgAccr;
}
@computed get getEditOrgPresident(){
  return this.editOrgPresident;
}
@computed get getEditOrgCity(){
  return this.editOrgCity;
}
@computed get getEditOrgProvince(){
  return this.editOrgProvince;
}
@computed get getTotal(){
  return this.total;
}
@computed get getPosition(){
  return this.position;
}
@computed get getArticleDisplay(){
  return this.articledisplay;
}
@computed get getPresident(){
  return this.president;
}
@computed get getCity(){
  return this.city;
}
@computed get getProvince(){
  return this.province;
}
@computed get getOrgName(){
  return this.orgname;
}
@computed get getOrgAccronym(){
  return this.orgaccronym;
}
@computed get getUpdateNews(){
  return this.isupdatenews;
}
@computed get getArticleId(){
  return this.articleid;
}
@computed get getAddRecordModal(){
  return this.addRecordModal;
}
@computed get getUpdateRecordModal(){
  return this.updateRecordModal;
}
@computed get getViewRecordModal(){
  return this.viewRecordModal;
}
@computed get getPassword(){
  return this.password;
}
@computed get getEmail(){
  return this.email;
}
@computed get getLastname(){
  return this.lastname;
}
@computed get getMiddlename(){
  return this.middlename;
}
@computed get getFirstname(){
  return this.firstname;
}
@computed get getGovPage(){
  return this.govpage;
}
@computed get getIsLoading(){
  return this.isloading;
}
@computed get getIsLoadData(){
  return this.isloaddata;
}
@computed get getLogin(){
  return this.login;
}
@computed get getDisplay(){
  return this.display;
}
@computed get getPage(){
  return this.currentpage;
}
@computed get getFilter(){
  return this.filter;
}
@computed get getUpdateRecordId(){
  return this.updaterecordId;
}
@computed get getProfile(){
  return this.profile;
}
@computed get getNewsStep(){
  return this.newsstep;
}
@computed get getIsCreateNews(){
  return this.iscreatenews;
}
@computed get getContent(){
  return this.editor;
}
@computed get getTitle(){
  return this.title;
}
@computed get getBanner(){
  return this.banner;
}
@computed get getUploadLoading(){
  return this.uploadloading;
}
@computed get getImageURL(){
  return this.imageurl;
}
@computed get getIsImage(){
  return this.isimage;
}
@computed get getPort(){
  return this.port;
}



}
const store = new TodoStore();

export default store;