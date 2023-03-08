import { Injectable } from '@nestjs/common';
import { Stock } from './stock.interface';
import { GlobalService } from 'src/utils/global.service'

@Injectable()
export class StockService {
    getLongShort(): string[] {
        return GlobalService.longShort;
    }

    getLong(): string[] {
        return GlobalService.long;
    }

    getShort(): string[] {
        return GlobalService.short;
    }

    getBotBars(): object[] {
        return GlobalService.bars;
    }

    // Create a funtion that will change the const list in long short constants
    setLongShort(stockDto: Stock): string[] {
        const newStocks = stockDto.stocks;
        GlobalService.longShort = newStocks;
        console.log(newStocks)
        return;
    }
}
