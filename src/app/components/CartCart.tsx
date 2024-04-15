import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useSession } from "next-auth/react";


type Props = {
  _id: string;
  title: string;
  image: string;
  price: number;
  
};

const CartCart = () => {
  const {data:session} = useSession();
  const uMail = session?.user?.email;
  const cart = useCartStore<Props[]>((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const fetch = useCartStore((state) => state.fetch)
  const [item, setItem] = useState<{[key: string]: number}>({});
  const [total, setTotal] = useState<number>(0);

  // console.log("ITEMS", item);
  // console.log('CART', cart)

  const defCart = () => {
    let dCart: Record<string, number> = {};
    for (let i = 0; i < cart.length; i++) {
      dCart[cart[i]._id.toString()] = +1;
    }
    return dCart;
  };
  useEffect(() => {
    fetch(uMail)
  },[]);

  useEffect(() => {
    if (cart) {
      setItem(defCart());
    }
  }, [cart]);

  useEffect(() => {
    let sum = 0;
    for (const id in item) {
      const e = cart.find((e) => e._id === id);
      if (e) {
        sum += item[id] * (e.price ?? 0);
      }
    }
    setTotal(sum);
  }, [item]);

  const handleDelete = async (ID: string) => {
    await removeFromCart(uMail, ID);
    await fetch(uMail);
  };

  const handlePlus = (id:string) => {
    setItem({...item, [id]: item[id] + 1 });
  };

  const handleMinus = (id:string) => {
    if (item[id] > 1) {
      setItem({ ...item, [id]: item[id] - 1 });
    }
  }

  return (
    <>
      {cart &&
        cart.map((e: Props, i:any) => 
          <div 
          key={i}
          className="border-b mb-4 py-2 px-3 w-full flex justify-between ">
            <div className="flex flex-col items-start w-full">
              <b className={`font-mono mb-2 w-full pl-2  rounded-r bg-zinc-300  `}>
                {e.title}
              </b>
              <img className="w-14 pl-2" src={e.image} alt={e.title} />
            </div>

            <div className="flex h-6 mx-3 justify-center  items-center font-mono">
              <button 
              onClick={() => handlePlus(e._id)}
              className={`w-8  rounded-l bg-zinc-300 hover:bg-zinc-400 `}
>
                +
              </button>
              <input
                className="text-center bg-zinc-200  w-[50px]"
                type="text"
                defaultValue={item[e._id]}
                readOnly={true}
              />
              <button 
              onClick={() => {handleMinus(e._id)}}
              className="w-8  rounded-r bg-zinc-300 hover:bg-zinc-400">
                -
              </button>
            </div>

            <div className="flex flex-col items-end justify-between w-full">
              <b className="font-mono w-full text-end pr-2  rounded-l bg-zinc-300">
                {e.price * item[e._id]} €
              </b>
              <p
                className="hover:underline cursor-pointer text-xs pr-2"
                onClick={() => handleDelete(e._id)}
              >
                Remove
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between px-2 font-mono text-[20px] border-y">
          <b>Total:</b>
          <b>{total} €</b>
        </div>
    </>
  );
};

export default CartCart;
