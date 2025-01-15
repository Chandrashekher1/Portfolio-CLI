import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Command } from '../store/CliSlice';

const CLI = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.cli.history);

    // console.log(selector);
    

    const handleCommand = () => {
        if (input.trim() !== "") {
        dispatch(Command({ input }));
        setInput("");
        }
    };
    
  return (
    <div className='bg-black'>
        <div className='text-sm'>
            <p className='text-green-700'>Portfolio- <span className='text-yellow-500'>CP03</span></p>
        </div>
        <div className='text-white overflow-y-scroll h-96'>
            {
                selector.map((line,index) => (
                    <div key={index} className='text-wrap text-gray-300'>
                        {line}             
                    </div>

                    
                ))
            }
            <div className='flex my-1 inline-block'>
                <span>$</span>
                <textarea type="text"
                    className="bg-black outline-none text-sm text-gray-300 w-full h-96 mx-1"
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCommand()}
                 />
            </div>
        </div>
        
    </div>
  )
}

export default CLI