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
    <main className="flex flex-col justify-start mx-auto ml-44 items-center relative"
    style={{ 
      width: '80vw', 
      height: '100vh', 
      overflow: 'hidden' 
    }}
    >
      <div
       className="text-white absolute inset-0 flex flex-col justify-start items-center m-auto" 
      >
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded">
        <b className="text-[50px]">Main Page</b>
        </div>
      
      {session && (
        <div className="w-full flex flex-col items-start p-4  rounded mt-14 gap-3 bg-zinc-900 opacity-80">
          <b>Welcome {toCap(session?.user?.role)}</b>
          <div className="grid grid-cols-2 font-extralight text-right gap-2">
            <p>Name:</p>
            <p>{session?.user?.name}</p>
            <p>Email:</p>
            <p>{session?.user?.email} </p>
          </div>
          <DeleteBtn
            className='w-30 font-extralight text-xs border bg-zinc-500 hover:text-zinc-500 rounded'
            label="Delete account"
            value={`${session?.user?.email}`}
            onDelete={handleConfirm}
          />
        </div>
      )}
      </div>     
    </main>
  );
}
      //  style={{ 
      //    backgroundImage: `url('https://m.media-amazon.com/images/M/MV5BMzQwZDg1MGEtN2E5My00ZDJlLWI4MzItM2U2MjJhYzlkNmEzXkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_SX300.jpg')`,
      //    backgroundRepeat: 'no-repeat',
      //    backgroundSize: 'cover',
      //    width: '60%',
      //    height: '70%'
      //  }}