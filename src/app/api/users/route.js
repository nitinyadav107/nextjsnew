import { User } from "../../../models/user.js";
import connectDb from "../../../helper/db.js";
import { NextResponse } from "next/server";


connectDb();


export function GET(request) {
  const users = [{
    name: "hitesh",
    phone: "1234567890",
    course: "MERN"
  },
  {
    name: "vicky",
    phone: "1234567890",
    course: "MERN"
  }
    ,
  {
    name: "somu",
    phone: "1234567890",
    course: "MERN"
  }
  ];
  return NextResponse.json(users);
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
  
export function DELETE(request) {
  console.log("deleted");
  return NextResponse.json({ message: "deleted", status: true }, { status: 200, statusText: "deleted" })

}
export function PUT() {

}