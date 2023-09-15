import { useEffect, useRef, useState,useContext } from "react";
import Message from "./components/Message";
import {actionType} from './helper/action-type'
import SettingUserName from "./components/SettingUserName";
import {GlobalContext} from './contexts/global'
import ChatInput from './components/ChatInput'

const modals = {
  [actionType.SETTING_USER_NAME]:<SettingUserName></SettingUserName>
}


function App() {
  const [msgList, setMsgList] = useState([]);
  const [state] = useContext(GlobalContext)
  
  // input 事件处理
  



  
  // 消息监听滚动
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgList]);

  return (
    <div className="h-screen bg-gray-200">
      <div className="h-[50px] text-center bg-white flex flex-row items-center justify-center">
        <h2 
          // suppressContentEditableWarning
          // contentEditable={true} 
          className="text-xl font-[500]"
        >
          header
        </h2>
      </div>
      <div className="relative" style={{height:'calc(100vh - 100px)'}}>
        <div ref={scrollRef} className="overflow-y-auto h-full">
            {msgList.map((data, index) => (
              <Message data={data} align="left" key={index}></Message>
            ))}
        </div>
        {modals[state.modalName]}
      </div>
      <ChatInput></ChatInput>
    </div>
  );
}

export default App;
