const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    usertype:{ type:String},
    email:{type:String},
    password:{type:String},
    profile:{type:String},
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    datecreated:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Account = mongoose.model('Account', accountSchema);

    module.exports = Account;