"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toCap } from "../utils/cap";
import CartCart from "../components/CartCart";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useDefCartStore } from "../store/defCartStore";

const CartPage = () => {
  const { data: session } = useSession();
  const uName = session?.user?.name;
  const { amount } = useDefCartStore((state) => ({
    amount: state.amount,
  }));

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-5 ml-64 mr-16 mb-24">
      <div className="text-white  inset-0 flex flex-col justify-start items-center">
        <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded flex flex-col">
          <b className="text-[50px]">{toCap(`${uName}`)}'s Cart</b>
          <div className="flex items-center justify-between mb-2">
            <Link className="bg-zinc-900 hover:underline" href="/checkout">
              <div>Checkout</div>
            </Link>
            <Link className="bg-zinc-900 hover:underline" href="/products">
              <div className="flex items-center justify-center gap-2">
                <MdOutlineKeyboardReturn />
                to products
              </div>
            </Link>
          </div>
        </div>
      </div>
      <b className="w-full block text-center font-mono">
        {amount && amount > 0
          ? "You have" + " " + amount + " " + "item in cart"
          : "No items in cart"}
      </b>
      <div className="border rounded mt-4 p-3 shadow-lg">
        <CartCart />
      </div>
    </div>
  );
};

export default CartPage;
