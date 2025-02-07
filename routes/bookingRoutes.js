import { Router } from "express";
const bookingRouter = Router();
import * as booking from "../models/bookingModel.js";


bookingRouter.get("/find", async (req, res) => {
  try {
    const payload = req.query
    const result = await booking.find(payload)

    console.log()

    return res.status(200).json({
      response: result,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

bookingRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body
    const result = await booking.create(payload)

    console.log()

    return res.status(200).json({
      response: {...result},
      ...payload
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

/**
 * Get booking detail
 */
bookingRouter.get("/detail/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const detial = await booking.getById(bookingId);

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
bookingRouter.post("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const payload = req.body;
  try {
    const latestBooking = await booking.findOne({
      where: { BookingId: bookingId },
      include: [{ model: Room }, { model: User }]
    });

    return res.status(200).json({
      success: true,
      data: latestBooking, 
      message: "Create Successful"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknown error",
    });
  }
});

/**
 * Edit booking detail
 */
bookingRouter.patch("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const data = req.body;
  try {
    await booking.edit(bookingId,data);
    return res.status(200).end({
      message: "Update Successful"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

/**
 * Cancel booking
 */

bookingRouter.delete("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  try {
    await booking.cancel(bookingId);
    return res.status(200).end({
      message: "Delete Successful"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})

export default bookingRouter;