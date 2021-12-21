import { useState } from "react";

const Input = () => {
    const [input, setInput] = useState("");
    return (
        <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}>
            <img className="bg-white w-11 h-10 rounded-full cursor-pointer" src="https://icon-library.com/images/facebook-f-icon-png/facebook-f-icon-png-19.jpg" alt="" />

            <div className="w-full divide-y divide-gray-700">
                <div className={``}>
                    <textarea 
                    className="bg-transparent outline-none text-[#d9d9d9]
                    text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows="2"
                    placeholder="What's happening"
                    />
                </div>
            </div>
        </div>
    )
}

export default Input
