import express from "express";
import {
  addHabit,
  changeIsDone,
  getAllHabitsByUser,
  removeHabit,
} from "../controllers/habit.js";
const router = express.Router();

router.get("/user/:userId", getAllHabitsByUser);
router.post("/", addHabit);
router.delete("/:id", removeHabit);
router.put("/:id", changeIsDone);

export default router;
