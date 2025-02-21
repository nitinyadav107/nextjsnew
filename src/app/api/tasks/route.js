import { Task } from "../../../models/task";
import connectDb from "../../../helper/db.js";
import { NextResponse } from "next/server";
connectDb();
export async function GET(request) {
  try {
    const tasks = await Task.find();

    return NextResponse.json({ message: "tasks retrieved", status: true, tasks }, { status: 200 });

  }
   catch (error) {
    return NextResponse.json({ message: "error retrieving tasks", status: false }, { status: 500 });
  }
}

export async function POST(request) {
  const { title, content, userId } = await request.json();
  try {
    const task = new Task({ title, content, userId });
    const createdTask = await task.save();
    return NextResponse.json({ message: "task created", status: true, task: createdTask }, { status: 201 });

  }
   catch (error) {
    return NextResponse.json({ message: "task not created", status: false }, { status: 400 });
  }
}
