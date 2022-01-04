import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Button, Result} from 'antd';

export const Error: FC = () => {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to={'/admin'}>
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </>
    );
};
