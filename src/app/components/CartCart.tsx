import React from "react";

type Props = {
  _id: string;
  title: string;
  image: string;
  price: number;
  remove: () => void;
};

const CartCart = ({ _id, title, image, price, remove }: Props) => {
  return (
    <div className="border-b mb-4 py-2 px-3 w-full flex justify-between">
      <div className="flex flex-col items-start w-full">
        <b className="font-mono mb-2 w-full pl-2 bg-zinc-100 opacity-80 ">
          {title}
        </b>
        <img className="w-14 pl-2" src={image} alt={title} />
      </div>
      <div className="flex flex-col items-end justify-between w-full">
        <b className="font-mono w-full text-end pr-2 bg-zinc-100">{price} €</b>
        <p
          className="hover:underline cursor-pointer text-xs pr-2"
          onClick={() => remove()}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartCart;
