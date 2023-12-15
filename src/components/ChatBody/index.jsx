import { useRef,useEffect } from "react"
import Message from "../Message";

export default function ChatBody({msgList,userData}){
  const scrollRef = useRef(null)
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
    <div className="relative flex-1 overflow-auto">
      <div ref={scrollRef} className="overflow-y-auto h-full">
          {msgList.map((data, index) => (
            <Message data={data} align={data.userId === userData.id ? 'right' : 'left'} key={index}></Message>
          ))}
      </div>
    </div>
  )
}