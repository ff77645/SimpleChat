import {useEffect, useRef, useState,useImperativeHandle,forwardRef,useContext} from 'react'
import {commands} from '../../helper/commands'
import {CommandContext} from '../../helper/context'


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

    return {
        cmdList,
        setCmdList,
        filterCli,
        currentIndex,
        setCurrentIndex,
    }
}


function CommandBox({value,onClose},ref){
    const {
        cmdList,
        currentIndex,
        filterCli,
        setCurrentIndex,
    } = useCommandState()
    const target = useRef()
    const dispatch = useContext(CommandContext)
    useEffect(()=>{
        filterCli(value.slice(1).trim())
    },[value])

    const handleClick = e =>{
        e.target === target.current && onClose && onClose()
    }

    const select = index =>{
        setCurrentIndex(index)
        const cmd = cmdList[index]
        if(!cmd) return
        dispatch(cmd)
        onClose()
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

    useImperativeHandle(ref,()=>{
        return {
            enter,
            arrowUp,
            arrowDown
        }
    },[currentIndex,cmdList])
    return (
        <div onClick={handleClick} ref={target} className="absolute flex items-end bottom-0 left-0 h-full w-full overflow-auto">
            <div className="flex flex-col items-stretch gap-1 w-full bg-[rgba(255,255,255,.7)] py-4 px-2 z-10 rounded overflow-hidden">
                {
                    cmdList.map((item,index)=>(
                        <div onClick={()=>select(index)} className={`text-sm text-gray-800 hover:bg-white rounded px-2 py-1 cursor-pointer ${currentIndex === index && 'bg-white'}`} key={index}>
                            <div>{item.rep}</div>
                            <div>{item.rep_en}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default forwardRef(CommandBox)