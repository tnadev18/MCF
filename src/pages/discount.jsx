import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Discount() {
    const navigate = useNavigate()

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [step, setStep] = useState(1);

    const [reqData, setReqData] = useState({})

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  }, [])
    const handleChange = (e) => {
        const {name , value} = e.target;
        setReqData(reqData => ({
            ...reqData,
            [name] : value
            
        }))
    }

    const handleSubmit = (e) => {
        axios.post('https://mcfapis.bnbdevelopers.in/addDiscountCodes',reqData).then(e=>navigate('/Dash'))

    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="w-full max-w-l mx-auto p-4">
                        <div>
                            {/* Payment Form */}
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                                        
                                        <div className="overflow-x-auto">
                                            <form className="  rounded px-8 pt-6 pb-8 mb-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* Name fields */}
                                                    <div className="mb-4">
                                                        <label htmlFor="discount_code" className="block text-sm font-medium text-gray-600">Discount Code</label>
                                                        <input id="discount_code" name='discount_code' value={reqData.discountCode}  type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Enter code" onChange={handleChange} required />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="Discount Amount" className="block text-sm font-medium text-gray-600">Discount Amount</label>
                                                        <input id="Discount Amount" name='discount_amount' value={reqData.discountAmount}  type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Enter amount" onChange={handleChange} required />
                                                    </div>
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-around '>
                                
                                <button onClick={handleSubmit} className="btn-primary" style={{ padding: "5px 10px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", marginRight: "10px" }}>
                                    Add
                                </button>
                            </div>
                           
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}