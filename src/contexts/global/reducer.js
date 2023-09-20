


export const initialState = {
    modalName:'SETTING_HEAD',
    selectedHeadFile:'',
    roomData:{
        roomName:'大厅',
        roomId:'001',
        roomNum:'001',
    },
    userData:{},
    oldRoomId:'',
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
            oldRoomId:state.roomData.roomId,
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