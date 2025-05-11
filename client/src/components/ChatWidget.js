import React, { useState, useRef, useEffect } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const API_URL = 'https://fleetview-backend.onrender.com/api/assistant/chat';

const ChatWidget = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hi! I am your FleetView AI assistant. Ask me anything about your vehicles.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    if (!user) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();
            setMessages([...newMessages, { sender: 'ai', text: data.response || data.error || 'Sorry, I could not get a response.' }]);
        } catch (err) {
            setMessages([...newMessages, { sender: 'ai', text: 'Error contacting AI agent.' }]);
        }
        setLoading(false);
    };

    return (
        <>
            {/* Floating chat button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                        zIndex: 1000,
                        background: '#222',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: 60,
                        height: 60,
                        fontSize: 32,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                    }}
                    aria-label="Open chat"
                >
                    <ChatBubbleOutlineIcon style={{ fontSize: 32 }} />
                </button>
            )}
            {/* Chat window */}
            {open && (
                <div style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    width: 350,
                    maxWidth: '95vw',
                    height: 480,
                    background: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                    zIndex: 1001,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        background: '#222',
                        color: '#fff',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        padding: '16px 20px',
                        fontWeight: 600,
                        fontSize: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        FleetView AI
                        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}>&times;</button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f7f7f7' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{
                                marginBottom: 12,
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: msg.sender === 'user' ? '#222' : '#e0e0e0',
                                    color: msg.sender === 'user' ? '#fff' : '#222',
                                    borderRadius: 12,
                                    padding: '8px 14px',
                                    maxWidth: '80%',
                                    fontSize: 15,
                                    wordBreak: 'break-word',
                                }}>{msg.text}</span>
                            </div>
                        ))}
                        {/* Typing indicator */}
                        {loading && (
                            <div style={{ marginBottom: 12, textAlign: 'left' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: '#e0e0e0',
                                    color: '#222',
                                    borderRadius: 12,
                                    padding: '8px 14px',
                                    maxWidth: '80%',
                                    fontSize: 15,
                                    wordBreak: 'break-word',
                                }}>
                                    <span style={{ display: 'inline-block', width: 32 }}>
                                        <span className="chat-bounce-dot" style={{
                                            display: 'inline-block',
                                            width: 6,
                                            height: 6,
                                            background: '#888',
                                            borderRadius: '50%',
                                            margin: '0 2px',
                                            animation: 'chat-bounce 1.2s infinite',
                                            animationDelay: '0s',
                                        }} />
                                        <span className="chat-bounce-dot" style={{
                                            display: 'inline-block',
                                            width: 6,
                                            height: 6,
                                            background: '#888',
                                            borderRadius: '50%',
                                            margin: '0 2px',
                                            animation: 'chat-bounce 1.2s infinite',
                                            animationDelay: '0.2s',
                                        }} />
                                        <span className="chat-bounce-dot" style={{
                                            display: 'inline-block',
                                            width: 6,
                                            height: 6,
                                            background: '#888',
                                            borderRadius: '50%',
                                            margin: '0 2px',
                                            animation: 'chat-bounce 1.2s infinite',
                                            animationDelay: '0.4s',
                                        }} />
                                    </span>
                                </span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form
                        onSubmit={handleSend}
                        style={{
                            display: 'flex',
                            borderTop: '1px solid #eee',
                            background: '#fff',
                            borderRadius: '0 0 16px 16px',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about your vehicles..."
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                margin: 0,
                                padding: '0 0 0 16px',
                                fontSize: 15,
                                borderRadius: '0 0 0 16px',
                                height: 56,
                                background: '#fff',
                                boxShadow: 'none',
                                display: 'block',
                            }}
                            disabled={loading}
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            style={{
                                background: '#222',
                                color: '#fff',
                                border: 'none',
                                outline: 'none',
                                margin: 0,
                                padding: '0 18px',
                                fontSize: 16,
                                borderRadius: '0 0 16px 0',
                                height: 56,
                                boxShadow: 'none',
                                display: 'block',
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? '...' : 'Send'}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ChatWidget; 