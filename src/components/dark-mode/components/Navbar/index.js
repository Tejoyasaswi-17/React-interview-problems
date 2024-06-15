import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useTheme } from '../../contexts/theme-context';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className={styles.navbar}>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/blog'>Blog</Link>
            </div>
            <div className={styles.mode_switch}>
                <label>
                    <input type='checkbox' onChange={toggleTheme} checked={theme === 'dark'} />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
        </nav>
    );
};

export default Navbar;