const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
const valid_roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role',
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is necessary'],
    },
    email: {
        type: String,
        required: [true, 'Email is necessary'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is necessary']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: valid_roles,
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
}, {
    //COLLECTION NAME
    collection: 'user',
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} have to be unique'
})



module.exports = mongoose.model('User', userSchema);