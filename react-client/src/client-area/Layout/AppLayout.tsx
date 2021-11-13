import React, {FC} from "react";
import {Link} from "react-router-dom";

export const AppLayout: FC = () => {
    return (
        <>
            <div>Client layout</div>
            <Link to={'/admin'}>AdminArea</Link>
        </>
    );
}
