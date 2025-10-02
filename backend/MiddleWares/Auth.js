const jwt = require("jsonwebtoken")

const esureAuthentication = (req, res, next) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        return res.status(403)
            .json({ message: "Unauthorized, JWT token is require" })
    }
    try {
        const decode = jwt.verify(auth, process.env.JWT_SECRATE)
        next()
    } catch (error) {
        return res.status(403)
            .json({ message: "Unauthorized,JWT wrong or expired" })
    }
}

module.exports = esureAuthentication