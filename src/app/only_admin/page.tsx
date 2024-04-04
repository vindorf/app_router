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
      <Container label="Info">
        {session?.user?.role !== "admin" ? (
          <div>Access denied for User</div>
        ) : (
          <div className="flex flex-col items-center">
            <h1>Welcome Admin</h1>
            <p>{session?.user?.email} </p>
          </div>
        )}
      </Container>
      {session?.user?.role === "admin" && (
     <div>
      <p className="text-center mt-3">All posts</p>
          {posts.length > 0 &&
            posts.map((e, i) => (
              <div key={i} className="mt-6 m-auto w-64 bg-zinc-100 pb-3 border-b font-light" >
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
