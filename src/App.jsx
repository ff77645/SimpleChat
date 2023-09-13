import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import CommandBox from './components/CommandBox'
import {CommandContext} from './helper/context'
import {actionType} from './helper/action-type'
import ActionModal from "./components/ActionModal";

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



  // 指令处理
  const [isOpen,setIsOpen] = useState(false)
  const [modalState,setModalState] = useState({})
  const inputRef = useRef()

  const onOpenChange = val =>{
    setIsOpen(val)
    !val && inputRef.current.focus()
  }

  const commamdDispatch = action =>{
    console.log({action});
    setModalState({
      ...action,
      title:'设置用户名'
    })
    setIsOpen(true)
  }

  const actionConfirm = val =>{
    console.log({val});
  }

  
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
        <h2 className="text-xl font-[500]">header</h2>
      </div>
      <div className="relative" style={{height:'calc(100vh - 100px)'}}>
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
        <ActionModal 
          modalState={modalState}
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          onConfirm={actionConfirm}
        ></ActionModal>
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
