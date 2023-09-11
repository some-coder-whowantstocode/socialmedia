import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    <App />
    </HashRouter>
);

/*
did {
    remove chat not completely only from one side does not mean that they are permanently deleted
}
todo{
    delete messages individually 
    if all the users removed the chat make it deleted permanently
    
}
*/