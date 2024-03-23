
import { revalidatePath } from "next/cache";
import addPost from "../api/addpostapi";
import getPost from "../api/postapi";
import SubmitBtn from "../components/SubmitBtn";
import DeleteBtn from "../components/DeleteBtn";
import deletePost from "../api/deletepostapi";
import { MdOutlineDetails } from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export const submitHandler = async (formData: FormData) => {
    "use server"
 
    await addPost({   
            title: formData.get('title') as string,
            post: formData.get('post') as string,
    })
     
    revalidatePath('/posts'); 
    
}

export const deleteHandler = async (_id:string) => {
   "use server"
    
       await deletePost(_id) 
       revalidatePath('/posts')
};



export default async function PostList() {
 const session = await getServerSession(authOptions);
 
 if(!session) {
   redirect('/login')
 }
    
const apiData = await getPost();

    return (
        <div className="flex flex-col justify-center items-center my-24">
            <h1 className="text-xl mt-5 mb-10"
            >Add Post</h1>
            <div className="lg:w-[700px] md:w-[600px] sm:w-[400px] xs:w-[300px] ml-24">
                <form 
                className="flex flex-col w-full m-auto gap-3"
                action={submitHandler}>
                    <input 
                    className="text-sm h-10 w-full  focus:outline-none focus:border pl-3"
                    placeholder="Title"
                    type="text"
                    name="title"
                    />                  
                    <textarea 
                    className="text-sm w-full  focus:outline-none focus:border pl-3"
                    placeholder="Post"
                    name="post" 
                    id="" 
                    cols={5}
                    />
                    <SubmitBtn label="Submit"/>
                </form>
            </div>
            <h1 className="text-xl mt-24 mb-6"
            >Post List</h1> 
            {apiData && apiData.map((e, i) => (
                <div key={i} className="ml-24 lg:w-[700px] md:w-[600px] sm:w-[400px] xs:w-[300px] mt-5 border rounded flex justify-center" >
                    <a
                    className=" flex flex-1 w-[450px] items-center justify-center py-2  shadow hover:shadow-lg"
                     href={`/posts/${e._id}`}>{e.title}
                     <MdOutlineDetails className='h-full ml-2 '/>
                    </a>             
                  <DeleteBtn 
                  label="X"
                  value={`${e._id}`} 
                  onDelete={deleteHandler}/>  
                </div>
            ))}
              
                    
        </div>
    );
}