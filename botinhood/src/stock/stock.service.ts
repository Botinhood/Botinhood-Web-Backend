/*
 * Author: Alexander Berryhill
 * 
 * This code defines a StockService class that provides methods for 
 * getting and setting the stock data. It imports Stock interface 
 * and GlobalService, which has some constants that store stock data. 
 * The StockService has several methods including getLongShort(), 
 * getLong(), getShort(), and getBotBars() that return various stock 
 * data. The setLongShort() method takes a Stock object, extracts the 
 * stocks from it, and sets the longShort constant in the GlobalService 
 * to the new list of stocks.
 */

import { Injectable } from '@nestjs/common';
import { Stock } from './stock.interface';
import { GlobalService } from 'src/utils/global.service'

@Injectable()
export class StockService {
    // Returns the long-short stocks list
    getLongShort(): string[] {
        return GlobalService.longShort;
    }

    // Returns the long-only stocks list
    getLong(): string[] {
        return GlobalService.long;
    }

    // Returns the short-only stocks list
    getShort(): string[] {
        return GlobalService.short;
    }

    // Returns the bar data for bot
    getBotBars(): object[] {
        return GlobalService.bars;
    }

    // Sets the long-short stocks list to the given list
    getQuantity(): object {
        return GlobalService.quantity;
    }

    // Create a funtion that will change the const list in long short constants
    setLongShort(stockDto: Stock): string[] {
        const newStocks = stockDto.stocks;
        GlobalService.longShort = newStocks;
        console.log(newStocks)
        return;
    }
}
