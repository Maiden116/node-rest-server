require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');


"mongodb+srv://maiden116:<password>@cluster0.cfizo.mongodb.net/test"

const app = express()
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
    //User Routes//
app.use(require('./router'));;
//Enable folder public
app.use(express.static(path.resolve(__dirname, '../public')));

connectToDb = async() => {
    try {
        let connection = await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        return connection;
    } catch (err) {
        return err;
    }
}

let connection = connectToDb();


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})