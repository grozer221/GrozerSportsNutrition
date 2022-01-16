import {Query, Resolver} from '@nestjs/graphql';
import {Statistic} from './statistic.entity';
import {Roles} from '../roles/roles.decorators';
import {RoleName} from '../roles/role.entity';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {RolesGuard} from '../auth/guards/roles.guard';
import {AdminStatisticsService} from './admin.statistics.service';
import {OrderStatistics} from './order-statistics.entity';
import {ProfitStatistics} from './profit-statistics.entity';

@Resolver(() => Statistic)
export class AdminStatisticsResolver {
    constructor(private readonly adminStatisticsService: AdminStatisticsService) {
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [OrderStatistics])
    async getOrdersStatistics(): Promise<OrderStatistics[]> {
        return await this.adminStatisticsService.getOrdersStatistics();
    }

    @Roles(RoleName.moderator, RoleName.admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [ProfitStatistics])
    async getProfitStatistics(): Promise<ProfitStatistics[]> {
        return await this.adminStatisticsService.getProfitStatistics();
    }
}
