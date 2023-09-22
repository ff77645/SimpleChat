
import { useContext, useState } from "react"
import { GlobalContext } from "../../contexts/global"
import Music from "../../plugin/music"
import {PiPlaylist} from 'react-icons/pi'
import SongList from "../SongList"


export default function ChatHeader(){
    const [state] = useContext(GlobalContext)
    const musicHandler = Music.getInstance()
    const [showSongList,setShowSongList] = useState(false)

    return (
        <>
            <div className="h-[50px] bg-white flex flex-row items-center justify-between px-4">
                <div>房号:{state.roomData.roomNum}</div>
                <div className="flex flex-row gap-4 items-center">
                    <h2 
                        className="text-xl font-[500]" 
                    >
                        {state.roomData.roomName}
                    </h2>
                    <PiPlaylist onClick={()=>setShowSongList(!showSongList)} size={18}/>
                </div>
                <div>?</div>
            </div>
            {showSongList && <SongList/>}
            
        </>
    )
}