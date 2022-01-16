import React, {FC} from 'react';
import {Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {OrderStatistics} from '../../../types/types';
import s from './StatisticsChart.module.css';
import {Loading} from '../../../common-area/components/Loading/Loading';

type Props = {
    ordersStatistics: OrderStatistics[] | undefined,
    loading: boolean
}

export const OrdersStatisticsChart: FC<Props> = ({ordersStatistics, loading}) => {
    return (
        <div className={s.chartWrapper}>
            {loading
                ? <Loading/>
                : <LineChart width={600} height={300} data={ordersStatistics} syncId="OrdersStatisticsChart">
                    <Line type="monotone" dataKey="ordersCount" stroke="#ff7300"/>
                    <Tooltip/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                </LineChart>
            }
        </div>
    );
};
