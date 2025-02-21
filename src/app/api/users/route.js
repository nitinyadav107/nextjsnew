import { User } from "../../../models/user.js";
import connectDb from "../../../helper/db.js";
import { NextResponse } from "next/server";


connectDb();


export async function GET(request) {
  let users = [];

  try {
    users = await User.find().select("-password");
    return NextResponse.json({ message: "users found", status: true, users }, { status: 200, statusText: "ok" });
  } catch (error) {
    return NextResponse.json({ message: "user not found", status: false }, { status: 400, statusText: "bad request" });
  }

 
}


export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();

  try {
    const user = await new User({ name, email, password, about, profileURL }).save();
  
   

    return NextResponse.json({ message: "user created", status: true, user }, { status: 201, statusText: "created" });

  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "user not created", status: false }, { status: 400, statusText: "bad request" });
  }
}
  
export function PUT() {

}