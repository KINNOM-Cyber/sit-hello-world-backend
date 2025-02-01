const { Router } = require("express");
const router = Router();

// Import all route file here
const { testRoute } = require("./test-route");

// assign a route to express router
router.use(testRoute);
// router.use(<imported path route>)

// export router index file
module.exports = router;
