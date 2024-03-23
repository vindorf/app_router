import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

const Container: React.FC<ContainerProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-56 m-auto shadow-md py-3 mt-24 bg-zinc-200 rounded h-70 opacity-90">
     <h1>{label} </h1>
      {children}
    </div>
  );
};

export default Container;
