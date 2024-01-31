import { Fab } from '@mui/material'
import { IoChatboxEllipses } from 'react-icons/io5'
import { IoSend } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Message } from '../../interfaces/Message'
import { useAppSelector } from '../../redux/hooks'
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { v4 as uuid } from 'uuid'
import { ChatBoxProps } from './ChatBoxTypes'

import './ChatBox.scss'

const ChatBox = ({ project }: ChatBoxProps) => {
  const [value, setValue] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [visible, setVisible] = useState<boolean>(true)

  const auth = useAppSelector((state) => state.auth)

  const handleToggleVisible = () => {
    setVisible((state) => !state)
  }

  const handleSendMessage = async () => {
    if (value.length === 0) return
    const chatsRef = doc(db, 'chats', project.id)
    const newMessage = {
      id: uuid(),
      content: value,
      author: auth.email,
      date: Timestamp.now(),
    }

    try {
      await updateDoc(chatsRef, {
        messages: arrayUnion(newMessage),
      })
      setValue('')
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', project.id), (doc) => {
      setMessages(doc.data()!.messages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <div className={visible ? 'chat-box chat-open' : 'chat-box'}>
        <div className='title'>
          <p>Group chat</p>
        </div>
        <div className='messages'>
          {messages.map((message) => (
            <div
              className={
                message.author === auth.email ? 'bubble my-message' : 'bubble'
              }
              key={message.id}
            >
              <p className='author'>{message.author}</p>
              <p className='content'>{message.content}</p>
            </div>
          ))}
        </div>
        <div className='input'>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type here...'
          />
          <button onClick={handleSendMessage}>
            <IoSend size={18} />
          </button>
        </div>
      </div>
      <div className='chat-button'>
        <Fab color='primary' aria-label='add' onClick={handleToggleVisible}>
          <IoChatboxEllipses size={22} />
        </Fab>
      </div>
    </>
  )
}

export default ChatBox
