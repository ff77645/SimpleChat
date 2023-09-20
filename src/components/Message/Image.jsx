import { useState,useEffect,useCallback, useRef, useContext } from 'react'
import {Image,Avatar,Skeleton} from '@nextui-org/react'
import {fileToBase64,getFileMd5} from '../../utils'
import { ChatContext } from '../../contexts/chat'


export default function ImageMsg({data,align}){
    const sendMsg = useContext(ChatContext)
    const [file,setFile] = useState()
    const isLoading = useRef(true)
    
    const sendImage = useCallback(async (file)=>{
        const hash = await getFileMd5(file)
        const chunkSize = 1024 * 200
        const chunkTotal = Math.ceil(file.size / chunkSize)
        const chunks = []
        for(let i = 0;i < chunkTotal;i++){
            const start = i * chunkSize
            chunks.push({
                blob:file.slice(start,start+chunkSize),
                chunks:chunkTotal,
                chunk:i,
                type:file.type,
                name:file.name,
                hash
            })
        }
        chunks.forEach(value=>{
            console.log('发送',value);
            sendMsg({
                type:'image_chunk',
                value
            })
        })
    },[])

    useEffect(()=>{
        fileToBase64(data.value).then(res=>setFile(res))
        if(data.noSend && isLoading.current){
            isLoading.current = false
            sendImage(data.value)
        }
    },[])
    return (
        <div className={`mx-3 mt-2 flex ${align === 'right' ? 'flex-row-reverse' : 'flex-row'} flex-nowrap gap-2 p-2`}>
            <Avatar className="flex-none" size="lg" src={data.avatar} name={data.nickname}></Avatar>
            <div className={`flex-1  ${align === 'right' && 'text-right'}`}>
                <div className="text-gray-600 text-xs pt-2 w-auto">{data.nickname}</div>
                <div className="rounded p-2 text-black mt-2 inline-block min-h-[40px] relative">
                    {
                        file ? <Image
                            width={300}
                            height={200}
                            isZoomed
                            loading="lazy"
                            src={file}
                            alt="NextUI Image with fallback"
                        /> : <Skeleton className="rounded-lg">
                            <div className="h-[200px] w-[300px] rounded-lg bg-default-300"></div>
                        </Skeleton>
                    }
                </div>
            </div>
        </div>
    )
}
