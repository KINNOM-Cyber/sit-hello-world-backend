const { Router } = require("express");
const router = Router();

// Import all route file here
const { testRoute } = require("./test-route");
const { bookingRoute } = require("./booking");

const middleware = require("./middleware")

// assign a route to express router
router.use(testRoute);
router.use("/booking", bookingRoute);
// router.use(<imported path route>)

// export router index file
module.exports = router;
