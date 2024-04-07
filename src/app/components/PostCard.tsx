import React from "react";
import { MdOutlineKeyboardReturn } from "react-icons/md";

type PostProps = {
  title: string;
  post: string;
};
const PostCard = ({ title, post }: PostProps) => {
  return (
    <div className="flex">
      <div className="ml-24 pr-5 border-r grid gap-3 w-[450px]">
        <div className="text-center w-full">
          <h1 className=" text-base">{title} </h1>
        </div>
        <p className="text-xs text-start mt-4 font-extralight underline">Message:</p>
        <div>
          <p className="text-sm border p-1 mt-3">{post} </p>
        </div>
      </div>
      <div>
        <a
          className="flex justify-center h-full items-center text-zinc-400 bg-zinc-200  mx-5  shadow-xl hover:bg-zinc-300 px-1 rounded"
          href="/posts"
        >
          <MdOutlineKeyboardReturn />
        </a>
      </div>
    </div>
  );
};

export default PostCard;
