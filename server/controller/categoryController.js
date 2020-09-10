const Category = require('../models/category');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { isNumber } = require('underscore');


saveCategory = async(req) => {
    try {
        let body = req.body;
        let category = new Category({
            name: body.name,
            img: body.img,
            user: req.user._id
        })
        return await category.save(category);
    } catch (error) {
        throw new Error(error)
    }
}

updateCategory = async(req) => {
    try {
        let id = req.params.id;
        let categoryDescription = {
            name: req.body.name,
            img: req.body.img
        }
        return await Category.findByIdAndUpdate(id, categoryDescription, { new: true, runValidators: true, context: 'query' }).exec();
    } catch (error) {
        throw new Error(error)
    }
}

listCategory = async(req, res) => {
    try {
        let limit = Number(req.query.limit) || 10
        let offset = Number(req.query.offset) || 0
        let categoryList = await Category.find({})
            //COLLECTION NAME
            .populate('user', 'name email')
            .sort('name');
        let count = await Category.countDocuments()
        return {
            results: categoryList,
        }

    } catch (error) {
        throw new Error(error)
    }
}

deleteCategory = async(req) => {
    try {
        let id = req.params.id;
        let category = await Category.findByIdAndRemove(id).exec();
        if (!category) {
            throw new Error(`Category Not Found`)
        }
    } catch (error) {
        throw new Error(error)
    };
}

getCategory = async(req) => {
    try {
        let paramid = req.query.id;

        let category = await Category.findById(paramid).exec();
        return category
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    saveCategory,
    updateCategory,
    listCategory,
    deleteCategory,
    getCategory
}