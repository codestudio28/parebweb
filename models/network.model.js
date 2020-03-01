const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const networkSchema = new Schema({
    userid:{ type:String},
    network:{type:String},
},{
    timestamps:true,
});

    const Network = mongoose.model('Network', networkSchema);

    module.exports = Network;