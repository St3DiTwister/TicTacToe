require('./bootstrap');
import React from 'react';
import ReactDOM from "react-dom";
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Game from "./components/Game";
import Home from "./components/Home";
import Messenger from "./components/Messenger";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/messenger" element={<Messenger/>} />
                <Route path="/private/:privateId" element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

if (document.getElementById('react_app')) {
    ReactDOM.render(<App />, document.getElementById('react_app'));
}
