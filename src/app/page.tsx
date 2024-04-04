"use client";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toCap } from "./utils/cap";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "./components/Modal";
import CustomInput from "./components/CustomInput";

export default function Home() {
  const { data: session, update } = useSession();
  const [isModalAccount, setIsModalAccount] = useState(false);
  const [isModalPw, setIsModalPw] = useState(false);
  const [input, setInput] = useState({ name: "", email: "", role: "" });
  const [pw, setPw] = useState("");
  const [refPw, setRefPw] = useState("");
  const [msg, setMsg] = useState("");

  const currrentUserName = session?.user?.name as string;
  const currentUserEmail = session?.user?.email as string;
  const currentUserRole = session?.user?.role as string;

  const handleModalAccount = () => {
    setIsModalAccount(!isModalAccount);
  };

  const handleModalPw = () => {
    setIsModalPw(!isModalPw);
  };

  const handleDeleteUser = async () => {
    const userEmail = JSON.stringify(session?.user?.email);
    try {
      await axios.post("/api/delete/", { email: userEmail });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(input.email) && input.email != "") {
      setMsg("Please enter a valid email");
      return;
    }

    try {
      await axios.post("/api/update_user", {
        oldEmail: currentUserEmail,
        name: input.name ? input.name : currrentUserName,
        email: input.email ? input.email : currentUserEmail,
        role: input.role ? input.role : currentUserRole,
      });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePwUpdate = async () => {
    if (pw.length < 8) {
      setMsg("Password must be at least 8 characters");
      return;
    }
    if (!pw || !refPw) {
      setMsg("Please fill out the passwordfield");
      return;
    }
    try {
      await axios.post("/api/update_pw", {
        email: currentUserEmail,
        password: pw,
      });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pw) {
      if (refPw !== pw) {
        setMsg("Passwords do not match");
      } else {
        setMsg("matched");
      }
    }
  }, [refPw]);

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
        </div>

        {session && (
          <div className="w-full flex flex-col items-start p-4  rounded mt-14 gap-1 bg-zinc-900 opacity-80">
            <b className="text-[50px]">Welcome {toCap(currrentUserName)}</b>
            <div className="flex justify-between items-center w-full">
              <div>
                <p>{currentUserEmail} </p>
              </div>
              <div>
                <p
                  className="cursor-pointer hover:underline text-xs mt-3"
                  onClick={handleModalAccount}
                >
                  Account Settings
                </p>
                <Modal isOpen={isModalAccount}>
                  <ModalBody label="Update or delete your account. After update login again.">
                    <div className="flex flex-col">
                      <CustomInput
                        func={handleInputChange}
                        className="border"
                        type="text"
                        placeholder={currrentUserName}
                        name="name"
                      />
                      <CustomInput
                        func={handleInputChange}
                        className="border"
                        type="text"
                        placeholder={currentUserEmail}
                        name="email"
                      />
                      {msg && (
                        <p className="font-light text-xs text-center">{msg} </p>
                      )}
                      <p className="text-xs text-center">
                        Current role is {currentUserRole}
                      </p>
                      <select
                        name="role"
                        id="role"
                        onChange={handleInputChange}
                        className=" m-2 rounded h-6 font-light text-[14px] pl-3"
                      >
                        <option className="font-sans" value="user">
                          user
                        </option>
                        <option className="font-sans" value="admin">
                          admin
                        </option>
                      </select>
                    </div>
                    <div className="flex justify-between w-full">
                      <p
                        className="cursor-pointer hover:underline text-xs mt-3"
                        onClick={handleModalAccount}
                      >
                        Close
                      </p>
                      <p
                        className="cursor-pointer hover:underline text-xs mt-3"
                        onClick={handleUpdate}
                      >
                        Update
                      </p>
                      <p
                        className="cursor-pointer hover:underline text-xs mt-3"
                        onClick={handleDeleteUser}
                      >
                        Delete
                      </p>
                    </div>
                  </ModalBody>
                </Modal>
              </div>
              <p
                className="cursor-pointer hover:underline text-xs mt-3"
                onClick={handleModalPw}
              >
                Change Password
              </p>
              <Modal isOpen={isModalPw}>
                <ModalBody label="Change your Password then login again.">
                  <div className="flex flex-col items-center">
                    <CustomInput
                      className="border"
                      type="password"
                      name="password"
                      placeholder="new password"
                      func={(e) => setPw(e.target.value)}
                    />
                    <CustomInput
                      className="border"
                      type="password"
                      name="password"
                      placeholder="check password"
                      func={(e) => setRefPw(e.target.value)}
                    />
                  </div>
                  <div>
                    {msg && (
                      <p className="font-light text-xs text-center">{msg} </p>
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <p
                      className="cursor-pointer hover:underline text-xs mt-3"
                      onClick={handleModalPw}
                    >
                      Close
                    </p>
                    <p
                      className="cursor-pointer hover:underline text-xs mt-3"
                      onClick={handlePwUpdate}
                    >
                      Update
                    </p>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
