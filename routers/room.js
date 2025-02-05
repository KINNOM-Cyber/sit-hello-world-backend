const { Router } = require("express");
const router = Router();

const room = require("../services/room")

router.get("/", async (req, res) => {
  try {
    const data = await room.getAll();
    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    const data = await room.getById(roomId);
    if (!data || !Object.entries(data).length) {
      throw new Error("Room is not found")
    }
    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});


module.exports.roomRoute = router;
