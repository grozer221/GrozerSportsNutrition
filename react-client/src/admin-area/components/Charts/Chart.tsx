import React, {FC} from 'react';
import {Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

const data1 = [
    {date: 'Page A', orders: 0},
    {date: 'Page B', orders: 300},
    {date: 'Page C', orders: 300},
    {date: 'Page D', orders: 200},
    {date: 'Page E', orders: 278},
    {date: 'Page F', orders: 189},
];

export const Chart: FC = () => {
    return (
        <div className="line-charts">
            <LineChart width={1200} height={300} data={data1} syncId="test">
                <Line type="monotone" dataKey="orders" stroke="#ff7300"/>
                <Tooltip/>
                <XAxis dataKey="date"/>
                <YAxis/>
            </LineChart>
        </div>
    );
};
