import React from 'react'
import { MdOutlineDetails } from "react-icons/md";

type Props = {
  id: string;
    name: string;
    email: string;
    company: string
}

const UserCard = ({id, name, email, company}: Props) => {
  return (
    <div  className=' gap-3 border rounded m-2 px-2 bg-zinc-200'>        
          <a href={`/user/${id}`} className='bg-zinc-100 text-zinc-700 text-start my-4 border p-3 w-[400px] shadow-lg rounded grid grid-cols-2 grid-rows-4'>
            <p>UserId:</p>
            <p>{id} </p>
            <p className='text-sm mt-2'> Name: </p>
            <p className='text-xs mt-2'> {name} </p>
            <p className='text-xs mt-2'> Email: </p>
            <p className='text-xs mt-2'> {email} </p>
            <p className='text-xs mt-2'> Company: </p>
            <p className='text-xs mt-2'> {company} </p>
            <p></p>
            <div className=' mt-2 flex justify-end'>
            <MdOutlineDetails className='h-full'/>
            </div>         
           </a> 
    </div>
  )
}

export default UserCard;