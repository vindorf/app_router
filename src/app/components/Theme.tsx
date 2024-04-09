"use client"
import React, { useEffect, useState } from "react";


const Switch = () => {
  const [mode, setMode] = useState(() => {
    if( typeof localStorage!== "undefined") {
      const storedMode = JSON.parse(localStorage.getItem("mode")!);
    return storedMode === null? "light" : storedMode;
    }
  });
  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
},[mode])

  
useEffect(() => {
  if (typeof document!== "undefined") {
    if (mode === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else if (mode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }
}, [mode]);

  const toggleMode = () => {
    setMode((mode === 'light'? 'dark' : 'light'));
    
  };

  return (
    <div className="flex flex-col items-center border-b mt-2 py-2">
      <label className="switch">
        <input 
        checked={mode == 'dark'}
        onChange={toggleMode}
        type="checkbox" />
        
        <span className="slider round"></span>
      </label>
      <span className="font-extralight text-xs">{mode == 'dark'? 'Light': 'Dark'}</span>
    </div>
  );
};

export default Switch;
