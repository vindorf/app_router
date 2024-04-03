"use client";

import { useSession } from "next-auth/react";
import HeaderLink from "./HeaderLink";
import LogoutBtn from "./LogoutBtn";
import { Modal, ModalBody } from "./Modal";
import { useState } from "react";
import CustomBtn from "./CustomBtn";

const Header = () => {
  const { data: session } = useSession();
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="bg-zinc-200 opacity-80  fixed top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg p-2 pt-5">
      {session && (
        <div className="bg-zinc-200 opacity-80  fixed top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg p-2 pt-5">
          <HeaderLink href="/" label="Main" />
          <HeaderLink href="/user" label="UserAPI" />
          <HeaderLink href="/products" label="ProdDB" />
          <HeaderLink href="/posts" label="PostDB" />
          <HeaderLink href="/only_admin" label="Admin" />
          <LogoutBtn></LogoutBtn>
        </div>
      )}

      {!session && (
        <div className="bg-zinc-200 opacity-80  fixed top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg p-2 pt-5">
          <HeaderLink href="/" label="Main" />
          <HeaderLink href="/login" label="Login" />
          <HeaderLink href="/register" label="Register" />
        </div>
      )}
      {/* <div className="mt-24">
        <button onClick={handleModal}>Open</button>
        <Modal isOpen={isModal}>
          <ModalBody label="Modalo">
            <button  onClick={handleModal}>Close</button>
          </ModalBody>
        </Modal>
      </div> */}
    </div>
  );
};

export default Header;
