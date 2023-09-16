


export const initialState = {
    modalName:'SEND_MUSIC',
    selectedHeadFile:'',
}


const methods = {
    setModalName(state,{name}){
        return {
            ...state,
            modalName:name
        }
    },
    setSelectedHeadFile(state,{file}){
        return {
            ...state,
            selectedHeadFile:file,
        }
    }
}




export const reducer = (state,action)=>{
    return methods[action.type](state,action)
}