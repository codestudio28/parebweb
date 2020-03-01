const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interestSchema = new Schema({
    userid:{type:String},
    interest:{type:String},
},{
    timestamps:true,
});

    const Interest = mongoose.model('Interest', interestSchema);

    module.exports = Interest;