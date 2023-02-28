import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BotModule } from './bot/bot.module'
import { ConfigModule } from '@nestjs/config'
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';

@Module({
  imports: [ConfigModule.forRoot(), BotModule],
  controllers: [AppController, StockController],
  providers: [AppService, StockService],
})
export class AppModule {}
