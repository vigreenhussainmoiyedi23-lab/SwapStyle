const jwt = require("jsonwebtoken")

function signToken(id, expiresIn = "1h") {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn })
    return token
}
function getDataFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return null
        return decoded
    } catch (error) {
        return null
    }
}
function setCookie(res, name, value, options) {
    options = {
        httpOnly: true,
        secure: !process.env.NODE_ENV === "development",
        samesite: process.env.NODE_ENV === "development" ? "lax" : "strict",
        ...options
    }
    res.cookie(name, value, options)
}
module.exports = { signToken, getDataFromToken, setCookie }