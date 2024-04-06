import React from "react";

const Table = () => {
  return (
    <div className="ml-44 m-16 ">
  <div className=" w-full rounded flex justify-center my-5 bg-zinc-500 text-white font-light py-3 items-center">
      <table className=" p-2 m-2 grid gap-3 w-3/4 ">
        <tr className="grid gap-2 grid-cols-2">
          <td className="border px-2">Zelle 1</td>
          <td className="border px-2">Zelle 2</td>
        </tr>
        <tr className="grid gap-2 grid-cols-2">
          <td className="border px-2">Zelle 3</td>
          <td className="border px-2">Zelle 4</td>
        </tr>
      </table>
    </div>
    </div>
  
  );
};

export default Table;
