import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { useState, useRef } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { db, storage } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(null)

    const filePickerRef = useRef();

    const sendPost = async () => {
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            // id:session.user.id,
            // username: session.user.name,
            // userImg: session.user.image,
            // tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),

        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if(selectedFile){
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image : downloadURL,
                });
            });
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };
    
    
    
    //setting image in State
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        } 
    };

    // setting emoji with text
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };


    return (
        <div
            className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll
            ${loading && "opacity-60"}`}
        >
            <img
                className="bg-white w-11 h-10 rounded-full cursor-pointer"
                src="https://icon-library.com/images/facebook-f-icon-png/facebook-f-icon-png-19.jpg"
                alt=""
            />

            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        className="bg-transparent outline-none text-[#d9d9d9]
                    text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="2"
                        placeholder="What's happening"
                    />

                    {/* image div  */}
                    {selectedFile && (
                        <div className="relative">
                            <div
                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full 
                            flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={() => setSelectedFile(null)}
                            >
                                <XIcon className="text-white h-5" />
                            </div>

                            <img
                                src={selectedFile}
                                alt="image"
                                className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* icons div */}
                {!loading && (

                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                        <div className="icon" onClick={() => filePickerRef.current.click()}>
                            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />

                            <input
                                type="file"
                                hidden
                                onChange={addImageToPost}
                                ref={filePickerRef}
                            />
                        </div>
                        <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>


                        {showEmojis && (
                            <Picker
                            onSelect={addEmoji}
                            style={{
                                position: "absolute",
                                marginTop: "465px",
                                marginLeft: -40,
                                maxWidth: "320px",
                                borderRadius: "20px",
                            }} 
                            theme="dark"/>
                        )}
                    </div>

                    <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold 
                    shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 
                    disabled:cursor-default" disabled={!input.trim() && !selectedFile}
                    onClick={sendPost}
                    >
                        Tweet
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default Input;
