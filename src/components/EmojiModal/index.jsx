import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
// import emojiData from './emoji.json'
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
        <div onClick={clickWrap} ref={target} className="absolute flex items-end bottom-0 left-0 h-full w-full overflow-auto">
            <div className="w-full bg-[rgba(255,255,255,.7)] py-4 px-6 z-10 rounded h-[50vh] overflow-auto">
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