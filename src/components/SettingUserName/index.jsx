import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '../../contexts/global'




export default function SettingUserName(){
    const [inputValue,setInputValue] = useState('')
    const [_,dispatch] = useContext(GlobalContext)

    const handleConfirm = ()=>{
        console.log('handleConfirm');
    }
    
    const onClose = ()=>{
        dispatch({type:'setAction',value:''})
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
                        <ModalHeader className="justify-center">设置用户名</ModalHeader>
                        <ModalBody>
                            <Input autoFocus value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} type="text" />
                        </ModalBody>
                        <ModalFooter className="justify-around">
                            <Button color="danger" variant="light" onPress={onClose}>
                                取消
                            </Button>
                            <Button color="primary" onPress={onClose}>
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