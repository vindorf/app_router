import React from "react";
import { cn } from "../utils/cn";


interface ContainerProps {
  children: React.ReactNode;
  label: string;
  className?: any;
}

const Container: React.FC<ContainerProps> = ({ label, children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center w-56 m-auto shadow-md py-3 mt-24 bg-zinc-200 rounded h-70 opacity-90", className)}
    {...props}
    >
     <h1>{label} </h1>
      {children}
    </div>
  );
};

export default Container;
