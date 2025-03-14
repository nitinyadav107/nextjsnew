import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  image: {
    type:String,
    required: true,
  },
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
    default: "pending",
    enum: ["pending", "completed", "just created"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
