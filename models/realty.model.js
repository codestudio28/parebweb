const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const realtySchema = new Schema({
    userid:{type:String},
    realty:{type:String},
},{
    timestamps:true,
});

    const Realty = mongoose.model('Realty', realtySchema);

    module.exports = Realty;