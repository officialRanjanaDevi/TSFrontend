import React from 'react'
import Image from 'next/image'
function Liveproduct3Card() {
    return (
        <>
           <div className='p-5 '>
           <div>
                <div className='relative flex items-center justify-center bg-pink-200  w-60'>
                    <Image width={500} height={500} src="/images/livproduct3.jpeg" alt="" className=' w-60 h-58' />
                    <Image width={500} height={500} src="/images/play.svg" alt="mmm" className='absolute  -' />
                </div>
                <div className='mt-2  w-60'>
                    <div className='flex '>
                    <div className='flex items-center gap-2 '>
                        <Image width={500} height={500} src="/images/prof.jpeg" alt="" className=' w-9' />
                        <p>Seajal Readymade clotes</p>
                       
                    </div>
                    <div>
                    <Image width={500} height={500} src="/images/mor.svg" alt="" />
                    </div>
                    </div>
                    <div className='items-center text-center '>
                        <p className=' text-[#888888] mt-2'>54k Watching, 2 week ago</p>
                        <Image width={500} height={500} src="/images/live.svg" alt="" className='w-12 mt-2 mb-2 ml-4 ' />
                    </div>
                    <div className='bg-[#FAAC06] text-center p-1 rounded-md w-58 mt-2'>
                        <button>Shop now</button>
                    </div>
                </div>
            </div>
           </div>
        </>
    )
}

export default Liveproduct3Card