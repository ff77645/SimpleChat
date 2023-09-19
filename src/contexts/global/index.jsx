import {
    createContext,
    useReducer,
} from 'react'
import {initialState,reducer} from './reducer'


export const GlobalContext = createContext(initialState)


export const GlobalProvider = ({children})=>{
    const [state,disp] = useReducer(reducer,initialState)
    const dispatch = (type,value)=>disp({type,value})
    return (
        <GlobalContext.Provider value={[state,dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}