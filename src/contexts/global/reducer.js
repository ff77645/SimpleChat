
const token = localStorage.getItem('token')

export const initialState = {
    modalName:'',
    selectedHeadFile:'',
    roomData:{
        roomName:'大厅',
        roomId:'001',
        roomNum:'001',
    },
    userData:{},
    oldRoomId:'',
    currentPlayMusicId:'',
    token,
    theme:'dark',
}


const methods = {
    setTheme(state,value){
        return {
           ...state,
            theme:value,
        }
    },
    setToken(state,value){
        return {
           ...state,
            token:value,
        }
    },
    setCurrentPlayMusicId(state,value){
        return {
            ...state,
            currentPlayMusicId:value,
        }
    },
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