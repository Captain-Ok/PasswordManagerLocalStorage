import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='container px-4 h-14 py-5 mx-auto flex items-center justify-around relative'>

                <div className='logo font-bold text-white text-2xl'>
                    <span className='text-green-700'>&lt;</span>
                    Pass<span className='text-green-700'>Manage/&gt; </span>
                </div>

                {/* <ul>
                    <li className='list flex gap-4 font-semibold'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="/">About</a>
                        <a className='hover:font-bold' href="/">More Projects</a>
                    </li>
                </ul> */}
                
                <button className='font-bold cursor-pointer rounded-lg p-1 flex justify-center items-center gap-2 bg-green-600 ring-1 ring-white' onClick={() => window.open("https://github.com/", "_target")}>
                    <img className='invert' width={30} src="/git.svg" alt="git hub" />
                    <span>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar