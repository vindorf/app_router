"use client"

import { cn } from "../utils/cn";

type Props = {
    label: string;
    value: string;
    onDelete: (value:string) => void;
    className?: any
}
export default  function DeleteBtn({className, label, value, onDelete, ...props}: Props) {
     const clickHandler = async () => {

    try{
        await onDelete(value)
    } catch(error) {
        console.log('Error deleting post', error)
    }
 
}
    return (
        <button
        {...props}
        onClick={() => {clickHandler()}}
        className={cn("shadow bg-zinc-200 hover:bg-zinc-300 w-10 px-3 flex items-center justify-center", className)}
        >{label}</button>
    )
}