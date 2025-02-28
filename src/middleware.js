import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware executed");
  
  const token = request.cookies.get("token")?.value;
  console.log("Token:", token);

  const { pathname } = request.nextUrl;

  
  if (token && ( pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  if (!token && pathname === "/add-task") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
  if (!token && pathname === "/show-task") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/add-task", "/signup", "/show-task"],
};
