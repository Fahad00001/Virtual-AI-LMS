import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
const Logo = () => {
  return (
    <div className='w-[100%]  min-h-[90px] flex items-center justify-center flex-wrap gap-4  md:mb-[50px]'>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
        <MdOutlineCastForEducation className='w-[35px] h-[35px] fill-[#00394b]' />
            20K+ Online Courses</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
            <SiOpenaccess className='w-[35px] h-[35px] fill-[#00394b]' />
            Lifetime Access</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
        <FaSackDollar className='w-[35px] h-[35px] fill-[#00394b]' />
            Value for money</div>
            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
        <MdOutlineSupportAgent className='w-[35px] h-[35px] fill-[#00394b]' />
            Lifetime Support</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl text-[#03394b] bg-gray-200 cursor-pointer'>
        <FaUsers className='w-[35px] h-[35px] fill-[#00394b]' />
            Community Support</div>

    </div>
  )
}

export default Logo