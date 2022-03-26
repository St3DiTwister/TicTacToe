import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

const Messenger = (props) => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] =useState('');

    useEffect(() => {
        window.Echo.channel('game').listen('MessageEvent', ({message}) => {
            setMessages((prev)=>[...prev, message]);
        });
    }, []);

    const sendMessage = () => {
        axios.post('/messages', {body: value});
        setMessages([...messages, value])
        setValue('');
    }
    return (
        <div className="container">
            <div className="col-sm-12">
                <textarea className="form-control" rows="10" readOnly={true} value={
                    messages.join('\n')
                }>
                </textarea>
                <hr/>
                <input type="text" className="form-control" value={value} onChange={event => setValue(event.target.value)}/>
                <button type="button" onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Messenger;
