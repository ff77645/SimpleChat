import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '../../contexts/global'
import toast from "react-hot-toast";
import request from "../../utils/request";

export default function SettingUserName(){
    const [inputValue,setInputValue] = useState('')
    const [_,dispatch] = useContext(GlobalContext)


    const onClose = ()=>{
        dispatch('setModalName','')
    }

    const handleConfirm = async ()=>{
        if(!inputValue) return toast.error('请输入房间名称')
        const res = await request.post('/room/create',{roomName:inputValue})
        console.log({res});
        dispatch('setRoomData',res.room)
        onClose()
    }
    
    const handleKeyDown = e =>{
        e.key === 'Escape' && onClose()
        if(e.key !== 'Enter') return
        handleConfirm()
    }
    return (
        <Modal 
            hideCloseButton
            defaultOpen={true}
            onClose={onClose}
        >
            <ModalContent> 
                {(onClose) => (
                    <>
                        <ModalHeader className="justify-center">创建房间</ModalHeader>
                        <ModalBody>
                            <Input autoFocus value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} placeholder="请输入房间名称" type="text" />
                        </ModalBody>
                        <ModalFooter className="justify-around">
                            <Button color="danger" variant="light" onPress={onClose}>
                                取消
                            </Button>
                            <Button color="primary" onPress={handleConfirm}>
                                确认
                            </Button>
                        </ModalFooter>
                    </>
                )
                }
            </ModalContent>
        </Modal>
    )
}