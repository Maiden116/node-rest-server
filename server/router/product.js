const express = require('express')
const app = express()
const { getProduct, saveProduct, updateProduct, listProduct, deleteProduct } = require('./../controller/productController')
const { verifyToken, verifyRole } = require('../middlewares/auth')
const Product = require('../models/product');
//Get Product of GetProductList
app.get('/product', verifyToken, (req, res) => {
        if (req.query.id) {
            getProduct(req).then(results => {
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
            listProduct(req).then(results => {
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
    //Save Product
app.post('/product', [verifyToken, verifyRole], (req, res) => {
        saveProduct(req).then((result) => {
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
    //Update Product
app.put('/product/:id', [verifyToken, verifyRole], (req, res) => {
        updateProduct(req).then(result => {

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
    //Delete Product
app.delete('/product/:id', [verifyToken, verifyRole], (req, res) => {
    deleteProduct(req).then((result) => {

        res.status(200).json({
            code: 200,
            message: `Product Deleted`,
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

app.get('/product/search/:field', verifyToken, (req, res) => {

    let field = req.params.field

    let regex = new RegExp(field, 'i')
    Product.find({ name: regex })
        .populate('user', 'name email')
        .populate('category', 'name img').exec((err, products) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    err

                })
            }

            res.json({
                products
            })
        })
})

module.exports = app

// SECRET
// iiHqx55XBQlK6l2HaqRhi6t1