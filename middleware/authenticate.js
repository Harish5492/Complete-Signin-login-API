
const jwt = require('jsonwebtoken')

require('dotenv').config()

const key = process.env.JWTKEY;

// console.log("test",test)

module.exports = function (req, res, next) {
    try{
    const authHeader = req.headers['x-api-authorization'] 
    if (!authHeader) throw'authorization missing'
    console.log("authHeader", authHeader)
    jwt.verify(authHeader, key)
    const decodedToken = jwt.decode(authHeader, key)
    req.body = decodedToken
    next()
    }
    catch(err) {
        return res.send("error : " + err)
    }
}
