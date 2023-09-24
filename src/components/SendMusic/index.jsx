import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import {GlobalContext} from '@/contexts/global'
import { ChatContext } from "../../contexts/chat";
import axios from "axios";
import toast from "react-hot-toast";
import {Howl,Howler} from 'howler'
import Loading from "../Loading";

const request = async path =>{
    // &realIP=116.25.146.177
    // https://music.summer9.cn
    // https://netease-cloud-music-api-ecru-gamma-37.vercel.app
    // http://localhost:4000
    const res = await axios.get(`https://netease-cloud-music-api-ecru-gamma-37.vercel.app${path}`)
    return res.data
}


let soundHandler = {}


const useSongPlay = ()=>{
    const [songId,setSongId] = useState('')
    const [isPlay,setIsPlay] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const handles = {
        play(){
            console.log('onplay');
            setIsPlay(true)
        },
        load(){
            console.log('onload');
        },
        end(){
            console.log('onend');
            setIsPlay(false)
            setSongId('')
        },
        pause(){
            console.log('onpause');
            setIsPlay(false)
        },
        stop(){
            console.log('onstop');
            setIsPlay(false)
        },
    }
    const playSong = song =>{
        Howler.stop()
        soundHandler.unload && soundHandler.unload()
        const src = song.source.map(i=>i.url)
        soundHandler = new Howl({
            src,
            html5:true,
            autoplay:true,
        })
        setSongId(song.id)

        for(let handle in handles){
            soundHandler.on(handle,handles[handle])
        }
        console.log({soundHandler});
    }

    return {
        songId,
        isPlay,
        playSong,
        setSongId,
        isLoading,
        setIsLoading,
    }
}


// https://music.163.com/song/media/outer/url?id=id.mp3 
export default function SendMusic(){
    const [inputValue,setInputValue] = useState('')
    const [_,dispatch] = useContext(GlobalContext)
    const sendMsg = useContext(ChatContext)
    const [musicList,setMusicList] = useState([])
    const [loadingLabel,setLoadingLabel] = useState('')
    const {
        songId,
        isPlay,
        playSong,
        setSongId,
        isLoading,
        setIsLoading,
    } = useSongPlay()

    const handleConfirm = async ()=>{
        // const tid = toast.loading('搜索中')
        setLoadingLabel('查询中')
        setIsLoading(true)
        const res = await request(`/cloudsearch?keywords=${inputValue}`)
        console.log({res});
        setMusicList(res?.result?.songs)
        setIsLoading(false)
        // toast.dismiss(tid)
    }
    
    const onClose = ()=>{
        soundHandler.unload && soundHandler.unload()
        dispatch('setModalName','')
    }

    const handleKeyDown = e =>{
        e.key === 'Escape' && onClose()
        if(e.key !== 'Enter') return
        handleConfirm()
    }

    const handleClick = async e =>{
        const {musicIndex,type} = e.target.dataset
        if(!musicIndex) return 
        const music = musicList[musicIndex]
        if(!music) return
        setLoadingLabel('检查资源')
        setIsLoading(true)
        const res = await request(`/check/music?id=${music.id}`)
        if(!res.success) {
            setIsLoading(false)
            return toast.error(res.message || '音乐不可用')
        }
        setLoadingLabel('获取播放资源')
        const res2 = await request(`/song/url?id=${music.id}`)
        const source = res2.data.map(i=>({
            level:i.level,
            type:i.type,
            url:i.url,
            size:i.size,
            id:i.id,
        }))
        source.push({
            url:`https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
            type:'mp3',
        })
        console.log({res2});
        const picUrl = music?.al?.picUrl
        const value = {
            name:music.name,
            id:music.id,
            songer:music.ar[0].name,
            time:music.dt,
            source,
            picUrl,
        }
        if(type === 'play'){
            setSongId(music.id)
            playSong(value)
        }else{
            sendMsg({
                type:'music',
                value,
            })
        }
        setIsLoading(false)

    }
    return (
        <>
            <Modal 
                hideCloseButton
                defaultOpen={true}
                onClose={onClose}
                classNames={{
                    base:'bg-transparent shadow-none'
                }}
            >
                <ModalContent> 
                    <ModalBody className="p-0 gap-0">
                        <Input autoFocus value={inputValue} onKeyDown={handleKeyDown} onChange={e=>setInputValue(e.target.value)} type="text" size="lg" />
                        <div className="text-sm mt-3 rounded-lg overflow-hidden bg-white">
                            <div onClick={handleClick} className="max-h-[50vh] overflow-auto cursor-pointer">
                                {
                                    musicList.map((item,index)=>(
                                        <div key={index} className="flex flex-row justify-between items-center p-2 hover:bg-slate-400 rounded-md">
                                            <div className="">
                                                <div className="t text-black">{item.name}{songId === item.id && <span className="ml-4 text-xs text-gray-800">{
                                                    isPlay ? '正在播放' : '正在加载'
                                                }</span>}</div>
                                                <div className="text-xs text-gray-600">{item.ar[0].name}</div>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <button data-type="play" data-music-index={index}>播放</button>
                                                <button data-type="send" data-music-index={index}>发送</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Loading isOpen={isLoading} label={loadingLabel} />
        </>
    )
}