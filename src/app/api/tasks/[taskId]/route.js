import { Task } from "../../../../models/task";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
  const { taskId } = params;
  try{
    const task = await Task.findById(taskId);
    return NextResponse.json(task);

  }
  catch(error){
    return NextResponse.json({ message: "error retrieving task", status: false }, { status: 500 });
  }
}
export async function POST(request) {
  
}
export async function PUT(request,{params}) {
  const { taskId } = params;
  const { title, content,status } = await request.json();
  try {
    const task = await Task.findByIdAndUpdate(taskId, { title, content, status }, { new: true });
    
    return NextResponse.json({ message: "task updated", status: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "task not updated", status: false }, { status: 400 });
  }
  
}
export async function DELETE(request,{params}) {
  const { taskId } = params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    return NextResponse.json({ message: "task deleted", status: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "task not deleted", status: false }, { status: 400 });
  }
  
}
