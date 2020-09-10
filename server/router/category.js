const express = require('express')
const app = express()
const { save, updateUser, getUserList, deleteUser, getCategory, listCategoryList, saveCategory, updateCategory, deleteCategory } = require('./../controller/categoryController')
const { verifyToken, verifyRole } = require('../middlewares/auth')
    //Get Category of GetCategoryList
app.get('/category', verifyToken, (req, res) => {
        if (req.query.id) {
            getCategory(req).then(results => {
                return res.json({
                    code: 200,
                    results
                });
            }).catch(err => {
                return res.status(400).json({
                    code: 400,
                    err: `${err}`,
                    stack: `${err.stack.split('\n')}`
                })
            })
        } else {
            listCategory(req).then(results => {
                return res.json({
                    code: 200,
                    results
                });
            }).catch(err => {
                return res.status(400).json({
                    code: 400,
                    err: `${err}`,
                    stack: `${err.stack.split('\n')}`
                })
            })
        }
    })
    //Save Category
app.post('/category', [verifyToken, verifyRole], (req, res) => {
        saveCategory(req).then((result) => {
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
    //Update Category
app.put('/category/:id', [verifyToken, verifyRole], (req, res) => {
        updateCategory(req).then(result => {

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
    //Delete Category
app.delete('/category/:id', [verifyToken, verifyRole], (req, res) => {
    deleteCategory(req).then((result) => {

        res.status(200).json({
            code: 200,
            message: `Category Deleted`,
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