import onePost from "@/app/api/onepostapi";
import PostCard from "@/app/components/PostCard";

export default async function ({ params }: { params: { id: string }; title:string }) {
    const apiData = await onePost(params.id);
    return (
        <div className='flex text-white justify-center items-center mt-44 md:w-[700px] ml-64'>
            <PostCard title={apiData.title} post={apiData.post}/>
        </div>
    )

}
