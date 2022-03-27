import React, {useEffect, useState} from 'react';

import "./css/Messenger.css";
const Messenger = (props) => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] =useState('');

    useEffect(() => {
        window.Echo.channel('tictactoe').listen('MessageEvent', ({message}) => {
            setMessages((prev)=>[...prev, message]);
        });
    }, []);

    const sendMessage = () => {
        if (props.gameStart === null){
            return null
        }
        axios.post('/messages', {body: props.isCreator ? "X: "+value : "O: "+value});
        setMessages([...messages, value])
        setValue('');
    }
    const onKeyDown = e => {
        if (e.key === 'Enter'){
            sendMessage();
        }
    }
    return (
        <div className="container">
            <div className="col-sm-12">
                <textarea className="input_style" id="textInArea" rows="10" readOnly={true} value={
                    messages.join('\n')
                }>
                </textarea>

                <div className="input_style">
                    <input className="" type="text" placeholder="Введите сообщение" onKeyDown={onKeyDown} value={value} onChange={event => setValue(event.target.value)} />
                    <button type="button" onClick={sendMessage}>></button>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
