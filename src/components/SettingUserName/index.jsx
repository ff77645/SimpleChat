import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";




export default function SettingUserName(){
    const inputRef = useRef()
    const [inputValue,setInputValue] = useState('')

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const handleConfirm = ()=>{
        console.log('handleConfirm');
    }

    const handleKeyDown = e =>{
        e.key === 'Escape' && onOpenChange(false)
        if(e.key !== 'Enter') return
        handleConfirm()
    }

    return (
        <Modal 
            hideCloseButton
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
        >
            <ModalContent> 
                {(onClose) => (
                    <>
                        <ModalHeader className="justify-center">设置用户名</ModalHeader>
                        <ModalBody>
                            <Input value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} ref={inputRef} type={modalState.inputType || 'text'} />
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
                )}
            </ModalContent>
        </Modal>
    )
}