import React, {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {UsersIndex} from "./UsersIndex";
import {Error} from "../Error/Error";

export const UsersController: FC = () => {
    console.log('UsersController')
    return (
        <Routes>
            <Route path={'/'} element={<UsersIndex/>}/>
            <Route path={':id'} element={<div>user</div>}/>
            <Route path={'add'} element={<div>add user</div>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
}
