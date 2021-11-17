import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Error} from "../Error/Error";
import {ProductCreate} from "./ProductCreate/ProductCreate";
import {ProductsIndex} from "./ProductsIndex/ProductsIndex";

export const ProductsController: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProductsIndex/>}/>
            <Route path={'create'} element={<ProductCreate/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
}
