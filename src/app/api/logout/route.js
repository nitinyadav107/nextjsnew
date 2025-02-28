import { NextResponse } from "next/server";


export async function POST(request) {
  const response = NextResponse.json(
    { message: "User logged out", success: true },
    { status: 201 }
  );

  response.cookies.set("token", "", {
    expires: new Date(0), 
    
    httpOnly: true, 
  });
  

  return response;
}
