const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { off } = require('../router/user');


saveUser = async(req) => {
    try {
        let body = req.body;
        let user = new User({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        })
        return await user.save(user);
    } catch (error) {
        throw new Error(error)
    }
}

updateUser = async(req) => {
    try {
        let id = req.params.id;
        let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
        return await User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }).exec();

    } catch (error) {
        throw new Error(error)
    }
}

getUserList = async(req) => {
    try {
        let limit = Number(req.query.limit) || 10
        let offset = Number(req.query.offset) || 0
        let userList = await User.find({ status: true })
            .limit(limit)
            .skip(offset)
            .exec();
        let count = await User.countDocuments({ status: true })
        return {
            paging: {
                total: count,
                offset,
                limit,
            },
            results: userList,
        }
    } catch (error) {
        throw new Error(error)
    }
}
deleteUser = async(req) => {
    try {
        let id = req.params.id;
        const deletedStatus = { status: false }
        deletedUser = await User.findByIdAndUpdate(id, deletedStatus, { new: true, context: 'query' }).exec();
        if (!deletedUser) {
            throw new Error(`User not found`)
        }
        return deletedUser
    } catch (error) {
        throw new Error(error)
    }
}

physicalDeleteUser = async(req) => {
    try {
        let id = req.params.id;
        let userDeleted = await User.findByIdAndRemove(id).exec();
        if (!userDeleted) {
            throw new Error(`User Not Found`)
        }
    } catch (error) {
        throw new Error(error)
    };
}

module.exports = {
    saveUser,
    updateUser,
    getUserList,
    deleteUser
}