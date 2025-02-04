const { Router } = require("express");
const router = Router();

router.use((req, res, next) => {
  const token = req.headers.authorization.split("")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  return next();
});

module.exports = router;
