const Product = require('../models/product');
const bcrypt = require('bcrypt');
const _ = require('underscore');


saveProduct = async(req) => {
    try {
        let product = new Product({
            name: req.body.name,
            unitPrice: req.body.unitPrice,
            description: req.body.description,
            availble: req.body.avaible,
            category: req.body.category,
            user: req.user._id
        })
        return await product.save(product);
    } catch (error) {
        throw new Error(error)
    }
}

updateProduct = async(req) => {
    try {
        let id = req.params.id;
        let productyDescription = {
            name: req.body.name,
            unitPrice: req.body.unitPrice,
            description: req.body.description,
            availble: req.body.avaible,
            category: req.body.category,
        }
        return await Product.findByIdAndUpdate(id, productyDescription, { new: true, runValidators: true, context: 'query' }).exec();
    } catch (error) {
        throw new Error(error)
    }
}

listProduct = async(req, res) => {
    try {
        let limit = Number(req.query.limit) || 10
        let offset = Number(req.query.offset) || 0
        let productList = await Product.find({ availble: true })
            .populate('user', 'name email')
            .populate('category', 'name img')
            .limit(limit)
            .skip(offset)
            .sort('name');
        let count = await Product.countDocuments()
        return {
            pagging: {
                limit,
                offset,
                total: count,
            },
            results: productList,
        }

    } catch (error) {
        throw new Error(error)
    }
}

physicalDeleteProduct = async(req) => {
    try {
        let id = req.params.id;
        let product = await Product.findByIdAndRemove(id).exec();
        if (!product) {
            throw new Error(`Category Not Found`)
        }
    } catch (error) {
        throw new Error(error)
    };
}

deleteProduct = async(req) => {
    try {
        let id = req.params.id;
        const deletedStatus = { avaible: false }
        deletedProduct = await Product.findByIdAndUpdate(id, deletedStatus, { new: true, context: 'query' }).exec();
        if (!deletedProduct) {
            throw new Error(`User not found`)
        }
        return deletedProduct
    } catch (error) {
        throw new Error(error)
    }
}

getProduct = async(req) => {
    try {
        let paramid = req.query.id;

        let product = await Product.findById(paramid)
            .populate('user', 'name email')
            .populate('category', 'name img')
            .exec();
        return product
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    saveProduct,
    updateProduct,
    getProduct,
    listProduct,
    deleteProduct
}