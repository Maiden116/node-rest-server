const express = require('express');

const fs = require('fs');
const path = require('path')
const { verifyTokenImage } = require('../middlewares/auth')

let app = express();

app.get('/image/:type/:img', verifyTokenImage, (req, res) => {
    try {
        let type = req.params.type;
        let img = req.params.img;

        let pathImg = path.resolve(__dirname, `../../uploads/${type}/${img}`);
        let pathNoImage = path.resolve(__dirname, '../assets/notfound.png');

        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
        return res.sendFile(pathNoImage)
    } catch (error) {
        throw new Error(error)
    }


})

module.exports = app