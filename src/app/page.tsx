"use client";
import { signOut, useSession } from "next-auth/react";
import DeleteBtn from "./components/DeleteBtn";
import axios from "axios";
import { toCap } from "./utils/cap";
import { useState } from "react";
import { Modal, ModalBody } from "./components/Modal";
import CustomBtn from "./components/CustomBtn";

export default function Home() {
  const { data: session } = useSession();
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleDeleteUser = async () => {
    const userEmail = JSON.stringify(session?.user?.email)
    try {
      await axios.post("/api/delete/", { email: userEmail });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <main
      className="flex flex-col justify-start mx-auto ml-44 items-center relative"
      style={{
        width: "80vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="text-white absolute inset-0 flex flex-col justify-start items-center m-auto">
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded">
          <b className="text-[50px]">Main Page</b>
          <div className="m-2 ml-0 ">
            <p
              className="cursor-pointer hover:underline text-xs mt-3"
              onClick={handleModal}
            >
              Delete Account
            </p>
            <Modal isOpen={isModal}>
              <ModalBody label="Are you sure to remove your account?">
                <div className="flex justify-between">
                <p
                  className="cursor-pointer hover:underline text-xs mt-3"
                  onClick={handleModal}
                >
                  Close
                </p>
                <p
                  className="cursor-pointer hover:underline text-xs mt-3"
                  onClick={handleDeleteUser}
                >
                  Confirm
                </p>
                </div>
               
              </ModalBody>
            </Modal>
          </div>
        </div>

        {session && (
          <div className="w-full flex flex-col items-start p-4  rounded mt-14 gap-3 bg-zinc-900 opacity-80">
            <b>Welcome {toCap(session?.user?.role)}</b>
            <div className=" grid grid-cols-2 font-extralight text-right gap-2">
              <p>Name:</p>
              <p>{session?.user?.name}</p>
              <p>Email:</p>
              <p>{session?.user?.email} </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
