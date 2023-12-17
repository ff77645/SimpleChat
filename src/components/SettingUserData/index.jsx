import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../contexts/global";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {selectImage} from '../../helper'
import toast from 'react-hot-toast'
import {uploadFile} from '../../helper/qiniu'
import dayjs from "dayjs";
import {updateUserData} from '../../api/index'
import {ASSET_PREFIX} from '../../config/config'


const genders = [
  {
    label: "男",
    value: '1',
  },
  {
    label: "女",
    value: '2',
  },
  {
    label: "未知",
    value: '0',
  },
];
let userHead

export default function SettingUserData() {
  const [state, dispatch] = useContext(GlobalContext);
  const [nickname,setNickname] = useState(state.userData.nickname)
  const [gender,setGender] = useState(state.userData.gender + '')
  const [userAvatar,setUserAvatar] = useState('')

  const onClose = () => {
    dispatch("setModalName", "");
    dispatch("setSelectedHeadFile", "");
    if(userAvatar.startsWith('blob:')){
      URL.revokeObjectURL(userAvatar)
    }
  };

  const handleConfirm = async () => {
    if(!nickname) return toast.error('昵称不能为空')
    const tid = toast.loading('修改中')
    const data = {
        id:state.userData.id,
        gender,
        nickname,
    }
    if(userAvatar) {
      const name = `user-image/user_head_${state.userData.id}_${dayjs().format('YYMMDDHHmmss')}`
      const res = await uploadFile(userHead,name)
      data.avatar = res.key
      data.avatarSize = userHead.size
    }
    const res = await updateUserData(data)
    toast.dismiss(tid)
    if(!res.success) return toast.error(res.msg || '修改失败')
    toast.success('修改成功')
    dispatch('setUserData',{
        ...state.userData,
        ...data
    })
    onClose()
  };


  const clickAvatar = async ()=>{
    const file = await selectImage()
    userHead = file
    setUserAvatar(URL.createObjectURL(file))
  }

  return (
    <Modal hideCloseButton defaultOpen={true} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="justify-center">设置头像</ModalHeader>
            <ModalBody>
              <div className="flex flex-row justify-center">
                <Avatar 
                    src={userAvatar || state.userData.avatar} 
                    className="w-20 h-20 text-large cursor-pointer"
                    fallback={<AiOutlineCloudUpload className="text-4xl"></AiOutlineCloudUpload>}
                    onClick={clickAvatar}
                />
              </div>
              <Select label="性别" size="sm" defaultSelectedKeys={[gender]} onChange={e=>setGender(e.target.value)}>
                {genders.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                autoFocus
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="昵称"
                type="text"
              />
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
  );
}
