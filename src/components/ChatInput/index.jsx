import {forwardRef, useRef, useState} from 'react'
import EmojiModal from '../EmojiModal'
import {BsEmojiSmile,BsEmojiHeartEyes} from 'react-icons/bs'
import Command from '../Command'


function ChatInput({onSend},ref){
    const inputRef = useRef()
    const CommandRef = useRef(null)
    const [isOpenCmd,setIsOpenCmd] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isOpenEmoji,setIsOpenEmoji] = useState(false)
    
    const emojiConfirm = val =>{
        inputRef.current.focus()
        setInputValue(s=>s+val)
    }

    const handleKeyEnter = ()=>{
        if(isOpenCmd) return CommandRef.current.enter()
        onSend({ 
            type:'text',
            value: inputValue,
        })
        setInputValue("")
    }

    const handleInputChange = ({target:{value}}) => {
        setIsOpenCmd(value.startsWith('>'))
        setInputValue(value)
    }

    const onCommandClose = ()=>{
        setIsOpenCmd(false)
        setInputValue('')
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleKeyEnter()
        }else if(e.key === 'Escape'){
            isOpenCmd && setInputValue("");
            isOpenCmd ? setIsOpenCmd(false) : setIsOpenEmoji(!isOpenEmoji)
        }
        if(!isOpenCmd) return
        switch(e.key){
            case 'ArrowDown':
                CommandRef.current.arrowDown()
                e.preventDefault()
                break;
            case 'ArrowUp':
                CommandRef.current.arrowUp()
                e.preventDefault()
                break;
        }
    };

    return (
        <div className='pb-2'>
            <div className="h-[50px] flex-none relative w-1/2 mx-auto min-w-[500px]">
                { 
                    isOpenCmd ? <Command ref={CommandRef} onClose={onCommandClose} value={inputValue} /> : 
                        isOpenEmoji ? <EmojiModal onClose={()=>setIsOpenEmoji(false)} onConfirm={emojiConfirm}/> : ''
                }
                <div className='h-full flex flex-row flex-nowrap items-center rounded-lg overflow-hidden bg-white dark:bg-[#2f3542]'>
                    <input
                        ref={inputRef}
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder='输入 > 进入命令行模式'
                        className="w-full h-full outline-none resize-none box-border px-2 break-words dark:bg-[#2f3542] dark:text-white"
                    />
                    {
                        isOpenCmd || <div onClick={()=>setIsOpenEmoji(!isOpenEmoji)} className="p-3 cursor-pointer bg-slate-200 rounded-full mx-2 text-lg">
                                {isOpenEmoji ? <BsEmojiHeartEyes className='text-red-500' /> : <BsEmojiSmile className='text-gray-600' />}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default forwardRef(ChatInput)