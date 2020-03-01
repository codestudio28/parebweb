const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orgSchema = new Schema({
    userid:{type:String},
    email:{type:String},
    logo:{type:String},
    president:{type:String},
    orgaccr:{type:String},
    orgname:{type:String},
    city:{type:String},
    province:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Organization = mongoose.model('Organization', orgSchema);

    module.exports = Organization;