import React from 'react'
import Image from 'next/image'
import LiveproductCard from './LiveproductChat'
import LiveProductSide from './LiveProcuctSide'
import Card from './LiveProductCard'
function Liveproduct2() {
    return (
        <>
            <div className=''>


                <div className='flex flex-col items-center justify-center p-1 mx-5  md:mx-20'>
                    <div className='w-full '>
                        <Image src="/images/ytvideo.jpeg" alt="" className='w-full h-auto ' />
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-20 p-1  md:flex-row md:justify-evenly md:mx-20 md:gap-32'>

                    <LiveProductSide />
                    <LiveproductCard />

                </div>
                <div className='gap-20 p-1  md:mx-20 md:gap-32'>
                    <h1>
                        Selected product
                    </h1>
                    <div className='flex flex-col gap-5 '>


                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 place-items-center xl:grid-cols-4 '>
                            <Card img={'/images/sari2.jpeg'} />
                            <Card img={'/images/sari1.jpeg'} />
                            <Card img={'/images/sari2.jpeg'} />
                            <Card img={'/images/sari1.jpeg'} />

                        </div>


                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 place-items-center xl:grid-cols-4 '>
                            <Card img={'/images/sari2.jpeg'} />
                            <Card img={'/images/sari1.jpeg'} />
                            <Card img={'/images/sari2.jpeg'} />
                            <Card img={'/images/sari1.jpeg'} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Liveproduct2