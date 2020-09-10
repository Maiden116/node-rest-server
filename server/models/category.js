const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('../models/user');

let Schema = mongoose.Schema;
let categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is necessary'],
        unique: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        //SCHEMA NAME
        ref: 'User'
    }
}, {
    collection: 'categories'
});

categorySchema.plugin(uniqueValidator, {
    message: '{PATH} have to be unique'
})



module.exports = mongoose.model('Category', categorySchema);