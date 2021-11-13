import React, {FC} from "react";
import {Link} from "react-router-dom";
import s from './Error.module.css';

export const Error: FC = () => {
    return (
        <>
            <div>Error</div>
            <Link to={'/'}>Go home</Link>
        </>
    );
};
