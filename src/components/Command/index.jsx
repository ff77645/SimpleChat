import {useEffect, useRef, useState,useImperativeHandle,forwardRef,useContext} from 'react'
import {commands} from './commands'
import {GlobalContext} from '../../contexts/global'


const useCommandState = ()=>{
    const [cmdList,setCmdList] = useState([])
    const [currentIndex,setCurrentIndex] = useState(0)
    const filterCli = str => {
        const keys = str.split(/\s+/)
        const firstKey = keys.shift()
        let list = commands.filter(i=>i.keywords.includes(firstKey))
        while(keys.length){
            const key = keys.shift()
            list = list.filter(i=>i.keywords.includes(key))
        }
        setCmdList(list)
        setCurrentIndex(0)
        console.log({keys,str,list});
    }

    const enter = () =>{
        select(currentIndex)
    }
    
    const arrowUp = () =>{
        if(currentIndex <= 0) return 
        setCurrentIndex(currentIndex-1)
    }

    const arrowDown = ()=>{
        if(currentIndex >= cmdList.length - 1) return
        setCurrentIndex(currentIndex+1)
    }

    return {
        enter,
        arrowUp,
        arrowDown,
        cmdList,
        setCmdList,
        filterCli,
        currentIndex,
        setCurrentIndex,
    }
}





function Command({value,onClose},ref){
    const {
        enter,
        arrowUp,
        arrowDown,
        cmdList,
        currentIndex,
        filterCli,
        setCurrentIndex,
    } = useCommandState()
    const target = useRef()
    const [_,dispatch] = useContext(GlobalContext)


    useEffect(()=>{
        filterCli(value.slice(1).trim())
    },[value])

    const handleClick = e =>{
        e.target === target.current && onClose && onClose()
    }

    const selectCmdIndex = index =>{
        setCurrentIndex(index)
        const cmd = cmdList[index]
        if(!cmd) return
        dispatch({
            type:'setModalName',
            name:cmd.action,
        })
        onClose()
    }

    

    useImperativeHandle(ref,()=>{
        return {
            enter,
            arrowUp,
            arrowDown
        }
    },[currentIndex,cmdList])
    return (
        <div 
        className="absolute flex items-end bottom-[110%] left-0 w-full overflow-auto"
        style={{
            height:'calc(100vh - 50px)'
        }}
        >
            <div 
                onClick={handleClick} 
                ref={target} 
                className="fixed top-0 left-0 w-full"
                style={{
                    height:'calc(100vh - 50px)'
                }}
            ></div>
            <div className="flex flex-col items-stretch gap-1 w-full bg-[rgba(255,255,255,.7)] py-4 px-2 z-10 rounded overflow-hidden">
                {
                    cmdList.map((item,index)=>(
                        <div onClick={()=>selectCmdIndex(index)} className={`text-sm text-gray-800 hover:bg-white rounded px-2 py-1 cursor-pointer ${currentIndex === index && 'bg-white'}`} key={index}>
                            <div>{item.rep}</div>
                            <div>{item.rep_en}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default forwardRef(Command)