import React, { useEffect, useRef, useState } from 'react';
import mainLogo from'./assets/defog.png';
import './App.css';
import {Box, Button, styled, TextField, CircularProgress, Typography} from "@mui/material";
import messageOutput from "./messageOutput";

function App() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [chatInput, setChatInput] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<null | HTMLDivElement>(null);

    const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(event.target.value);
    };

    const handleSendClickLive = () => {
        const newMessage = messageOutput;
        let i = 0;
        setIsLoading(true);
        const loadIntervalId = setInterval(() => {
            setIsLoading(false);
            clearInterval(loadIntervalId);
            setMessage('');
            const intervalId = setInterval(() => {
                if (i < newMessage.length) {
                    setMessage(prevMessage => prevMessage + newMessage[i]);
                    i++;
                } else {
                    clearInterval(intervalId);
                }
            }, 10);
        }, 3000);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]); // Call scrollIntoView whenever the message state variable changes

    return (
        <div className="App">
            <div className="header">
                <img className="frogIcon" src={mainLogo} alt="DefogTheLog"/>
                <Typography variant="h2" component="h2" fontFamily="Nunito">
                    Defog The Log
                </Typography>
            </div>
            <Box
                component="form"
                className="messageDisplay"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Chat"
                    multiline
                    minRows={15}
                    style={{width: '70rem'}}
                    value={message}
                    InputProps={{
                        readOnly: true
                    }}>
                </TextField>
            </Box>
            <div className="TextInputBox">
                <TextField
                    className="ChatInput"
                    label="Ask a question..."
                    variant="outlined"
                    value={chatInput}
                    onChange={handleChatInputChange}
                    style={{width: '50rem'}}
                />
                <Button variant="contained" disabled={chatInput === ''} onClick={handleSendClickLive}>Send</Button>
                {isLoading && <CircularProgress  />}
            </div>
        </div>
    );
}

export default App;