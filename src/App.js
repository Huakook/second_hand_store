import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Bar from './Bar';
import Home from './Home';
import Cart from './Cart';
import MyOrder from './MyOrder';
import MyShop from './MyShop';
import AccountInfo from './AccountInfo';
import Chat from './Chat';

function App() {
    return (
        <div>
            <Bar/>
            <Routes>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Cart' element={<Cart/>}/>
                <Route path='/MyOrder' element={<MyOrder/>}/>
                <Route path='/MyShop' element={<MyShop/>}/>
                <Route path='/AccountInfo' element={<AccountInfo/>}/>
                <Route path='/Chat' element={<Chat/>}/>
            </Routes>
        </div>

    );    
}

export default App;