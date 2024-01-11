'use client'
import React from 'react'

const MenuCollection = () => {
    const menu=["SELECT", "SUM","COUNT",'AVG',"MIN",'MAX']
  return (
    <div className='flex items-center justify-center space-x-3'>
          {  menu.map((v,i)=><div className='flex justify-center items-center space-x-3 bg-blue-500 text-white px-2 rounded'>{v}</div>)
}
    </div>

  )
}

export default MenuCollection