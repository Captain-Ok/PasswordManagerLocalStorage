import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 flex flex-col jusitfy-center fixed bottom-0 items-center p-2 gap-1 w-full'>
            <div className='logo font-bold text-white text-xl'>
                <span className='text-green-700'>&lt;</span>
                Pass<span className='text-green-700'>Manage/&gt; </span>
            </div>
            <span className='text-white font-semibold text-md'>Created By Akhil Singh Bhandari</span>

        </div>
    )
}

export default Footer