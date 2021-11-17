import React, {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";

export const ClientLayout: FC = () => {
    return (
        <>
            <Link to={'/admin'}>AdminArea</Link>
            <Routes>
                <Route path={'/'} element={<div>client layout</div>}/>
                <Route path={'users/*'} element={<Users/>}/>
                <Route path={'*'} element={<div>Client Error</div>}/>
            </Routes>
        </>
    );
}


const Users: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<div>client users</div>}/>
            <Route path={':id'} element={<div>client user</div>}/>
        </Routes>
    )
}
