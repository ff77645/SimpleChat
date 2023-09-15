import {forwardRef, useRef, useState} from 'react'
import EmojiModal from '../EmojiModal'
import {BsEmojiSmile,BsEmojiHeartEyes} from 'react-icons/bs'
import Command from '../Command'


function ChatInput({onKeyDown,...props},ref){
    const [isOpenEmoji,setIsOpenEmoji] = useState(true)


    const onConfirm = val =>{
        props.onChange({target:{value:props.value + val}})
        ref.current.focus()
    }

    // const handleKeyDown = e =>{
    //     if(e.key === 'Escape') setIsOpenEmoji(!isOpenEmoji)
    //     onKeyDown(e)
    // }

    const [isOpenCmd,setIsOpenCmd] = useState(false)
    const CommandRef = useRef(null)
    const [inputValue, setInputValue] = useState("");

    const handleKeyEnter = ()=>{
        if(isOpenCmd) return CommandRef.current.enter()
        setMsgList(list => list.concat({ 
            text: inputValue,
            avatar:'http://pic.yupoo.com/isfy666/ca92284b/96330991.jpeg',
            name:'Tom',
        }));
        setIsOpenCmd(false)
        setInputValue("");
    }

    const handleInputChange = ({target:{value}}) => {
        setIsOpenCmd(value.startsWith('>'))
        setInputValue(value)
    }

    const onCommandClose = ()=>{
        setIsOpenCmd(false)
    }

    const handleKeyDown = (e) => {
        switch(e.key){
            case 'Enter':
                handleKeyEnter()
                break;
            case 'ArrowDown':
                e.preventDefault()
                CommandRef.current.arrowDown()
                break;
            case 'ArrowUp':
                e.preventDefault()
                CommandRef.current.arrowUp()
                break;
            case 'Escape':
                setIsOpenCmd(false)
                isOpenCmd && setInputValue("");
                break;
        }
    };

    return (
        <div className="h-[50px] flex-none relative w-1/2 mx-auto">
            { isOpenEmoji && <EmojiModal onClose={()=>setIsOpenEmoji(false)} onConfirm={onConfirm}></EmojiModal>}
            { isOpenCmd && <Command ref={CommandRef} onClose={onCommandClose} value={inputValue}></Command>}
            <div className='h-full flex flex-row flex-nowrap items-center rounded-lg overflow-hidden bg-white'>
                <input
                    {...props}
                    autoFocus
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="w-full h-full outline-none resize-none box-border px-2 break-words"
                />
                <div onClick={()=>setIsOpenEmoji(!isOpenEmoji)} className="p-3 cursor-pointer bg-slate-200 rounded-full mr-4 text-lg">
                    {isOpenEmoji ? <BsEmojiHeartEyes className='text-red-500' /> : <BsEmojiSmile className='text-gray-600' />}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(ChatInput)