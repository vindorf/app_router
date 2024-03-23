import onePost from "@/app/api/onepostapi";
import PostCard from "@/app/components/PostCard";
import { MdOutlineKeyboardReturn } from "react-icons/md";

export default async function ({ params }: { params: { id: string }; title:string }) {
    const apiData = await onePost(params.id);
    return (
        <div className='flex justify-center items-center mt-44 md:w-[700px] ml-64'>
            {/* <h1>Post ID: {params.id}</h1> */}
            <PostCard title={apiData.title} post={apiData.post}/>
        </div>
    )

}
