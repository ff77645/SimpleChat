import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '@/contexts/global'
import { ChatContext } from "../../contexts/chat";




export default function SendMusic(){
    const [inputValue,setInputValue] = useState('')
    const [_,dispatch] = useContext(GlobalContext)
    const sendMsg = useContext(ChatContext)
    const [musicList,setMusicList] = useState(
        Array.from({length:20}).map((_,index)=>({
            name:'海阔天空'+index,
            songer:'Beyond',
        }))
    )
    const handleConfirm = ()=>{
        console.log('handleConfirm');
    }
    
    const onClose = ()=>{
        dispatch({type:'setModalName',name:''})
    }

    const handleKeyDown = e =>{
        e.key === 'Escape' && onClose()
        if(e.key !== 'Enter') return
        handleConfirm()
    }

    const handleClick = e =>{
        const {musicIndex} = e.target.dataset
        if(!musicIndex) return 
        const music = musicList[musicIndex]
        if(!music) return
        sendMsg({
            type:'music',
            value: music,
            avatar:'http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg',
            name:'Tom',
        })
        
    }
    return (
        <Modal 
            hideCloseButton
            defaultOpen={true}
            onClose={onClose}
            classNames={{
                base:'bg-transparent shadow-none'
            }}
        >
            <ModalContent> 
                <ModalBody className="p-0 gap-0">
                    <Input autoFocus value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} type="text" size="lg" />
                    <div className="text-sm mt-3 rounded-lg overflow-hidden bg-white">
                        <div onClick={handleClick} className="max-h-[50vh] overflow-auto cursor-pointer">
                            {
                                musicList.map((item,index)=>(
                                    <div key={index} className="flex flex-row justify-between items-center p-2 hover:bg-slate-400 rounded-md">
                                        <div className="">
                                            <div className="t text-black">{item.name}</div>
                                            <div className="text-xs text-gray-600">{item.songer}</div>
                                        </div>
                                        <div data-music-index={index} className=" select-none">
                                            发送
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}