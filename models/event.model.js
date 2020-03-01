const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title:{ type:String},
    dates:{type:String},
    description:{type:String},
    content:{type:String},
    banner:{type:String},
    times:{type:String},
    place:{type:String},
    userid:{type:String},
    datecreated:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const Event = mongoose.model('Event', eventSchema);

    module.exports = Event;