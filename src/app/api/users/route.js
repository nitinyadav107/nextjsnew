import { User } from "../../../models/user.js";
import connectDb from "../../../helper/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const HashedPassword = bcrypt.hashSync(password, 10);




  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
      if (isPasswordValid) {

        const token = jwt.sign({
          email, id: existingUser._id, name: existingUser.name
        },
          process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "user Logged in successfully", status: true, user: existingUser }, { status: 200, statusText: "success" });
        response.cookies.set("token", token, { httpOnly: true, secure: true });

        return response;
      }
      else {
        return NextResponse.json({ message: "Incorrect Password", status: false }, { status: 400, statusText: "bad request" });
      }

    }
    else {
      const user = await new User({
        name,
        email,
        password: HashedPassword,
        about,
        profileURL
      }).save();

      return NextResponse.json({ message: "user created", status: true, user }, { status: 201, statusText: "created" });
    }

  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "user not created", status: false }, { status: 400, statusText: "bad request" });
  }
}

export function PUT() {

}