const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expertiseSchema = new Schema({
    userid:{type:String},
    expertise:{type:String},
},{
    timestamps:true,
});

    const Expertise = mongoose.model('Expertise', expertiseSchema);

    module.exports = Expertise;