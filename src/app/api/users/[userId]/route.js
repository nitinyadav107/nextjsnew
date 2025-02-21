import { NextResponse } from 'next/server';
import { User } from '../../../../models/user.js';


export async function DELETE(request, { params }) {
  const { userId } = params;
  try {
    await User.deleteOne({ _id: userId });
    return NextResponse.json({ message: 'User deleted successfully' });
  }
  catch (error) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}
export async function GET(request, { params }) {
  const { userId } = params;
  try {
    const user = await User.findById(userId);
    return NextResponse.json(user);
  }
  catch (error) {
    return NextResponse.json({ message: 'Error getting user' }, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  const { userId } = params;
  const { name,password,about,profileURL } = await request.json();
  try {
    const user = await User.findById(userId);
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;
    const updatedUser = await user.save();
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  }
  catch (error) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
    
}
