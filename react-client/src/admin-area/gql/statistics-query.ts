import {gql} from '@apollo/client';
import {OrderStatistics, ProfitStatistics} from '../../types/types';

export type GetStatisticsData = {
    getOrdersStatistics: OrderStatistics[],
    getProfitStatistics: ProfitStatistics[]
}

export type GetStatisticsVars = {}

export const GET_STATISTICS_QUERY = gql`
    query GetStatistics {
        getOrdersStatistics {
            date
            ordersCount
        }
        getProfitStatistics {
            date
            totalPrice
        }
    }
`;
