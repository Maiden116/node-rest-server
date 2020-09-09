const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { saveUser, updateUser, getUserList, deleteUser, User } = require('./../controller/userController')

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
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

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}

//GOOGLE CONFIGURATION

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token).catch(err => {
        return res.status(403).json({
            code: 403,
            err
        })
    })

    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                err,
            })
        }

        if (userDB) {
            if (userDB.google == false) {
                return res.status(400).json({
                    code: 400,
                    err: {
                        message: 'You have to use your NON Google Credentials'
                    }
                })
            } else {
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRED_TIME });

                return res.json({
                    code: 200,
                    user: userDB,
                    token,
                })
            }
        } else {
            let newUser = new User();
            newUser.name = googleUser.name;
            newUser.img = googleUser.picture;
            newUser.email = googleUser.email;
            newUser.google = true;
            newUser.password = '._.'

            newUser.save((err, newUserSaved) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        err
                    })
                }
                let token = jwt.sign({
                    newUser
                }, process.env.SEED, { expiresIn: process.env.EXPIRED_TIME });

                return res.json({
                    code: 200,
                    user: newUserSaved,
                    token,
                })
            })
        }
    })
})

module.exports = app;