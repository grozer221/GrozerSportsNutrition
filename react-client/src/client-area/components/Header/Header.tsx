import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {s_getTotalPrice} from '../../../redux/basket.selectors';

export const Header = () => {
    const totalPrice = useSelector(s_getTotalPrice);

    return (
        <div className={s.header}>
            <Link to={'/'}>
                <h1 className={s.logo}>
                    <div className={s.grozer}>Grozer</div>
                    <div>Sports Nutrition</div>
                </h1>
            </Link>
            <div className={s.search}>
                <input type="text" placeholder={'Search'}/>
            </div>
            <div className={s.phoneNumber}>
                <h3>(099) 999-99-99</h3>
                <div>Free in Ukraine</div>
            </div>
            <Link to={'/basket'} className={s.basket}>
                <div className={s.basketPrice}>{totalPrice} UAH</div>
            </Link>
        </div>
    );
};
