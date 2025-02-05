import { Router } from "express";
const bookingRouter = Router();
import * as booking from "../models/bookingModel.js";

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
    const edit = await booking.create(bookingId,payload);
    return res.status(200).end({
      success: true,
      data: edit,
      message: "Create Successful"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
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