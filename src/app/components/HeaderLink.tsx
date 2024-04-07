import Link from "next/link";
import React, { Component } from "react";

type Props = {
  href: string;
  label: string;
};

const HeaderLink = ({ href, label }: Props) => {
  return (
    <Link
      className="m-5 pr-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-b w-full"
      href={href}
    >
      {label}
    </Link>
  );
};

export default HeaderLink;
