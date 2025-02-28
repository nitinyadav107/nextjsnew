import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" ,success:false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    return NextResponse.json({ message: "Success", user: decoded ,success:true}, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" ,success:false}, { status: 401, statusText: "Unauthorized" });
  }
}
