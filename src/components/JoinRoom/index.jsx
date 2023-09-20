import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '../../contexts/global'
import request from "../../utils/request";
import toast from "react-hot-toast";


export default function SettingUserName(){
    const [inputValue,setInputValue] = useState('')
    const [_,dispatch] = useContext(GlobalContext)
    
    const onClose = ()=>{
        dispatch('setModalName','')
    }

    const handleConfirm = async ()=>{
        const res = await request.post('/room/join',{roomNum:inputValue})
        if(!res.success) return toast.error(res.msg)
        toast.success('加入成功')
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
                        <ModalHeader className="justify-center">加入房间</ModalHeader>
                        <ModalBody>
                            <Input autoFocus value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} placeholder="请输入房间号" type="text" />
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