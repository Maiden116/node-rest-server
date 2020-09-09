const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { saveUser, updateUser, getUserList, deleteUser, User } = require('./../controller/userController')

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                code: 500,
                err
            })
        }

        if (!user) {
            return res.status(400).json({
                code: 400,
                err: {
                    message: `User and Password dont Match`
                }
            })
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                code: 400,
                err: {
                    message: `User and Password dont Match`
                }
            })
        }
        let token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.EXPIRED_TIME });
        res.status(200).json({
            ok: true,
            user: user,
            token
        })

    })
})

module.exports = app;