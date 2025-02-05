import { Router } from "express";
const userRouter = Router();
import * as user from "../models/userModel.js";

userRouter.get("/", async (req, res) => {
  try {
    const data = await user.getAll();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await user.getById(userId);
    if (!data || !Object.entries(data).length) {
      throw new Error("User not found")
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({
      message: error.message ?? "Unknow error",
    });
  }
});

export default userRouter;
