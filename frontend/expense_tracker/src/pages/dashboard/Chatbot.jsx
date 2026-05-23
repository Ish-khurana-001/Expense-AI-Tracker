import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPath'

const Chatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setSending(true)
    try {
      const res = await axiosInstance.post(API_PATHS.CHAT.SEND, { message: userMsg.text })
      const botReply = res.data?.reply || 'No response from AI';
      setMessages((m) => [...m, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { from: 'bot', text: 'Error contacting AI service' }]);
    } finally {
      setSending(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <DashboardLayout activeMenu="Chat">
      <div className='mx-auto my-6 max-w-3xl'>
        <h2 className='mb-4 text-2xl font-bold text-white'>AI Chat</h2>

        <div className='mb-4 rounded-lg border bg-slate-900 p-4 text-white'>
          {messages.length === 0 && (
            <div className='text-sm text-slate-400'>Ask anything about your finances or the app.</div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`mb-3 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2 ${m.from === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-2'>
          <textarea
            className='w-full resize-none rounded-md bg-slate-800 p-3 text-white'
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder='Type your message and press Enter to send'
          />
          <button
            className='rounded-md bg-fuchsia-500 px-4 py-2 text-white'
            onClick={sendMessage}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Chatbot
