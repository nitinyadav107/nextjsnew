import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "completed", "just created"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
