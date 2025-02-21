import { NextResponse} from "next/server";

export function GET(request, { params }) {
  const { userId, postId } = params;
  console.log(userId, postId);
  return NextResponse.json({ userId, postId });
}