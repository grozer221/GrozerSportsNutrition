import React, {FC} from "react";
import {Link} from "react-router-dom";
import s from './Users.module.css';

export const Users: FC = () => {
    return (
        <>
            <div>Users</div>
            <Link to={'/'}>home</Link>
        </>
    );
}
