
import { useContext, useState } from "react"
import { GlobalContext } from "../../contexts/global"
import Music from "../../plugin/music"
import {PiPlaylist} from 'react-icons/pi'
import { CiDark,CiLight  } from "react-icons/ci"
import SongList from "../SongList"


export default function ChatHeader({userAmount}){
    const [state,dispatch] = useContext(GlobalContext)
    const musicHandler = Music.getInstance()
    const [showSongList,setShowSongList] = useState(false)
    const toggleTheme = () => {
        dispatch('setTheme',state.theme==='dark'?'':'dark')
    }

    return (
        <>
            <div className="h-[50px] bg-white flex-none dark:bg-[#2f3542] dark:text-white flex flex-row items-center justify-between px-4">
                <div>房号:{state.roomData.roomNum}</div>
                <div className="flex flex-row gap-4 items-center">
                    <h2 
                        className="text-xl font-[500]" 
                    >
                        {state.roomData.roomName}
                        <span className="text-sm ml-1">( {userAmount} 人)</span>
                    </h2>
                </div>
                <div onClick={toggleTheme} className="cursor-pointer text-2xl">
                    {state.theme === 'dark' ? <CiDark/> : <CiLight />}
                </div>
            </div>
            {showSongList && <SongList/>}
        </>
    )
}