const { Router } = require("express");
const router = Router();
const booking = require("../services/booking");

/**
 * Get booking detail
 */
router.get("/detail/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
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

/**
 *  Create new booking
 */
router.post("/", async (req, res) => {
  try {
    const payload = req.body;

    await booking.create({ ...payload });

    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

/**
 * Edit booking detail
 */
router.patch("/", async (req, res) => {
  try {
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

/**
 * Cancel booking
 */

router.delete("/", async (req, res) => {
  try {
    return res.status(200).end();
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

module.exports.bookingRoute = router;
