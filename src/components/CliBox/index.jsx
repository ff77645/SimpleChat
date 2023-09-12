import {useEffect, useState} from 'react'
import {commands} from './commands'


const useCliBoxState = ()=>{
    const [cliList,setCliList] = useState([])
    const filterCli = str => {
        const keys = str.split(/\s+/)
        const firstKey = keys.shift()
        let list = commands.filter(i=>i.keywords.includes(firstKey))
        while(keys.length){
            const key = keys.shift()
            list = list.filter(i=>i.keywords.includes(key))
        }
        setCliList(list)
        console.log({keys,str,list});
        
    }

    return {
        cliList,
        setCliList,
        filterCli,
    }

}


export default function CliBox({value}){
    const {cliList,filterCli} = useCliBoxState()

    useEffect(()=>{
        filterCli(value.slice(1).trim())
    },[value])

    return (
        <div className="absolute flex flex-col items-stretch gap-1 bottom-[100%] left-0 w-full bg-[rgba(255,255,255,.7)] py-4 px-2 z-10 rounded overflow-hidden">
            {
                cliList.map((item,index)=>(
                    <div className="text-sm text-gray-800 hover:bg-white rounded px-2 py-1 cursor-pointer" key={index}>
                        <div>{item.des}</div>
                        <div className=''>{item.des_en}</div>
                    </div>
                ))
            }
        </div>
    )
}