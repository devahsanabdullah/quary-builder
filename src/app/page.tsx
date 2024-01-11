
// import {QuaryBuilderForm }from "@/componet/form/quaryBuilder"
import QueryBuilderJoin from "@/componet/form/JoinBuilder"

export default function Home() {
  return (
   <>
   <div className='flex justify-center item-center'>
   <p className='text-blue-500 font-bold pt-5'>SQL Quary Builder</p>
   </div>

  {/* <MenuCollection /> */}
  <div className='flex w-full justify-center items-center mt-20'>
  {/* <QueryBuilder  /> */}

  <QueryBuilderJoin />
  </div>
   </>
  )
}
