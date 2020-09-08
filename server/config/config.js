//====================
//PORT
//====================
process.env.PORT = process.env.PORT || 3000
    //====================
    //Env
    //====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log(process.env.MONGO_URI);
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb+srv://maiden116:vYKZHnMA8GssNVfE@cluster0.cfizo.mongodb.net/cafe?retryWrites=true&w=majority";
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;