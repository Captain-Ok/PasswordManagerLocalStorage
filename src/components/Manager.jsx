import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passArr, setPassArr] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPassArr(JSON.parse(passwords));
        }
    }, []);

    const handlClick = () => {
        const isPassword = passwordRef.current.type === "password";
        passwordRef.current.type = isPassword ? "text" : "password";
        ref.current.src = isPassword ? "/hide.svg" : "/show.svg";
    };


    const handleSavePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all the fields');
            return;
        } else if (form.site.length > 3 && form.password.length > 3) {
            const id = uuidv4();
            const newPassArr = [...passArr, { ...form, id }];
            setPassArr(newPassArr);
            localStorage.setItem("passwords", JSON.stringify(newPassArr));
            setForm({ site: "", username: "", password: "" });

            toast('Detail Saved succesfully to LoalStorage', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }else{
            toast.error("Site length and Password length should be more then 3 letters");
            return;
        }
    }

    const handleDeletePassword = (id) => {
        let confirDelete = window.confirm("Do you really wanted to delete (You can't Undo this action)");
        if (confirDelete) {
            const filteredPassArr = passArr.filter(item => item.id !== id);
            setPassArr(filteredPassArr);
            localStorage.setItem("passwords", JSON.stringify(filteredPassArr));
        }

        toast('Deleted Succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    const handleEdit = (id) => {
        const itemToEdit = passArr.find(i => i.id === id);
        if (itemToEdit) {
            setForm(itemToEdit);
            setPassArr(passArr.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passArr.filter(item => item.id !== id)));
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Ready to Paste', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });

        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className="min-h-[80vh] w-full flex flex-col p-2">
                    <div className="flex-1 w-full max-w-6xl mx-auto">
                        <h1 className='text-3xl font-bold text-center mt-4'>
                            <span className='text-green-700'>&lt;</span>
                            Pass<span className='text-green-700'>Manage/&gt; </span>
                        </h1>
                        <p className='text-green-900 text-md text-center'>This is your own password Manager</p>

                        <div className='flex flex-col p-4 gap-4 items-center'>
                            <input value={form.site} className='bg-white rounded-full w-full max-w-[90%] border border-green-500 text-black p-4 py-1' type="text" onChange={handleChange} placeholder='Enter Your website URL' name='site' id='site' />

                            <div className="flex w-full max-w-[90%] gap-4 flex-col md:flex-row">
                                <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white rounded-full w-full border border-green-500 text-black p-4 py-1' type="text" id='usename' name='username' />

                                <div className="relative w-full">
                                    <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter your Password' className='bg-white rounded-full w-full border border-green-500 text-black px-4 py-1 pr-14' type="password" name='password' id='password' />
                                    <span onClick={handlClick} className='absolute right-2 top-1.5'>
                                        <img ref={ref} className='cursor-pointer' width={23} src="/show.svg" alt="eye" />
                                    </span>
                                </div>
                            </div>

                            <button onClick={handleSavePassword} className='flex gap-2 justify-center items-center bg-green-400 hover:bg-green-300 rounded-full copyButton cursor-pointer w-fit py-1 px-3 font-semibold border border-green-950'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                >
                                </lord-icon>

                                Save password</button>
                        </div>

                        <div className="password px-4 pb-8">
                            <h2 className='font-semibold text-2xl py-2'>Password</h2>
                            {passArr.length == 0 && <div>No Password available yet</div>}
                            {passArr.length != 0 &&
                                <div className="overflow-auto">
                                    <table className="mb-20 table-auto w-full overflow-hidden rounded-lg">
                                        <thead className='bg-green-800 text-white'>
                                            <tr>
                                                <th className='py-2'>Site</th>
                                                <th className='py-2'>UserName</th>
                                                <th className='py-2'>Password</th>
                                                <th className='py-2'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-green-100'>
                                            {passArr.map((item, index) => {
                                                return (
                                                    <tr key={index}>

                                                        <td className='Table'>
                                                            <div className='flex justify-center gap-5'>
                                                                <span><a href={item.site} target='_blank'>{item.site}</a></span>
                                                                <span className=' copyButton cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                                    <img src="/copy.svg" width={25} alt="" />
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className='Table'>
                                                            <div className='flex justify-center gap-5'>
                                                                <span>{item.username}</span>
                                                                <span className=' copyButton cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                                    <img src="/copy.svg" width={25} alt="" />
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className='Table'>
                                                            <div className='flex justify-center gap-5'>
                                                                <span>{item.password}</span>
                                                                <span className='copyButton cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                                    <img src="/copy.svg" width={25} alt="copy" />
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className='Table'>
                                                            <div className='flex justify-center gap-5'>
                                                                <span onClick={() => { handleDeletePassword(item.id) }} className='cursor-pointer'><img src="/Delete.svg" width={20} alt="Delete" /></span>
                                                                <span onClick={() => { handleEdit(item.id) }} className='cursor-pointer'><img src="/edit.svg" width={20} alt="Edit" /></span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager