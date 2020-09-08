const express = require('express')
const app = express()
const { saveUser, updateUser, getUserList, deleteUser } = require('./../controller/userController')

app.get('/user', (req, res) => {
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

app.post('/user', (req, res) => {
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

app.put('/user/:id', (req, res) => {
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

app.delete('/user/:id', (req, res) => {
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