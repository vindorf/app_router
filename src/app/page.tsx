"use client";
import { signOut, useSession } from "next-auth/react";
import DeleteBtn from "./components/DeleteBtn";
import axios from "axios";
import { toCap } from "./utils/cap";


export default function Home() {
 
  const { data: session } = useSession();

  const handleDeleteUser = async (email: string) => {
   
    try {
      await axios.post('/api/delete/', {email: email});
       signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    const confirmed = confirm('Are you  sure to delete account?');
    if(confirmed) {
      handleDeleteUser(`${session?.user?.email}`);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center ml-16">
      <h1 className="text-xl mt-24 mb-8">Main Page</h1>
      {session && (
        <div className="flex flex-col items-center gap-3">
          <b>Welcome {toCap(session?.user?.role)}</b>
          <div className="grid grid-cols-2 font-extralight text-right gap-2">
            <p>Name:</p>
            <p>{session?.user?.name}</p>
            <p>Email:</p>
            <p>{session?.user?.email} </p>
          </div>
          <DeleteBtn
            className='w-30 font-extralight text-xs'
            label="Delete account"
            value={`${session?.user?.email}`}
            onDelete={handleConfirm}
          />
        </div>
      )}
      <div>
        <img src="/images/seehorse.png" className="w-[600px]" />
      </div>
    </main>
  );
}
