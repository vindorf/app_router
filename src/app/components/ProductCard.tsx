import React from "react";
import { MdOutlineDetails } from "react-icons/md";

type CardProps = {
  id: string;
  title: string;
  image: string;
};
export const ProductCard = ({ id, title, image }: CardProps) => {
  return (
    <div className="p-2 justify-center items-center h-[300px] shadow hover:shadow-lg rounded">
      <div className=" flex flex-col items-start" >
        <h1 className="text-zinc-500">{title} </h1>
      </div>
      <div className="w-56  flex flex-col justify-end items-center" >
        <div className="h-[235px] w-56">
          <img className="w-full" src={`${image}`} />
        </div>
        <div className="my-2 w-full flex justify-end">
            <MdOutlineDetails className="h-full" />        
        </div>
      </div>
    </div>
  );
};
