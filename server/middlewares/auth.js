const jwt = require('jsonwebtoken');

//AUTH METHOD//
//VERIFY TOKEN//
let verifyToken = (req, res, next) => {
    let token = req.get('X-Token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                code: 401,
                err
            })
        }
        req.user = decoded.user;
        next();
    });
};
//VALIDATE ROLE
let verifyRole = (req, res, next) => {
    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            code: 401,
            err: {
                message: `User is not Admin`
            }
        })
    }
    next();
};

module.exports = {
    verifyToken,
    verifyRole
}