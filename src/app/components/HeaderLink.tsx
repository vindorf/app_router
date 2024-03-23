import Link from 'next/link';
import React, { Component } from 'react'


type Props = {
    href: string;
    label: string;
}



const HeaderLink = ({href, label}: Props) => {
  


    return (
      <Link 
      className="mx-2 hover:text-zinc-700 shadow hover:shadow-xl px-2 rounded"
      href={href}>{label}
      </Link>
    )
  
}

export default HeaderLink