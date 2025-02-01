const {Router} = require('express')
const router = Router()

router.get("/test", (req, res) => {
    res.send("Hello form backend api!!!")
})

module.exports.testRoute = router