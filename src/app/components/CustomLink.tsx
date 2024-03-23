import Link from "next/link";
import React from "react";

type CustomLinkProps = {
  label?: string;
  href: any;
  children?: React.JSX.Element;
  className?: string
};

const CustomLink = ({ href, children, label, className }: CustomLinkProps) => {
  return (
    <div className=" hover:text-zinc-700  px-2 rounded">
      <Link className={className} href={href}>{children}{label}</Link>
    </div>
  );
};

export default CustomLink;
