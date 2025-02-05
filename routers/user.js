const { Router } = require("express");
const router = Router();
const user = require("../services/user");

router.get("/", async (req, res) => {
  try {
    const data = await user.getAll();
    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

module.exports.userRoute = router;
