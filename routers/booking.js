const { Router } = require("express");
const router = Router();
const db = require("../db");

router.get("/detail/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = db.booking;
    const detial = await booking.get(bookingId);

    return res.status(200).json({
      data: { ...detial.data },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const booking = db.booking;
    const payload = req.body;

    await booking.create({ ...payload });

    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

module.exports.bookingRoute = router;
