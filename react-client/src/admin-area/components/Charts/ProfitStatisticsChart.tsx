import React, {FC} from 'react';
import {Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {ProfitStatistics} from '../../../types/types';
import s from './StatisticsChart.module.css';
import {Loading} from '../../../common-area/components/Loading/Loading';

type Props = {
    profitStatistics: ProfitStatistics[] | undefined,
    loading: boolean
}

export const ProfitStatisticsChart: FC<Props> = ({profitStatistics, loading}) => {
    return (
        <div className={s.chartWrapper}>
            {loading
                ? <Loading/>
                : <LineChart width={600} height={300} data={profitStatistics} syncId="ProfitStatisticsChart">
                    <Line type="monotone" dataKey="totalPrice" stroke="#ff7300"/>
                    <Tooltip/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                </LineChart>
            }
        </div>
    );
};
