import React, { useEffect } from "react";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getPost from "../api/postapi";
import DeleteBtn from "../components/DeleteBtn";
import deletePost from "../api/deletepostapi";
import { revalidatePath } from "next/cache";
import CustomBtn from "../components/CustomBtn";


const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getPost();
  

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
          {posts &&
            posts.map((e, i) => (
              <Container key={i} className="mt-6 " label={`Post title: ${e.title}`}>
                <div className="grid grid-cols-2 text-right gap-2 mx-2 font-thin text-zinc-900">
                <p>User: </p>
                <p className="text-left">{e.user.name}</p>
                <p>Email: </p>
                <p className="text-left">{e.user.email}</p>
                </div>
                <p className="text-xs font-extralight my-2 p-1 bg-white rounded"> Id: {JSON.stringify(e.user._id)}</p>
                <DeleteBtn
                  className="w-3/4 mt-4 font-light text-xs py-1"
                  label="Delete"
                  value={JSON.stringify(e._id)}
                  onDelete={handleDelete}
                />
              </Container>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
