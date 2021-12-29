import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesResolver } from './pages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page]),
  ],
  providers: [
    PagesResolver,
    PagesService,
  ],
})
export class PagesModule {
}
