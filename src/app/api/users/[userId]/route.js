import {NextResponse} from 'next/server'

export  function DELETE(request,{params}) {
  console.log('params',params);
  const {userId}=params
  console.log(userId);
  return NextResponse.json({message: 'User deleted'})
}
