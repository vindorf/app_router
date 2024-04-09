
import { revalidatePath } from "next/cache";
import addPost from "../api/addpostapi";
import SubmitBtn from "../components/SubmitBtn";
import DeleteBtn from "../components/DeleteBtn";
import { MdOutlineDetails } from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userPost } from "../api/userpostapi";
import { deleteUserPost } from "../api/deleteuserpost";


export const submitHandler = async (formData: FormData) => {
    "use server"
 
    await addPost({   
            title: formData.get('title') as string,
            post: formData.get('post') as string,
            email: formData.get('email') as string,
    })
     
    revalidatePath('/posts'); 
    
}

export const deleteHandler = async ( ID:string) => {
    "use server"
    const session = await getServerSession(authOptions)
    const email = session?.user?.email;
    const id = JSON.parse(ID)
   
    
       await deleteUserPost({_id: id,email: email}) 
       revalidatePath('/posts')
};



export default async function PostList() {
 const session = await getServerSession(authOptions);
 
 if(!session) {
   redirect('/login')
 }
    

const posts = await userPost(session?.user?.email);


    return (
        <div className="ml-16 mt-6 mb-24 flex flex-col items-center justify-center">
            <div className="text-white w-3/4 inset-0 flex flex-col justify-center items-center ml-24">
             <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded">
             <b className="text-[50px]">Post Page</b>
             </div>
             
            <h1 className="text-xl mt-5 mb-10 text-white"
            >Add Post</h1>
            <div className="lg:w-[700px] md:w-[600px] sm:w-[300px] xs:w-[300px] ml-3 flex felx-col items-center">
                <form 
                className="flex flex-col w-full m-auto gap-3"
                action={submitHandler}>
                    <input 
                    className="text-sm h-10 w-full  focus:outline-none focus:border pl-3"
                    placeholder="Title"
                    type="text"
                    name="title"
                    /> 
                    <input
                    hidden 
                    className="text-sm h-10 w-full  focus:outline-none focus:border pl-3"
                    type="text" 
                    name= "email"
                    defaultValue={session?.user?.email}
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
            <h1 className="text-xl text-white mt-24 mb-6"
            >Post List</h1> 
            {posts && posts.map((e:any, i:any) => (
                <div key={i} className="ml-5 lg:w-[700px] md:w-[600px] sm:w-[400px] xs:w-[300px] mt-5 border rounded flex justify-center" >
                    <a
                    className="text-zinc-400 flex flex-1 w-[450px] items-center justify-center py-2  shadow hover:shadow-lg"
                     href={`/posts/${e._id}`}>{e.title}
                     <MdOutlineDetails className='h-full ml-2 '/>
                    </a>   
                              
                  <DeleteBtn 
                  label="X"
                  value={JSON.stringify(e._id)}  
                  onDelete={deleteHandler}  
                  />
                </div>
            ))}
             </div> 
                    
        </div>
    );
}