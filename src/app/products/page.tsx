
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
    <div className="flex flex-col justify-start items-center">
      <h1 className="text-xl mt-24 mb-16 w-full text-center"
      >Product List</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 ml-28">
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
