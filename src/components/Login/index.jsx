import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '../../contexts/global'
import request from '../../utils/request'
import toast from 'react-hot-toast'
import {ASSET_PREFIX} from '../../config/config'


export default function Login(){
    const [_,dispatch] = useContext(GlobalContext)
    const [email,setEmail] = useState('tom2@qq.com')
    const [password,setPassword] = useState('654321')

    const onClose = ()=>{
        dispatch('setModalName','')
    }

    const handleConfirm = async ()=>{
        if(!email || !password) return toast.error('请输入账号密码')
        const tid = toast.loading('正在登录')
        const res = await request.post('/auth/login',{email,password})
        toast.dismiss(tid)
        console.log({res});
        if(!res.success) return toast.error(res.msg)
        const avatar = res.user.avatar
        if(avatar && !avatar.startsWith('http')){
            res.user.avatar = ASSET_PREFIX + avatar
        }
        dispatch('setUserData',res.user)
        toast.success('登录成功')
        onClose()
    }

    const handleKeyDown = e =>{
        e.key === 'Escape' && onClose()
        e.key === 'Enter' && handleConfirm()
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
                            <ModalHeader className="justify-center">登录</ModalHeader>
                            <ModalBody>
                                <Input autoFocus value={email} onKeyDown={handleKeyDown} onChange={e=>setEmail(e.target.value)} placeholder="邮箱" type="email" />
                                <Input value={password} onKeyDown={handleKeyDown} onChange={e=>setPassword(e.target.value)} placeholder="密码" type="password" />
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