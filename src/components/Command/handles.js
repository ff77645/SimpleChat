
import {useContext} from 'react'
import {GlobalContext} from '@/contexts/global'
import {selectImage} from '@/helper/index'
import { actionType } from './type'

export const setUserName = () => {

}

export const useSetUserHead = () => {
    const [_,dispatch] = useContext(GlobalContext)

    const selectHeadImg =  async ()=>{
        const file = await selectImage()
        console.log({file});
        dispatch('setSelectedHeadFile',file)
        dispatch('setModalName',actionType.SETTING_HEAD)
    }
    return {
        selectHeadImg
    }

}

export const useSendImage = ()=>{
}

export const createRoom = () => {


}


export const joinRoom = () => {

}