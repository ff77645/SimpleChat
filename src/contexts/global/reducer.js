


export const initialState = {
    modalName:''
}


const methods = {
    setModalName(state,{name}){
        return {
            ...state,
            modalName:name
        }
    }
}




export const reducer = (state,action)=>{
    return methods[action.type](state,action)
}