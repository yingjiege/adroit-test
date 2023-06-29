import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import LoginPage from './login/LoginPage'
import RegisterPage from './login/RegisterPage'
import ForgetPasswordPage from './login/ForgetPasswordPage'
import HomePage from './HomePage'
import Report from './report/Report'
import AccountSetting from './profile/AccountSetting'
import Navbar from './navbar/Navbar.jsx'
import Toggle from './shop/Toggle'
import CheckOut from './shop/checkout/CreateOrder'
import OrderCompleted from './shop/orderComplete/orderCompleted'

import '../App.css'
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
    return (
        <Router>
            <div>
            <Navbar/>
                <Routes>
                    <Route path="/:userid" element={<HomePage/>}/>
                    <Route path="/" element={ <LandingPage/> } />
                    <Route path="/login" element={ <LoginPage/> } />
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path="/forget-password" element={ <ForgetPasswordPage/> } />
                    <Route path="/home" element={ <HomePage/> } />
                    <Route path="/report" element={ <Report/> } />
                    <Route path="/account-setting" element={ <AccountSetting/> } />
                    <Route path="/shop" element={ <Toggle/> } />
                    <Route path="/cart" element={<CheckOut/>}/>
                    <Route path="/ordercompleted" element={<OrderCompleted/>}/>
                </Routes>
            </div>
        </Router>
    )
};