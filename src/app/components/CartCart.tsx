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
  console.log("ITEMS", item);
  console.log('CART', cart)

  const defCart = () => {
    let dCart: Record<string, number> = {};
    for (let i = 0; i < cart.length; i++) {
      dCart[cart[i]._id.toString()] = +1;
    }
    return dCart;
  };

  useEffect(() => {
    if (cart) {
      setItem(defCart());
    }
  }, [cart]);

  const handleDelete = async (ID: string) => {
    await removeFromCart(uMail, ID);
    await fetch(uMail);
  };

  return (
    <>
      {cart &&
        cart.map((e: Props) => 
          <div className="border-b mb-4 py-2 px-3 w-full flex justify-between ">
            <div className="flex flex-col items-start w-full">
              <b className="font-mono mb-2 w-full pl-2 bg-zinc-100 opacity-80 ">
                {e.title}
              </b>
              <img className="w-14 pl-2" src={e.image} alt={e.title} />
            </div>

            <div className="flex h-6 mx-3 justify-center items-center font-mono">
              <button className="w-8 border rounded-l bg-zinc-100 hover:bg-zinc-200">
                +
              </button>
              <input
                className="text-center border-y  w-[50px]"
                type="text"
                value={item[e._id]}
                readOnly={true}
              />
              <button className="w-8 border rounded-r bg-zinc-100 hover:bg-zinc-200">
                -
              </button>
            </div>

            <div className="flex flex-col items-end justify-between w-full">
              <b className="font-mono w-full text-end pr-2 bg-zinc-100">
                {e.price} €
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
    </>
  );
};

export default CartCart;
