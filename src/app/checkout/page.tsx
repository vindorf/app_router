"use client"
import Link from 'next/link'
import React from 'react'
import { MdOutlineKeyboardReturn } from 'react-icons/md'
import { useCartStore } from '../store/cartStore'
import {useDefCartStore} from "../store/defCartStore"

const Checkout = () => {
    const {cart} = useCartStore((state) => ({
        cart: state.cart,
        total: state.total,
    }));

    const {dCart, setDCart, total, amount} = useDefCartStore((state) => ({
        dCart: state.dCart,
        setDCart: state.setDCart,
        total: state.total,
        amount: state.amount,
    }))

    console.log('DCART', dCart);
    console.log('CART', cart);
    console.log('TOTAL', total);



  return (
    <div className="mt-5 ml-64 mr-16 mb-24">
        <div className="text-white  inset-0 flex flex-col justify-start items-center">
            <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded flex flex-col">
            <b className="text-[50px]">Checkout</b>
            <div className="flex items-center justify-end mb-2">
                <Link className="bg-zinc-900 hover:underline" href="/cart">
                    <div className="flex items-center justify-center gap-2">
                    <MdOutlineKeyboardReturn />
                        to cart
                    </div>
                </Link>
            </div>
            </div>
        </div>
        <div>
            {amount &&  amount > 0 ? <b>You have {amount} items for {total} €</b> : <b>nothing</b> }
        </div>
    </div>
  )
}

export default Checkout