const express = require('express')
const app = express()
const { saveUser, updateUser, getUserList, deleteUser } = require('./../controller/userController')
const { verifyToken, verifyRole } = require('../middlewares/auth')

app.get('/user', verifyToken, (req, res) => {

    getUserList(req).then(results => {
        res.json({
            code: 200,
            results
        });
    }).catch(err => {
        res.status(400).json({
            code: 400,
            err: `${err}`,
            stack: `${err.stack.split('\n')}`
        })
    })
})

app.post('/user', [verifyToken, verifyRole], (req, res) => {
    saveUser(req).then((result) => {
        res.status(201).send({
            user: result
        });
    }).catch((err) => {
        res.status(400).json({
            code: 400,
            err: `${err}`,
            stack: `${err.stack.split('\n')}`
        })
    });
})

app.put('/user/:id', [verifyToken, verifyRole], (req, res) => {
    updateUser(req).then(result => {
        res.status(200).send({
            user: result
        });
    }).catch(err => {
        res.status(400).json({
            code: 400,
            err: `${err}`,
            stack: `${err.stack.split('\n')}`
        })
    })
})

app.delete('/user/:id', [verifyToken, verifyRole], (req, res) => {
    deleteUser(req).then((result) => {

        res.status(200).json({
            code: 200,
            message: `User Deleted`,
            user: result
        });

    }).catch((err) => {
        res.status(400).json({
            code: 400,
            err: `${err}`,
            stack: `${err.stack.split('\n')}`
        })
    });
})

module.exports = app

// SECRET
// iiHqx55XBQlK6l2HaqRhi6t1