"use client"
import React, { useState } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState('bg-[#84adad]')

   const toggleTheme = () => {
    if(theme == 'bg-[#84adad]') {
        setTheme('bg-[#263236]');
    }else if(theme == 'bg-[#84adad]') {
        setTheme('bg-[#263236]')
    }
   }

  return {theme, toggleTheme}
     
};

export const ModeSwitch = () => {
    const { toggleTheme } = useTheme();

    return (
        <div className='flex justify-center'>
            <button onClick={toggleTheme}>mode</button>
        </div>
    )
};

