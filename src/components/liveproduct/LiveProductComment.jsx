import React, { useState } from 'react'
import Image from 'next/image'
import { BiLike } from 'react-icons/bi'
import { BiDislike } from 'react-icons/bi'
import { AiOutlineDown } from 'react-icons/ai'


function LiveProductComment({ setComment }) {
    const [reply, setReply] = useState(null)
    const [reply2, setReply2] = useState("")
    const replayHandler = () => {
        setReply(!reply)
    }
    const crosshandler = () => {
        setComment(false)
    }
    const sendHandler = () => {
        alert(reply2)
        setReply2("")
        
    }
    const addHandler = () => {
        
    }

    return (
        <>
            {/* <div className='flex items-center justify-center w-screen bg-pink-200 '> */}
            <div className="fixed top-0 flex items-center justify-center left-0 right-0 z-50 p-4   overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className='bg-white'>
                        <div >
                            <div className='flex justify-between p-5 border-2 border-gray-200 '>
                                <div> Comment(150)</div>
                                {/* <img width={500} height={500} src="/images/cross.svg" alt=".." onClick={() => {
                                    crosshandler()
                                }} /> */}
                                 <Image width={20} height={20} src="/images/cross.svg" alt=".." onClick={() => {
                                    crosshandler()
                                }} />
                            </div>

                            <div className='border-2 border-gray-200  p-7'>


                                <div className='flex flex-col gap-2 '>
                                    <div className='flex items-center gap-3 ' >
                                        <Image width={47} height={47} src="/images/prof.jpeg" alt="" className='rounded-full'/>
                                        <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                    </div>
                                    <div className='flex flex-col gap-2  ml-14'>
                                        <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                            <div><BiLike /></div>

                                            <p>66</p>
                                            <div><BiDislike /></div>
                                            <p>22</p>
                                            <p>Reply</p>
                                        </div>
                                        <div className=' text-[#FE7B2E] flex items-center gap-1 hover:cursor-pointer'
                                            onClick={() => {
                                                setReply(1)
                                            }
                                            }
                                        >
                                            <p>Reply </p>
                                            <AiOutlineDown />

                                        </div>
                                    </div>
                                    <div className={reply === 1 ? "block" : "hidden"}>
                                        <div className='flex flex-col gap-2 '>
                                            <div className='flex  ml-14'>
                                                <Image width={47} height={47} src="/images/prof2.svg" alt=".." className='rounded-full' />
                                                <input type="text" className='w-full ml-2 border-b-2 border-gray-400  h-9 focus-visible:outline-none placeholder:p-2' placeholder='Type here.....' />
                                            </div>
                                            <div className='flex justify-end w-full gap-3 '>
                                                <button className='px-2 bg-white border-2 border-gray-200 '
                                                    onClick={() => {
                                                        setReply(null)
                                                    }}
                                                >
                                                    Cancel
                                                </button>

                                                <button className=' border-2 border-gray-200 px-2 bg-[#888888]'
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                            <div className=' ml-14'>

                                                <div className='flex items-center gap-3 ' >
                                                    <Image width={47} height={47} src="/images/prof2.svg" alt="" className='rounded-full'/>
                                                    <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                                </div>


                                                <div className='flex flex-col gap-2  ml-14'>
                                                    <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                                        <div><BiLike /></div>

                                                        <p>66</p>
                                                        <div><BiDislike /></div>
                                                        <p>22</p>
                                                        <p>Reply</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3 ' >
                                        <Image width={47} height={47} src="/images/prof.jpeg" alt="" className='rounded-full'/>
                                        <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                    </div>


                                    <div className='flex flex-col gap-2  ml-14'>
                                        <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                            <div><BiLike /></div>

                                            <p>66</p>
                                            <div><BiDislike /></div>
                                            <p>22</p>
                                            <p>Reply</p>
                                        </div>
                                        <div className=' text-[#FE7B2E] flex items-center gap-1 hover:cursor-pointer' onClick={() => {
                                            setReply(2)
                                        }}>
                                            <p>Reply </p>
                                            <AiOutlineDown />

                                        </div>

                                    </div>
                                    <div className={reply === 2 ? "block" : "hidden"}>
                                        <div className='flex flex-col gap-2 '>
                                            <div className='flex  ml-14'>
                                                <Image width={47} height={47} src="/images/prof2.svg" alt=".." className='rounded-full'/>
                                                <input type="text" className='w-full ml-2 border-b-2 border-gray-400  h-9 focus-visible:outline-none placeholder:p-2' placeholder='Type here.....' />
                                            </div>
                                            <div className='flex justify-end w-full gap-3 '>
                                                <button className='px-2 bg-white border-2 border-gray-200 '
                                                    onClick={() => {
                                                        setReply(null)
                                                    }}
                                                >
                                                    Cancel
                                                </button>

                                                <button className=' border-2 border-gray-200 px-2 bg-[#888888]'
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                            <div className=' ml-14'>

                                                <div className='flex items-center gap-3 ' >
                                                    <Image width={47} height={47} src="/images/prof2.svg" alt="" className='rounded-full'/>
                                                    <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                                </div>


                                                <div className='flex flex-col gap-2  ml-14'>
                                                    <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                                        <div><BiLike /></div>

                                                        <p>66</p>
                                                        <div><BiDislike /></div>
                                                        <p>22</p>
                                                        <p>Reply</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 ' >
                                        <Image width={47} height={47}src="/images/prof.jpeg" alt="" className='rounded-full'/>
                                        <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                    </div>


                                    <div className='flex flex-col gap-2  ml-14'>
                                        <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                            <div><BiLike /></div>

                                            <p>66</p>
                                            <div><BiDislike /></div>
                                            <p>22</p>
                                            <p>Reply</p>
                                        </div>
                                        <div className=' text-[#FE7B2E] flex items-center gap-1'
                                            onClick={() => { setReply(3) }}>
                                            <p>Reply </p>
                                            <AiOutlineDown />

                                        </div>

                                    </div>

                                    <div className={reply === 3 ? "block" : "hidden"}>
                                        <div className='flex flex-col gap-2 '>
                                            <div className='flex  ml-14'>
                                                <Image width={47} height={47} src="/images/prof2.svg" alt=".." className='rounded-full'/>
                                                <input type="text" className='w-full ml-2 border-b-2 border-gray-400  h-9 focus-visible:outline-none placeholder:p-2' placeholder='Type here.....' />
                                            </div>
                                            <div className='flex justify-end w-full gap-3 '>
                                                <button className='px-2 bg-white border-2 border-gray-200 '
                                                    onClick={() => {
                                                        setReply(null)
                                                    }}
                                                >
                                                    Cancel
                                                </button>

                                                <button className=' border-2 border-gray-200 px-2 bg-[#888888]'
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                            <div className=' ml-14'>

                                                <div className='flex items-center gap-3 ' >
                                                    <Image width={30} height={30} src="/images/prof2.svg" alt="" className='rounded-full'/>
                                                    <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                                </div>


                                                <div className='flex flex-col gap-2  ml-14'>
                                                    <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                                        <div><BiLike /></div>

                                                        <p>66</p>
                                                        <div><BiDislike /></div>
                                                        <p>22</p>
                                                        <p>Reply</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 ' >
                                        <Image width={47} height={47} src="/images/prof.jpeg" alt="" className='rounded-full'/>
                                        <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                    </div>


                                    <div className='flex flex-col gap-2  ml-14'>
                                        <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                            <div><BiLike /></div>

                                            <p>66</p>
                                            <div><BiDislike /></div>
                                            <p>22</p>
                                            <p>Reply</p>
                                        </div>
                                        <div className=' text-[#FE7B2E] flex items-center gap-1'
                                            onClick={() => { setReply(4) }}>
                                            <p>Reply </p>
                                            <AiOutlineDown />

                                        </div>
                                    </div>
                                    <div className={reply === 4 ? "block" : "hidden"}>
                                        <div className='flex flex-col gap-2 '>
                                            <div className='flex  ml-14'>
                                                <Image width={47} height={47}src="/images/prof2.svg" alt=".." className='rounded-full'/>
                                                <input type="text" className='w-full ml-2 border-b-2 border-gray-400  h-9 focus-visible:outline-none placeholder:p-2' placeholder='Type here.....' />
                                            </div>
                                            <div className='flex justify-end w-full gap-3 '>
                                                <button className='px-2 bg-white border-2 border-gray-200 '
                                                    onClick={() => {
                                                        setReply(null)
                                                    }}
                                                >
                                                    Cancel
                                                </button>

                                                <button className=' border-2 border-gray-200 px-2 bg-[#888888]'
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                            <div className=' ml-14'>

                                                <div className='flex items-center gap-3 ' >
                                                    <Image width={47} height={47} src="/images/prof2.svg" alt="" className='rounded-full'/>
                                                    <p>Seajal Readymade clothes <span className='text-gray-600 '>1d nice suites</span></p>
                                                </div>


                                                <div className='flex flex-col gap-2  ml-14'>
                                                    <div className='flex items-center w-1/2 gap-2 text-sm text-gray-600 '>
                                                        <div><BiLike /></div>

                                                        <p>66</p>
                                                        <div><BiDislike /></div>
                                                        <p>22</p>
                                                        <p>Reply</p>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between w-full p-5 border-2 border-gray-200  px-2'>
                                <div className='flex '>
                                    <Image width={47} height={47} src="/images/prof.jpeg" alt="" />
                                    <input type="text" className='ml-2  focus-visible:outline-none placeholder:p-2' placeholder='Type here.....' onChange={(event)=>{
                                        setReply2(event.target.value)
                                       
                                    }} />
                                </div>
                                <Image width={30} height={30} src="/images/send.jpeg" alt="" className='w-10 '
                                onClick={()=>{
                                    sendHandler()
                                   addHandler()
                                }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveProductComment