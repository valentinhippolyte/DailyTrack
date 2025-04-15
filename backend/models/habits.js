import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  daysDone: {
    type: [
      {
        date: {
          type: String,
          required: true,
        },
        isDone: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
