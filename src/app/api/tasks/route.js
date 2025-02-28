
import { Task } from "../../../models/task";
import connectDb from "../../../helper/db.js";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
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
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract form fields
    const image = formData.get('image');
    const title = formData.get('title');
    const content = formData.get('content');
    const userId = formData.get('userId');

    // Validate required fields
    if (!image || !title || !content || !userId) {
      return NextResponse.json(
        { message: "All fields are required", status: false },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataURI = `data:${image.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(dataURI, {
      folder: "task_images",
    });

    // Create new task with image URL
    const newTask = new Task({
      title,
      content,
      userId,
      image: cloudinaryResult.secure_url,
    });

    // Save to database
    const savedTask = await newTask.save();

    return NextResponse.json(
      { message: "Task created", status: true, task: savedTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Error creating task", status: false },
      { status: 500 }
    );
  }
}