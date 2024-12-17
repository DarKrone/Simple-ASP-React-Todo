import './App.css';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home /> } />
            </Routes>
        </HashRouter>
        )
}

export default App;