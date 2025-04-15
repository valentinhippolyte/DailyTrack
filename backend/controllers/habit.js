import mongoose from "mongoose";
import Habit from "../models/habits.js";

export const getAllHabitsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Vérification du format de l'ID
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    console.log("🔹 UserID reçu (string):", userId);
    console.log("🔹 ObjectID converti:", objectId);

    // Exécuter la requête
    const habits = await Habit.find({ userId: objectId }).lean();

    res.status(200).json(habits);
  } catch (error) {
    console.error("❌ Error fetching habits:", error);
    res.status(500).json({ message: "Failed to fetch habits" });
  }
};

export const removeHabit = async (req, res) => {
  const habitId = req.params.id;
  try {
    await Habit.findByIdAndDelete(habitId);
    res.status(200).json({ message: "Habit removed" });
  } catch (error) {
    res.status(500);
    console.error("Error when removing habit:", error);
  }
};
export const addHabit = (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  const habit = new Habit({
    name: req.body.name,
    daysDone: [
      {
        date: today, // La date d'aujourd'hui
        isDone: false, // Initialement, l'habitude n'est pas réalisée
      },
    ],
    userId: req.body.userId,
  });

  habit
    .save()
    .then(() => {
      res.status(201).json("habit created!");
    })
    .catch((e) => {
      res.status(500).json(`Failed to create habit: ${e}`);
    });
};

export const changeIsDone = async (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  const habitId = req.params.id;

  try {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const day = habit.daysDone.find((item) => item.date === today);

    if (day) {
      day.isDone = !day.isDone;
    } else {
      habit.daysDone.push({
        date: today,
        isDone: false,
      });
    }

    await habit.save();

    res.status(200).json({ message: "isDone of habit changed!" });
  } catch (error) {
    res.status(500).json({ message: "Error when changing isDone", error });
    console.error("Error when changing isDone:", error);
  }
};
