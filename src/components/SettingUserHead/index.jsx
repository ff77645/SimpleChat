import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Avatar} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '../../contexts/global'




export default function SettingUserHead(){
    const [state,dispatch] = useContext(GlobalContext)

    const userHead = URL.createObjectURL(state.selectedHeadFile)

    const handleConfirm = ()=>{
        console.log('handleConfirm');
    }
    
    const onClose = ()=>{
        dispatch({type:'setModalName',name:''})
        URL.revokeObjectURL(userHead)
        dispatch({
            type:'setSelectedHeadFile',
            file:''
        })
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
                        <ModalHeader className="justify-center">设置头像</ModalHeader>
                        <ModalBody className="items-center">
                            <Avatar src={userHead} className="w-20 h-20 text-large" />
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