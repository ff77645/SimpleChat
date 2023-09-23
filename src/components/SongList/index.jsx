
import {Listbox,ListboxItem} from '@nextui-org/react'
import {HiOutlinePlay} from 'react-icons/hi'
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { BsFillPauseCircleFill,BsFillPlayCircleFill } from "react-icons/bs";
import Music from '../../plugin/music';


export default function SongList(){
    const musicHandler = Music.getInstance()
    const songList = Array.from(musicHandler.songList)

    return (
        <div 
            className="fixed overflow-auto top-[60px] right-[150px] w-80 z-10 rounded-md"
            style={{
                maxHeight:'calc(100vh - 120px)'
            }}
        >   
            <div className="flex flex-row items-center justify-around py-2 bg-black/20 rounded shadow-gray-600/60 shadow">
                <ImArrowLeft2 className="text-xl cursor-pointer" />
                <BsFillPlayCircleFill className="text-xl cursor-pointer" />
                <ImArrowRight2 className="text-xl cursor-pointer" />
            </div>
            <div className="mt-2 shadow-gray-600/60 shadow">
                <ul className="animate-height-stretch bg-black/20">
                    {
                        songList.map((item,index)=>(
                            <li key={index} className='flex flex-row flex-nowrap items-center justify-between text-sm p-2 cursor-pointer hover:bg-gray-600/20 rounded'>
                                <div className="">
                                    <div className="">爱 - 小虎队</div>
                                    <div className="text-xs">3:42</div>
                                </div>
                                <div className="">
                                    <HiOutlinePlay className='' size={20} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}