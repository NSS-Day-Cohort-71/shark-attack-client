import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../views/Login.jsx"
import { Register } from '../views/Register.jsx'
import SharkAttack from '../SharkAttack.jsx'
import { ProductList } from '../views/ProductList.jsx'


export const ApplicationViews = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Authorized />}>
                <Route path="/" element={ <SharkAttack /> } />
                <Route path="/products" element={ <ProductList /> } />
            </Route>

        </Routes>
    </BrowserRouter>
}