import React from 'react'
import { IoMdCloudUpload } from 'react-icons/io'
function UploadVideo() {
  return (
  <>

<div className=' bg-[#FFFFFF] border-2 border-gray-300 flex flex-col gap-2  md:w-1/2  w-full p-5 rounded-md'>
                <p className='md:text-xl text-lg font-bold'>Upload Video</p>
                <p className='  text-sm'>Upload from desktop</p>
                <div className=' flex flex-col justify-between items-center bg-[#F2F2F1] p-2 border-dashed border-gray-400 rounded-lg border-2'>
                    <IoMdCloudUpload className='  lg:text-8xl md:text-5xl text-[#FAAC06]' />
                    <p className=' lg:text-sm text-xs'>Drag and drop yur photo here</p>
                    <p className=' lg:text-sm text-xs text-center'>Upload 50 photos of max size 10 mb on format pnf, jpg, jpeg, gif webp, heic, heif.</p>
                    <p className=' text-gray-500'>OR</p>
                    <button className=' bg-[#FAAC06] px-2 py-1 rounded-sm'>
                    Upload photo now
                    </button>
                </div>
            </div>  
  </>
  )
}

export default UploadVideo