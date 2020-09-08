//====================
//PORT
//====================
process.env.PORT = process.env.PORT || 3000
    //====================
    //Env
    //====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = "mongodb+srv://maiden116:vYKZHnMA8GssNVfE@cluster0.cfizo.mongodb.net/cafe?retryWrites=true&w=majority";
}
process.env.URLDB = urlDB;