import { useEffect, useRef, useState,useContext } from "react";
import Message from "./components/Message";
import {actionType} from './components/Command/type'
import SettingUserName from "./components/SettingUserName";
import {GlobalContext} from './contexts/global'
import ChatInput from './components/ChatInput'
import {ChatContext} from './contexts/chat'
import SettingUserHead from "./components/SettingUserHead";
import SendMusic from "./components/SendMusic";
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import {io} from 'socket.io-client'

const modals = {
  [actionType.SETTING_USER_NAME]:<SettingUserName/>,
  [actionType.SETTING_HEAD]:<SettingUserHead/>,
  [actionType.SEND_MUSIC]:<SendMusic/>,
  [actionType.CREATE_ROOM]:<CreateRoom/>,
  [actionType.JOIN_ROOM]:<JoinRoom/>,
}

const roomData = {
  roomName:'公共频道',
  roomNumber:'',
}

const initSocket = ()=>{
  const socket = io('http://localhost:3000/chat')
  socket.on('connect',()=>{
    console.log('socket connect,',socket.id);
  })
  return socket
}


function App() {
  const [msgList, setMsgList] = useState([]);
  const [state] = useContext(GlobalContext)
  const scrollRef = useRef(null);
  const socket = useRef()


  const sendMsg = msg =>{
    console.log({msg});
    setMsgList(list => list.concat(msg));
  }

  useEffect(()=>{
    socket.current = initSocket()
    return ()=>{
      socket.current.off()
    }
  },[])
  
  // 消息监听滚动
  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgList]);

  return (
    <div className="h-screen bg-gray-200">
      <div className="h-[50px] bg-white flex flex-row items-center justify-between px-4">
        <div>房号:123</div>
        <h2 
          // suppressContentEditableWarning
          // contentEditable={true} 
          className="text-xl font-[500]" 
        >
          header
        </h2>
        <div>?</div>
      </div>
      <div className="relative" style={{height:'calc(100vh - 100px)'}}>
        <div ref={scrollRef} className="overflow-y-auto h-full">
            {msgList.map((data, index) => (
              <Message data={data} align="left" key={index}></Message>
            ))}
        </div>
      </div>
      <ChatContext.Provider value={sendMsg}>
        {modals[state.modalName]}
        <ChatInput onSend={sendMsg}></ChatInput>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
