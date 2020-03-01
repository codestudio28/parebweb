const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title:{ type:String},
    content:{type:String},
    banner:{type:String},
    userid:{type:String},
    datecreated:{type:String},
    status:{type:String},
},{
    timestamps:true,
});

    const News = mongoose.model('News', newsSchema);

    module.exports = News;