const esureAuthentication = require("../MiddleWares/Auth")
const router = require("express").Router()


router.get("/", esureAuthentication, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000,
        },
        {
            name: "tv",
            price: 39999,
        }
    ]
    )
})

module.exports = router;