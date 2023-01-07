import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='flex justify-between bg-black  text-white p-4 font-bold '>
        <h3 className=' text-2xl  hover:text-blue-700'> Tumina wari shashi </h3>
        <h3 className=' text-2xl  hover:text-green-500'> Wari-Chat </h3>
      </div>
      <div className='flex justify-between items-center bg-black text-white'>
        <div className='w-1/2 h-screen   grid  place-items-center hover:border-2 border-blue-700'>
          <div className="font-bold">
            <h3 className='mb-4 text-2xl  hover:text-blue-700'>Have a private chat .</h3>
            <h3 className='mb-4 text-2xl  hover:text-blue-700'>Master of the chat&apos;,</h3>
            <h3 className='mb-6 text-2xl  hover:text-blue-700'>Captain of the Room</h3>
            <Link href="/create-room" className='border-2 p-2 rounded mt-6 hover:border-blue-600'>Create Room Now </Link>
          </div>
        </div>
        <hr></hr>
        <div className='w-1/2 h-screen  grid  place-items-center hover:border-2 border-green-500'>
          <div className="font-bold">
            <h3 className='mb-4 text-2xl  hover:text-green-700'>Already Have an invitation </h3>
            <h3 className='mb-4 text-2xl  hover:text-green-700'> Now You Can Chat : </h3>
            <h3 className='mb-6 text-2xl  hover:text-green-700'> Next Gen Free Speech </h3>
            <Link href="/join-room" className='border-2 p-2 rounded mt-6 hover:border-green-600'>Join Room . . .</Link>
          </div>      
        </div>
      </div>
    </>
  )
}
