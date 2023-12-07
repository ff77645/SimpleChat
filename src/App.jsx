import { useEffect, useRef, useState,useContext } from "react";
import Message from "./components/Message";
import {actionType} from './components/Command/type'
// import SettingUserName from "./components/SettingUserName";
import {GlobalContext} from './contexts/global'
import ChatInput from './components/ChatInput'
import {ChatContext} from './contexts/chat'
import SettingUserData from "./components/SettingUserData";
import SendMusic from "./components/SendMusic";
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import Login from './components/Login'
import {io} from 'socket.io-client'
import {mergeChunksForArrayBuffer} from './utils'
import Music from "./plugin/music";
import ChatHeader from "./components/ChatHeader";
import {getUserInfo} from './api/index'
import toast from 'react-hot-toast'

const modals = {
  [actionType.SETTING_USER_DATA]:<SettingUserData/>,
  [actionType.SEND_MUSIC]:<SendMusic/>,
  [actionType.CREATE_ROOM]:<CreateRoom/>,
  [actionType.JOIN_ROOM]:<JoinRoom/>,
  [actionType.Login]:<Login/>
}


const initSocket = ()=>{
  const socket = io('http://localhost:3000/chat')
  socket.on('connect',()=>{
    console.log('socket connect,',socket.id);
  })
  return socket
}

const chunkMap = {}
const musicHandler = new Music()
function App() {
  const [msgList, setMsgList] = useState([]);
  const [state,dispatch] = useContext(GlobalContext)
  const scrollRef = useRef(null);
  const socket = useRef()

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

  const addSong = msg =>{
    musicHandler.addSong({
      ...msg.value,
      userId:msg.userId,
      avatar:msg.avatar,
      nickname:msg.nickname,
      date:msg.date,
    })
  }

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
    socket.current.emit('message',{
      roomid:state.roomData.roomId,
      value,
    })
    if(msg.type === 'music') {
      addSong(value)
    }
  }

  useEffect(()=>{
    const handler = initSocket()
    state.token && getUserInfo({
      token:state.token,
    }).then(res=>{
      console.log({res});
      if(!res.success) return
      dispatch('setUserData',res.data)
      dispatch('setToken',res.token)
      localStorage.setItem('token',res.token)
      toast.success('登录成功')
    })
    handler.on('message',data=>{
      if(data.type === 'image_chunk') return receiveImageChunk(data)
      if(data.type === 'music') addSong(data)
      setMsgList(list=>list.concat(data))
    })
    
    handler.on('connet',()=>{
      // 初始化进入公共频道
      socket.emit('join-room',state.roomData.roomId)
    })

    socket.current = handler
    return ()=>{
      socket.current.off()
    }
  },[])

  useEffect(()=>{
    socket.current.emit('leave-room',state.oldRoomId)
    socket.current.emit('join-room',state.roomData.roomId)
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
    <div className={`${state.theme} h-screen bg-gray-200`}>
      <ChatHeader/>
      <ChatContext.Provider value={sendMsg}>
        <div className="relative" style={{height:'calc(100vh - 100px)'}}>
          <div ref={scrollRef} className="overflow-y-auto h-full">
              {msgList.map((data, index) => (
                <Message data={data} align={data.userId === state.userData.id ? 'right' : 'left'} key={index}></Message>
              ))}
          </div>
        </div>
        {modals[state.modalName]}
        <ChatInput onSend={sendMsg}></ChatInput>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
