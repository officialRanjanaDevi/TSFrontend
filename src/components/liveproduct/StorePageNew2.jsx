import React from 'react'
import Image from 'next/image'
import Card from './LiveProductCard'

function StorePageNew2() {
    return (
        <>
            <div className='flex flex-col gap-8  m-14'>
                <div  className='flex flex-col gap-3 '>
                    <div className='flex items-center gap-2 '>
                        <div >
                            <Image width={500} height={500} src="/images/newstore.png" alt="" />
                        </div>
                        <div>
                            <p>Devon Lane</p>
                            <p>Product <span className=' text-2xl text-[#FE7B2E]'>25</span></p>
                        </div>
                    </div>
                    <div className='grid gap-10  lg:grid-cols-4 md:grid-cols-2 place-items-center'>
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                    </div>
                </div>


                <div>
                    <div className='flex items-center gap-2 '>
                        <div >
                            <Image width={500} height={500} src="/images/newstore.png" alt="" />
                        </div>
                        <div>
                            <p>Devon Lane</p>
                            <p>Product <span className=' text-2xl text-[#FE7B2E]'>25</span></p>
                        </div>
                    </div>
                    <div className='grid gap-10  lg:grid-cols-4 md:grid-cols-2 place-items-center'>
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                    </div>
                </div>


                <div>
                    <div className='flex items-center gap-2 '>
                        <div >
                            <Image width={500} height={500} src="/images/newstore.png" alt="" />
                        </div>
                        <div>
                            <p>Devon Lane</p>
                            <p>Product <span className=' text-2xl text-[#FE7B2E]'>25</span></p>
                        </div>
                    </div>
                    <div className='grid gap-10  lg:grid-cols-4 md:grid-cols-2 place-items-center'>
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                        <Card img={'/images/sari2.jpeg'} />
                        <Card img={'/images/sari1.jpeg'} />
                    </div>
                </div>
                 <div className='flex items-center justify-center w-full gap-5 '>
                    <button className=' bg-[#333333] text-white py-1 px-2'>Accept</button>
                    <button className=' text-[#5B5B5B] border-2 border-[#CDCDCD] py-1 px-2'>Reject</button>
                </div>
            </div>
        </>
    )
}

export default StorePageNew2