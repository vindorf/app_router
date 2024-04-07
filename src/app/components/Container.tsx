import React from "react";
import { cn } from "../utils/cn";


interface ContainerProps {
  children: React.ReactNode;
  label: string;
  className?: any;
}

const Container: React.FC<ContainerProps> = ({ label, children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center w-[22rem] m-auto shadow-md py-3 mt-24 bg-zinc-300 rounded-lg h-70 opacity-90", className)}
    {...props}
    >
     <b className="text-[22px] border-b w-full text-center">{label} </b>
      {children}
    </div>
  );
};

export default Container;
