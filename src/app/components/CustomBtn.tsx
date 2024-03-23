"use client"
import React from 'react'
import { cn } from '../utils/cn'

type Props = {
  type?: any;
  label: string;
  className?: any;
  func?: () => void;
}

const CustomBtn = ({type, label, className, func, ...props}: Props) => {
  return (
    <button
    type={type}
    {...props}
    className={cn('focus:outline-none focus:bg-zinc-300 py-4 flex h-6 justify-center m-2 my-0 rounded items-center text-white border border-white  hover:bg-zinc-300',className)}
    onClick={func}
    >{label} </button>
  )
}

export default CustomBtn