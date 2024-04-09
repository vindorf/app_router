
import getProducts from "@/app/api/prodapi";
import { ProductCard } from "../components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProductList() {
  
 const session = await getServerSession(authOptions);

 if(!session) {
  redirect('/login')
 }
  const apiData = await getProducts();

  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="text-white lg:w-3/4 inset-0 flex flex-col justify-start items-center ml-64 ">
      <div className="mt-40 mb-8 w-full bg-zinc-900 opacity-80 px-4 rounded">
      <b className="text-[50px]"
      >Product List</b>
      </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 ml-64">
        {apiData &&
          apiData.map((e, i) => (
            <a key={i} href={`/products/${e._id}`}>             
                <ProductCard id={e._id} title={e.title} image={e.image} />            
            </a>
          ))}
      </div>
    </div>
  );
}
