import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import CliBox from './components/CliBox'


function App() {
  const [msgList, setMsgList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  const scrollInnerRef = useRef(null);
  const [isCli,setIsCli] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    console.log({ inputValue });
    setMsgList(list => list.concat({ 
      text: inputValue,
      avatar:'http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg',
      name:'Tom',
    }));
    setInputValue("");
  };

  const handleInputChange = ({target:{value}}) => {
    setIsCli(value.startsWith('>'))
    setInputValue(value)
  };

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollInnerRef.current.offsetHeight,
      behavior: "smooth",
    });
  }, [msgList]);

  return (
    <div className="h-screen bg-gray-200 flex flex-col flex-nowrap items-stretch">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div ref={scrollInnerRef}>
          {msgList.map((data, index) => (
            <Message data={data} align="left" key={index}></Message>
          ))}
        </div>
      </div>
      <div className="min-h-[50px] bg-blue-400 flex-none relative">
        {isCli && <CliBox value={inputValue}></CliBox>}
        <input
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
