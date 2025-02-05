const { Router } = require("express");
const router = Router();

// Import all route file here
const { bookingRoute } = require("./booking");
const { userRoute } = require("./user");

const middleware = require("./middleware");

// assign a route to express router
router.use("/booking", bookingRoute);
router.use("/user", userRoute);
// router.use(<imported path route>)

// export router index file
module.exports = router;
