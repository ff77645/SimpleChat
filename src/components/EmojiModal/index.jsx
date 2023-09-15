import { useRef, useState } from "react";
import emojiData from './font_emoji.json'



export default function EmojiModal({
        onClose,
        onConfirm,
    }){
    const target = useRef()
    const clickWrap = e =>{
        e.target === target.current && onClose && onClose()
    }
    const handleClick = e =>{
        if(e.target.dataset.value){
            console.log(e.target.dataset.value);
            onConfirm(e.target.dataset.value)
        }
    }
    return (
        <div 
            className="absolute flex items-end bottom-[110%] left-0 w-full overflow-auto"
            style={{
                height:'calc(100vh - 50px)'
            }}
        >  
            <div 
                onClick={clickWrap} 
                ref={target} 
                className="fixed top-0 left-0 w-full"
                style={{
                    height:'calc(100vh - 50px)'
                }}
            ></div>
            <div className="w-full bg-[rgba(255,255,255,.7)] py-4 px-6 z-10 rounded-xl h-[50vh] overflow-auto">
                {
                    emojiData.map((group,index)=>(
                        <div className="" key={index} onClick={handleClick}>
                            <div className="text-sm">{group.group_name}</div>
                            <div className="flex flex-row flex-wrap gap-0 text-xl">
                                {
                                    group.data.map((item,index)=>(
                                        <button key={index} title={item.name} data-value={item.emoji} className="border-[2px] border-[transparent] p-[1px] text-center rounded border-solid hover:border-[rgb(9,154,222)]">
                                            {item.emoji}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}