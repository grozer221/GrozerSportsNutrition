import React from 'react';
import s from './MyMenu.module.css';
import {Link} from 'react-router-dom';

export const MyMenu = () => {
    return (
        <div className={s.menu}>
            <Link to={'/products'} className={s.menuItem}>Products</Link>
            <Link to={'/categories'} className={s.menuItem}>Categories</Link>
        </div>
    );
};
