"use client";

import { useSession } from "next-auth/react";
import HeaderLink from "./HeaderLink";
import LogoutBtn from "./LogoutBtn";
import Switch from "./Theme";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className=" fixed opacity-90 top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg px-5 pt-5">
      {session && (
        <div className="bg-zinc-900 opacity-80  fixed top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg px-5 pt-5">
          <Switch/>
          <HeaderLink href="/" label="Main" />
          <HeaderLink href="/user" label="UserAPI" />
          <HeaderLink href="/products" label="ProdDB" />
          <HeaderLink href="/posts" label="PostDB" />
          <HeaderLink href="/only_admin" label="Admin" />
          <LogoutBtn></LogoutBtn>
        </div>
      )}

      {!session && (
        <div className="bg-zinc-900 fixed opacity-80 top-0 left-0 h-full flex flex-col justify-start gap-3 shadow-lg px-5 pt-5">
          <HeaderLink href="/" label="Main" />
          <HeaderLink href="/login" label="Login" />
          <HeaderLink href="/register" label="Register" />
        </div>
      )}
    </div>
  );
};

export default Header;
