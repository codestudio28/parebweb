const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    userid:{type:String},
    link:{type:String},
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    orgid:{type:String},
    status:{type:String},
  
},{
    timestamps:true,
});

    const Member = mongoose.model('Member', memberSchema);

    module.exports = Member;