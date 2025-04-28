import React, { useEffect } from 'react'
import Image from 'next/image'
import { RxCross1 } from 'react-icons/rx'
import { VscEye } from 'react-icons/vsc'
import { AiOutlineSend } from 'react-icons/ai'
import { BiCommentAdd } from 'react-icons/bi'
import {CiPlay1,CiPause1} from 'react-icons/ci'
function LiveVideo2() {
    const [comment, setcomment] = React.useState('')
    const [show, setcShow] = React.useState(false)
    const [play, setplay] = React.useState(false)
    const [showControls, setshowControls] = React.useState(true)
    const video = React.useRef(null)

    const clickhendler = () => {
        comments.push(
            ...comments,
            {
            name: 'Devon Lane',
            content: comment,
            image: "/images/lvprof2.png"
        })
        setcomment('')
    }


    const comments = [{
        name: 'Devon Lane',
        content: "Men Solid Pure Cotton T-shirt",
        image: "/images/lvprof2.png"
    },
    {
        name: 'Devon Lane',
        content: "Men Solid Pure Cotton T-shirt",
        image: "/images/lvprof2.png"
    },
    {
        name: 'Devon Lane',
        content: "Men Solid Pure Cotton T-shirt",
        image: "/images/lvprof2.png"
    },
    ]
    useEffect(() => {
        setTimeout(() => {
            setshowControls(false)
        },5000)
    },[showControls])
    return (
        <div className="m-2  lg:mx-40 md:m-16" onClick={()=>{
            setshowControls(true)
        }}>

            <div className='relative flex items-center justify-center w-full h-full  rel'>
                {showControls&&
                <>
                {play ? <CiPause1 className='absolute z-20 text-6xl text-white transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer top-1/2 left-1/2' onClick={()=>{
                    setplay(false)
                    video.current.pause()
                }} /> : <CiPlay1 className='absolute z-20 text-6xl text-white transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer top-1/2 left-1/2' onClick={()=>{
                    setplay(true)
                    video.current.play()
                }} />}
                </>
                }
                
                <video src="https://www.youtube.com/watch?v=R_2VbKLKzJY&pp=ygUYbXludHJhIGJyYW5kZWQgYmFncyBoYXVs" ref={video}  className='w-full h-full ' />

                <div className='absolute flex items-center w-1/4 gap-2  md:top-5 top-2 left-5 sm:w-auto'>
                    <Image width={500} height={500} src="/images/livprof.png" alt="" className='w-5  lg:w-16 md:w-8' />
                    <p className='overflow-hidden text-xs text-white  md:text-sm lg:text-lg'>SAJAL FASHION STORE</p>
                </div>
                <div className='absolute flex items-center gap-3  md:flex-row md:top-5 top-2 right-5'>
                    <Image width={500} height={500} src="/images/live.svg" alt="" className='w-5  lg:w-16 md:w-8' />
                    <VscEye className='text-white  lg:text-2xl' />
                    <p className='text-xs text-white  md:text-md'>4,525</p>
                    {show ? <RxCross1
                        onClick={() => {
                            setcShow(false)
                        }
                        }
                        className='text-xl text-white  sm:text-3xl hover:cursor-pointer' /> : <BiCommentAdd onClick={() => {
                            setcShow(true)
                        }} className='text-xl text-white  sm:text-3xl hover:cursor-pointer' />}


                </div>
                
            
                {show &&
                    <div className='absolute items-start hidden w-full gap-3 pl-3 overflow-y-auto text-lg md:inline bottom-2'>
                        {comments.map((comment, index) => (
                            <div className='flex items-center gap-2 ' key={index}>
                                <Image width={500} height={500} src={comment.image} alt="" />
                                <div>
                                    <p className='w-full text-white'>{comment.name}</p>
                                    <p className='text-white '>{comment.content}</p>
                                </div>
                            </div>
                        ))}


                        <div className=' flex items-center  border-t-2 border-[#D9D9D9] p-3'>
                            {/* <textarea name="" className='flex items-center w-full text-white bg-transparent  placeholder:p-3 focus:outline-none' placeholder='Type here...'></textarea> */}
                            <input type="text" className='flex items-center w-full text-white bg-transparent  placeholder:p-3 focus:outline-none' value={comment} placeholder='Type here...'
                                onChange={(e) => {
                                    setcomment(e.target.value)
                                }} />
                            <AiOutlineSend className='w-20 text-3xl text-white ' onClick={() => {
                                clickhendler()
                            }} />
                        </div>
                    </div>
                }




            </div>
            {show &&
                    <div className='items-start w-full gap-3 pl-3 overflow-y-auto text-xs md:hidden sm:text-lg bottom-2'>
                        {comments.map((comment, index) => (
                            <div className='flex items-center gap-2 ' key={index}>
                                <Image width={500} height={500} src={comment.image} alt="" />
                                <div>
                                    <p className='text-black '>{comment.name}</p>
                                    <p className='text-black '>{comment.content}</p>
                                </div>
                            </div>
                        ))}


                        <div className='flex items-center p-3 border-t-2 border-black '>
                            {/* <textarea name="" className='flex items-center w-full text-white bg-transparent  placeholder:p-3 focus:outline-none' placeholder='Type here...'></textarea> */}
                            <input type="text" className='flex items-center w-full text-black bg-transparent  placeholder:p-3 focus:outline-none' value={comment} placeholder='Type here...'
                                onChange={(e) => {
                                    setcomment(e.target.value)
                                }} />
                            <AiOutlineSend className='w-20 text-3xl text-black ' onClick={() => {
                                clickhendler()
                            }} />
                        </div>
                    </div>
                }
        </div>
    )
}

export default LiveVideo2