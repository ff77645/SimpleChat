import { useEffect, useRef, useState,useContext, useCallback } from "react";
import Message from "./components/Message";
import {actionType} from './components/Command/type'
import {GlobalContext} from './contexts/global'
import ChatInput from './components/ChatInput'
import {ChatContext} from './contexts/chat'
import SettingUserData from "./components/SettingUserData";
import SendMusic from "./components/SendMusic";
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import Login from './components/Login'
import {mergeChunksForArrayBuffer} from './utils'
import Music from "./plugin/music";
import ChatHeader from "./components/ChatHeader";
import {getUserInfo} from './api/index'
import toast from 'react-hot-toast'
import Notice from "./helper/Notice";
import MusicList from "./components/MusicList";
import {useDocumentVisibility} from 'ahooks'
import { useSocketIo } from "./hooks";
import { BASE_URL } from "./config/config";

const modals = {
  [actionType.SETTING_USER_DATA]:<SettingUserData/>,
  [actionType.SEND_MUSIC]:<SendMusic/>,
  [actionType.CREATE_ROOM]:<CreateRoom/>,
  [actionType.JOIN_ROOM]:<JoinRoom/>,
  [actionType.Login]:<Login/>,
  [actionType.MUSIC_LIST]:<MusicList/>
}

const chunkMap = {}
const musicHandler = new Music()
const notice = new Notice()

function App() {
  const [msgList, setMsgList] = useState([]);
  const [state,dispatch] = useContext(GlobalContext)
  const scrollRef = useRef(null);
  const {socket} = useSocketIo(BASE_URL + '/chat')
  const documentVisibility = useDocumentVisibility()
  const [userAmount,setUserAmount] = useState(0)

  // 接受图片chunk
  const receiveImageChunk = msg =>{
    const chunk = msg.value
    console.log('接收',chunk);
    if(chunkMap[chunk.hash]){
      chunkMap[chunk.hash].push(chunk)
    }else{
      chunkMap[chunk.hash] = [chunk]
    }
    if(chunkMap[chunk.hash].length === chunk.chunks){
      const file = mergeChunksForArrayBuffer(chunkMap[chunk.hash],chunk.type)
      chunkMap[chunk.hash] = undefined
      msg.value = file
      msg.type = 'image'
      setMsgList(list=>list.concat(msg))
    }
  }

  // 添加音乐
  const addSong = msg =>{
    musicHandler.addSong({
      ...msg.value,
      userId:msg.userId,
      avatar:msg.avatar,
      nickname:msg.nickname,
      date:msg.date,
    })
  }

  // 发送消息
  const sendMsg = msg =>{
    // if(state.userData.id === undefined) return dispatch('setModalName',actionType.Login)
    const value = {
      ...msg,
      userId:state.userData.id,
      avatar:state.userData.avatar || 'http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg',
      gender:state.userData.gender,
      nickname:state.userData.nickname,
      date:new Date(),
    }
    setMsgList(list=>list.concat(value))
    if(msg.noSend) return 
    socket.emit('message',{
      roomid:state.roomData.roomId,
      value,
    })
    if(msg.type === 'music') {
      addSong(value)
    }
  }

  const initUserData = async ()=>{
    const res =  await getUserInfo({ token:state.token })
    console.log({res});
    if(!res.success) return
    dispatch('setUserData',res.data)
    dispatch('setToken',res.token)
    localStorage.setItem('token',res.token)
    toast.success('登录成功')
  }

  
  const receiveData = useCallback(data =>{
    console.log({data});
    if(data.type === 'image_chunk') return receiveImageChunk(data)
    if(data.type ==='music') addSong(data)
    setMsgList(list=>list.concat(data))
    if(documentVisibility!== 'visible') notice.show('你有新的消息!')
  },[])

  useEffect(()=>{
    // console.log('useEffect',socket.connected);
    state.token && initUserData()
    socket.on('message',data=>{
      console.log('msg 1',data);
      receiveData(data)
    })

    socket.on('join-room',data=>{
      console.log('join-room',data);
      setUserAmount(data.amount)
    })

    socket.on('leave-room',data=>{
      console.log('leave-room',data);
      setUserAmount(data.amount)
    })
    // 初始化进入公共频道
    socket.on('connet',()=>socket.emit('join-room',state.roomData.roomId))
    return ()=>{
      socket.off()
    }
  },[])

  useEffect(()=>{
    socket.emit('leave-room',state.oldRoomId)
    socket.emit('join-room',state.roomData.roomId)
    setMsgList([])
  },[state.roomData])
  
  // 消息监听滚动
  useEffect(() => {
    setTimeout(()=>{
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    },100)
  }, [msgList]);

  return (
    <div className={`${state.theme}`}>
      {modals[state.modalName]}
      <div className="h-screen bg-gray-200 dark:bg-[#747d8c] flex flex-col flex-nowrap overflow-hidden">
        <ChatHeader userAmount={userAmount}/>
        <ChatContext.Provider value={sendMsg}>
          <div className="relative flex-1 overflow-auto">
            <div ref={scrollRef} className="overflow-y-auto h-full">
                {msgList.map((data, index) => (
                  <Message data={data} align={data.userId === state.userData.id ? 'right' : 'left'} key={index}></Message>
                ))}
            </div>
          </div>
          <ChatInput onSend={sendMsg}></ChatInput>
        </ChatContext.Provider>
      </div>
    </div>
  );
}

export default App;
