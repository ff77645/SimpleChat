import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";




export default function ActionModal({
        isOpen,
        onOpenChange,
        modalState,
        onConfirm,
    }){
    const inputRef = useRef()
    const [inputValue,setInputValue] = useState('')

    useEffect(()=>{
        isOpen && inputRef.current.focus()
    },[isOpen])

    const handleConfirm = ()=>{
        onConfirm(inputValue)
        onOpenChange(false)
    }

    const handleKeyDown = e =>{
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
                        <ModalHeader className="justify-center">{modalState.title}</ModalHeader>
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