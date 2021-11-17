import React, {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {Error} from "../Error/Error";
import { CategoriesIndex } from "./CategoriesIndex/CategoriesIndex";

export const CategoriesController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<CategoriesIndex/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
}
