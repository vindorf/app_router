import React, { useEffect } from "react";
import Container from "../components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getPost from "../api/postapi";
import DeleteBtn from "../components/DeleteBtn";
import deletePost from "../api/deletepostapi";
import { revalidatePath } from "next/cache";

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
              <Container key={i} className="mt-6" label={`Post: ${e.title}`}>
                <p>User: {e.user.name}</p>
                <p>Email: {e.user.email}</p>
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
