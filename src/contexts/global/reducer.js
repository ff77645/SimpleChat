


export const initialState = {
    modalName:'SETTING_HEAD',
    selectedHeadFile:'',
    roomData:{
        roomName:'公共频道',
        roomId:'000001',
        roomNum:'000001',
    },
    userData:{},
}


const methods = {
    setUserData(state,value){
        return {
            ...state,
            userData:value,
        }
    },
    setRoomData(state,value){
        return {
            ...state,
            roomData:value,
        }
    },
    setModalName(state,value){
        return {
            ...state,
            modalName:value,
        }
    },
    setSelectedHeadFile(state,value){
        return {
            ...state,
            selectedHeadFile:value,
        }
    },
}




export const reducer = (state,action)=>{
    return methods[action.type](state,action.value)
}