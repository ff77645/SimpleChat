


export const initialState = {
    action:''
}


const methods = {
    setAction(state,{value}){
        const res = {
            ...state,
            action:value
        }
        console.log({res,value});
        return res
    }
}




export const reducer = (state,action)=>{
    return methods[action.type](state,action)
}