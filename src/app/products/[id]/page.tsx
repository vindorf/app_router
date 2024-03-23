import getOneProduct from '@/app/api/oneprodapi';
import { MdOutlineKeyboardReturn } from "react-icons/md";

export default async function ProductDetails({params}: {
    params: {id: string}
}) {
const data = await getOneProduct(params.id)

    return (
        <div className='flex justify-center items-center mt-44 ml-44'>
           <div className=' flex flex-col justify-between items-start w-[280px] h-[320px] mr-4 pr-4 border-r'>
            <h1 className=' '>{data.title} </h1>
             <div className='grid grid-cols-2 w-[190px]'>
             <p className='text-xs'>Product ID:</p>
             <p className='text-xs'> {params.id}</p>
             </div>
            <img src={data.image} className='w-full'/>
           </div>
           <a className="flex justify-center items-center bg-zinc-200 h-[320px] mx-3 hover:text-zinc-700 shadow hover:shadow-xl px-1 rounded" href='/products'>
           <MdOutlineKeyboardReturn />
           </a>
        </div>
    )
} 