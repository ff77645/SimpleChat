import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import CommandBox from './components/CommandBox'
import {CommandContext} from './helper/context'
import {actionType} from './helper/action-type'
import SettingUserName from "./components/SettingUserName";
import EmojiModal from "./components/EmojiModal";

function App() {

  const [msgList, setMsgList] = useState([]);
  
  
  // input 事件处理
  const [isCmd,setIsCmd] = useState(false)
  const commandBoxRef = useRef(null)
  const [inputValue, setInputValue] = useState("");

  const handleKeyEnter = ()=>{
    if(isCmd) return commandBoxRef.current.enter()
    setMsgList(list => list.concat({ 
      text: inputValue,
      avatar:'http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg',
      name:'Tom',
    }));
    setIsCmd(false)
    setInputValue("");
  }

  const handleInputChange = ({target:{value}}) => {
    setIsCmd(value.startsWith('>'))
    setInputValue(value)
  }

  const onCommandClose = ()=>{
    setIsCmd(false)
  }

  const handleKeyDown = (e) => {
    console.log(e.key);
    switch(e.key){
      case 'Enter':
        handleKeyEnter()
        break;
      case 'ArrowDown':
        e.preventDefault()
        commandBoxRef.current.arrowDown()
        break;
      case 'ArrowUp':
        e.preventDefault()
        commandBoxRef.current.arrowUp()
        break;
      case 'Escape':
        setIsCmd(false)
        setInputValue("");
        break;
    }
  };


  // Modal 管理
  const [isActionOpen,setIsActionOpen] = useState(false)
  const [modalState,setModalState] = useState({})
  const [isEmojiOpen,setIsEmojiOpen] = useState(false)
  const inputRef = useRef()

  const emojiConfirm = val =>{
    setInputValue(value=>value + val)
    inputRef.current.focus()
  }

  const actionConfirm = val =>{
    console.log({val});
    inputRef.current.focus()
  }


  // 指令处理
  const commamdDispatch = action =>{
    switch(action.action){
      case actionType.SETTING_NAME:
        setModalState({
          ...action,
          title:'设置用户名'
        })
        setIsActionOpen(true)
        break;
      case actionType.SEND_EMOJI:
        setIsEmojiOpen(true)
        break;
    }
    console.log({action});
  }



  
  // 消息监听滚动
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgList]);
  const scrollWrap = useRef()

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
      <div ref={scrollWrap} className="relative" style={{height:'calc(100vh - 100px)'}}>
        <div ref={scrollRef} className="overflow-y-auto h-full">
            {msgList.map((data, index) => (
              <Message data={data} align="left" key={index}></Message>
            ))}
        </div>
        {
          isCmd && <CommandContext.Provider value={commamdDispatch}>
            <CommandBox ref={commandBoxRef} onClose={onCommandClose} value={inputValue}></CommandBox>
          </CommandContext.Provider >
        }
        <SettingUserName></SettingUserName>
        {
          isEmojiOpen && <EmojiModal
              onClose={()=>setIsEmojiOpen(false)}
              onConfirm={emojiConfirm}
            ></EmojiModal>
        }
      </div>
      <div className="h-[50px] bg-blue-400 flex-none ">
        <input
          autoFocus
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          className="w-full h-full outline-none resize-none box-border px-2 break-words"
        />
      </div>
    </div>
  );
}

export default App;
