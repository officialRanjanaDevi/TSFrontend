import React from 'react'
import Image from 'next/image'
import {CiPlay1,CiPause1} from 'react-icons/ci'
function LiveVideo() {
    const [play, setplay] = React.useState(false)
    const video = React.useRef(null)
    
    return (
        <>
            <div className="relative m-2 bg-red-400  lg:m-14 md:m-10">
            {play ? <CiPause1 className='absolute z-20 text-6xl text-white transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer top-1/2 left-1/2' onClick={()=>{
                    setplay(false)
                    video.current.pause()
                }} /> : <CiPlay1 className='absolute z-20 text-6xl text-white transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer top-1/2 left-1/2' onClick={()=>{
                    setplay(true)
                    video.current.play()
                }} />}
           
                <div className='relative flex items-center justify-center w-full h-auto  rel'>
                <video src="/videos/product.mp4" ref={video}  className='w-full h-full ' />
                    <div className='absolute flex flex-col justify-start w-full gap-4  left-5'>
                        <Image width={500} height={500} src="/images/livemore.png" alt="" className="w-5  md:w-8" />
                        <Image width={500} height={500} src="/images/livepeople.png" alt="" className="w-5  md:w-8" />
                        <Image width={500} height={500} src="/images/calander.png" alt="" className="w-5  md:w-8" />
                    </div>
                    <div className="absolute flex items-end h-full  bottom-4">
                        <Image width={500} height={500} src="/images/liv.png" alt="" className="w-10 " />
                    </div>
                    <div className="absolute  right-2 top-2">
                        <Image width={500} height={500} src="/images/replay.png" alt="" className="w-5  md:w-8" />
                    </div>
                </div>
            </div>
          
        </>
    )
}

export default LiveVideo