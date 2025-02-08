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
// bookingRouter.get("/detail/:bookingId", async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;
//     const detial = await booking.getById(bookingId)

//     return res.status(200).json({
//       data: { ...detial.data },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message ?? "Unknow error",
//     });
//   }
// });

// bookingRouter.get("/detail/:bookingId", async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;
    
//     const detail = await booking.getById(bookingId);

//     if (!detail) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     return res.status(200).json({
//       data: { ...detail.data },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message ?? "Unknown error",
//     });
//   }
// });

// bookingRouter.get("/detail/:bookingId", async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;
//     console.log("Booking ID received:", bookingId); // ✅ Debugging

//     if (!bookingId || isNaN(bookingId)) {
//       return res.status(400).json({ message: "Invalid Booking ID" });
//     }

//     const detail = await booking.getById(bookingId);

//     if (!detail) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     return res.status(200).json({
//       data: detail,
//     });
//   } catch (error) {
//     console.log("Error fetching booking:", error);
//     return res.status(400).json({
//       message: error.message ?? "Unknown error",
//     });
//   }
// });

bookingRouter.get("/detail/:bookingId", async (req, res) => {
  try {
    const bookingId = parseInt(req.params.bookingId, 10); // 🔹 Convert to integer
    console.log("Booking ID received:", bookingId); // ✅ Debugging

    if (isNaN(bookingId)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }

    const detail = await booking.getById(bookingId);
    console.log("Detail found:", detail); // ✅ Debugging

    if (!detail) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ data: detail });
  } catch (error) {
    console.log("Error fetching booking:", error);
    return res.status(400).json({
      message: error.message ?? "Unknown error",
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
bookingRouter.put("/edit/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const data = req.body;
  try {
    await booking.edit(bookingId,data);
    return res.status(200).json({
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
    return res.status(200).json({
      message: "Delete Successful"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
})




export default bookingRouter;