import React from 'react'
import { cn } from '../utils/cn'
type Props = {
    type: string;
    placeholder: string;
    name: string;
    className?: any;
    value?:  string;
    func?: (e:any) => void;
}
const CustomInput = ({type, placeholder, name, className, value, func, ...props}: Props) => {
  return (
    <input 
    {...props}
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={func}
    className={cn(
    'focus:outline-none focus:ring-0 m-2 rounded text-black text-[12px] h-6 p-3',className)} 
    />
  )
}

export default CustomInput