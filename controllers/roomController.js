import { Router } from "express";
const roomRouter = Router();

import * as room from"../models/roomModel.js"

roomRouter.get("/", async (req, res) => {
  try {
    const data = await room.getAll();
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

roomRouter.get("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    const data = await room.getById(roomId);
    if (!data || !Object.entries(data).length) {
      throw new Error("Room is not found")
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

export default roomRouter;
