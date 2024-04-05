import React from "react";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getPost from "../api/postapi";
import DeleteBtn from "../components/DeleteBtn";
import deletePost from "../api/deletepostapi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";


const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getPost();
  
   if(!session) {
    redirect('/')
   }

  const handleDelete = async (_id: string) => {
    "use server";
    try {
      await deletePost(JSON.parse(_id));
      revalidatePath("/only_admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-16">
      <div className="text-white  inset-0 flex flex-col justify-start items-center ml-44">
      <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded">
          <b className="text-[50px]">Admin Page</b>
          {session?.user?.role !== "admin" ? (
          <div className="text-left">Access denied for User</div>
        ) : (
          <div className="flex flex-col items-start font-light">
            <h1>Welcome Admin</h1>
            <p>{session?.user?.email} </p>
          </div>
        )}
        </div>
        </div>
        
      {session?.user?.role === "admin" && (
     <div>
      <p className="text-center mt-3 border-b pb-3">All posts</p>
          {posts.length > 0 &&
            posts.map((e, i) => (
              <div key={i} className="mt-6 m-auto w-64 bg-zinc-100 pb-5 border-b font-light" >
                <p>Posttitle: </p>
                <p className="text-left">{e.title}</p>
                <p>Post: </p>
                <p className="text-left">{e.post}</p>
                
                <p className="text-xs font-extralight my-2 p-1 bg-white rounded"> UserId: {e.user?._id}</p>
                <div className="w-full">
                <Link 
                className="flex w-full mt-4 font-light text-xs py-1 justify-center shadow-lg hover:bg-zinc-300 bg-zinc-200"
                href={`only_admin/${e.user?._id}`}>All posts of this user</Link>
                <DeleteBtn
                  className="w-full mt-4 font-light text-xs py-1 shadow-lg"
                  label="Delete post"
                  value={JSON.stringify(e._id)}
                  onDelete={handleDelete}
                />
                </div>
              
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;

{/* <table style="border-collapse: collapse;">
  <tr>
    <td style="border: 1px solid black;">Zelle 1</td>
    <td style="border: 1px solid black;">Zelle 2</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">Zelle 3</td>
    <td style="border: 1px solid black;">Zelle 4</td>
  </tr>
</table> */}

