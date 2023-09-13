import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import CommandBox from './components/CommandBox'
import {CommandContext} from './helper/context'
import {actionType} from './helper/action-type'
import ActionModal from "./components/ActionModal";

function App() {
  const [msgList, setMsgList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  const commandBoxRef = useRef(null)
  const [isCmd,setIsCmd] = useState(false)
  const [isOpen,setIsOpen] = useState(false)

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

  const onClose = ()=>{
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

  

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgList]);

  const commamdDispatch = action =>{
    console.log({action});
    setIsOpen(true)
  }
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
            <CommandBox ref={commandBoxRef} onClose={onClose} value={inputValue}></CommandBox>
          </CommandContext.Provider >
        }
        <ActionModal isOpen={isOpen} onOpenChange={setIsOpen}></ActionModal>
      </div>
      <div className="h-[50px] bg-blue-400 flex-none ">
        <input
          autoFocus
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
