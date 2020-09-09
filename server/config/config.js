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
    urlDB = process.env.MONGO_URI;
}
//Expire Token//
process.env.EXPIRED_TIME = 60 * 60 * 24 * 30;
//Seed//
process.env.SEED = process.env.SEED || 'este/es/el/site/desarrollo';
//Database URl
process.env.URLDB = urlDB;
//////GLOGLE CLIENT ID
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '550531852393-nfp9v02eo4dbodegsedp6jikvjeim17v.apps.googleusercontent.com';