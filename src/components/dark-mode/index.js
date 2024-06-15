import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import styles from './styles.module.css';
import { ThemeProvider } from './contexts/theme-context';


const DarkMode = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/blog' element={<Blog />}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default DarkMode;