const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const officerSchema = new Schema({
    lastname:{type:String},
    firstname:{type:String},
    middlename:{type:String},
    position:{type:String},
    orgid:{type:String},
  
},{
    timestamps:true,
});

    const Officer = mongoose.model('Officer', officerSchema);

    module.exports = Officer;