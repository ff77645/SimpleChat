import {io} from 'socket.io-client'
import {useRef, useState} from 'react'

export const ReadyState = {
  Connecting:0,
  Open:1,
  Closing:2,
  Closed:3,
}

export function useSocketIo(url, options) {
  const socketRef = useRef(null)
  const [readyState,setReadyState] = useState(ReadyState.Connecting)
  if (!socketRef.current) {
    const socket = io(url, options)
    socketRef.current = socket
    socket.on('connect', () => {
      setReadyState(ReadyState.Open)
    })
    socket.on('disconnect', () => {
      setReadyState(ReadyState.Closed)
    })
  }
  return {
    socket: socketRef.current,
    readyState,
  }
}