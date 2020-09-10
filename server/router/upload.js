const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path')
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const { verifyToken, verifyRole } = require('../middlewares/auth')

const app = express();

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:type/:id', verifyToken, function(req, res) {

    let type = req.params.type;
    let id = req.params.id;


    //let Valid types 
    let validTypes = ['product', 'category', 'user']
    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            code: 400,
            err: `Type not allowed. Types allowed are ${validTypes.join(", ")}`
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            code: 400,
            message: `No file to upload`
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let data = req.files.data;
    let fileSplited = data.name.split('.');
    let fileExtension = fileSplited[fileSplited.length - 1];

    //Extensiones permitidas
    let extension = ['png', 'jpg', 'gif', 'jpeg'];

    if (extension.indexOf(fileExtension) < 0) {
        return res.status(400).json({
            code: 400,
            err: `File extension not allowed. File Extension allowed are ${extension.join(", ")}`
        });
    }

    let nameImg = `${id}-${new Date().getMilliseconds()}.${fileExtension}`

    // Use the mv() method to place the file somewhere on your server
    data.mv(`uploads/${type}/${nameImg}`, (err) => {
        if (err)
            return res.status(500).json({
                code: 500,
                err
            });
        switch (type) {
            case `user`:
                {
                    saveImageType(id, res, nameImg, User, type);
                    break;
                }
            case `product`:
                {
                    saveImageType(id, res, nameImg, Product, type);
                    break;
                }
            case `category`:
                {
                    saveImageType(id, res, nameImg, Category, type);
                }
        }
    });
});




function saveImageType(id, res, fileName, ObjectType, type) {
    ObjectType.findById(id, (err, objectDB) => {
        if (err) {
            delteFile(fileName, type);
            return res.status(400).json({
                code: 400,
                err
            });
        }
        if (!objectDB) {
            delteFile(fileName, type);
            return res.status(400).json({
                code: 400,
                message: `${type} Not Found`
            });
        }

        delteFile(objectDB.img, type);

        objectDB.img = fileName;

        objectDB.save((err, savedUser) => {
            if (err) {
                delteFile(fileName, type);
                return res.status(400).json({
                    code: 400,
                    err
                });
            }

            return res.json({
                code: 200,
                user: savedUser
            })
        })

    })
}

function delteFile(fileName, type) {
    let pathImage = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = app;