import { Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Input} from "@nextui-org/react";
import { useContext, useEffect, useRef, useState,useCallback } from "react";
import {GlobalContext} from '../../contexts/global'
import toast from "react-hot-toast";
import Music from '../../plugin/music';
import {Howler} from 'howler'
import {HiOutlinePlay,HiOutlinePause} from 'react-icons/hi'





export default function MusicList(){
    const [_,dispatch] = useContext(GlobalContext)
    const musicHandler = Music.getInstance()
    const songList = Array.from(musicHandler.songList)
    const [songId,setSongId] = useState(musicHandler.song ? musicHandler.song.id : '')
    let currentSong = useRef()

    const [isPlaying,setIsPlaying] = useState(()=>{
        return musicHandler.song ? musicHandler.song.sound.playing() : false
    })

    const onClose = ()=>{
        dispatch('setModalName','')
    }

    const songChange = useCallback(song=>{
        setSongId(song.id)
        currentSong.current = song
        setIsPlaying(true)
    },[])

    const setPausePlay = useCallback(()=>{
        setIsPlaying(false)
    },[])

    const handlePlay = id =>{
        if(currentSong.current && currentSong.current.id === id && currentSong.current.sound){
            currentSong.current.sound.play()
        }else{
            const song = musicHandler.playSong({id})
            currentSong.current && currentSong.current.id !== id && Howler.stop()
            if(!song.sound){
                const {sound} = musicHandler.getSound({id})
                sound.load()
            }else{
                song.sound.play()
            }
        }
    }

    const handlePause = ()=>{
        currentSong.current?.sound.pause()
    }

    useEffect(()=>{
        musicHandler.on('play',songChange)
        musicHandler.on('pause',setPausePlay)
        musicHandler.on('stop',setPausePlay)
        return ()=>{
            musicHandler.off('play',songChange)
            musicHandler.off('pause',setPausePlay)
            musicHandler.off('stop',setPausePlay)
        }
    },[])


    return (
        <Modal 
            hideCloseButton
            defaultOpen={true}
            onClose={onClose}
        >
            <ModalContent> 
                <ModalBody>
                    <div className="shadow-gray-600/60 shadow">
                        <ul className="animate-height-stretch bg-black/20 rounded-md">
                            {
                                songList.map((item,index)=>(
                                    <li key={index} className='flex flex-row flex-nowrap items-center justify-between text-sm p-2 cursor-pointer hover:bg-gray-600/20 rounded'>
                                        <div className="">
                                            <div className="">{item.name}</div>
                                            <div className="text-xs">3:42</div>
                                        </div>
                                        <div className="">
                                            {
                                                isPlaying && songId === item.id ? <HiOutlinePause onClick={handlePause} className='' size={20} /> : <HiOutlinePlay  onClick={()=>handlePlay(item.id)} className='' size={20} />
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}