
/*
 * Author: Alexander Berryhill
 * 
 * This file defines the routes for the stock controller.
 * This is a simple NestJS controller that defines several HTTP endpoints 
 * to interact with a StockService. It defines an HTTP GET endpoint to get 
 * the long and short stocks, an HTTP GET endpoint to get the long stocks, 
 * an HTTP GET endpoint to get the short stocks, and an HTTP GET endpoint 
 * to get the bot bars. It also defines an HTTP POST endpoint to set the 
 * long and short stocks. The @Get and @Post decorators are used to define 
 * the HTTP method and route for each endpoint, respectively. The @Body 
 * decorator is used to extract the request body, which is passed to the 
 * StockService to perform the corresponding action.
 */

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { StockDto } from "./stock.dto";
import { StockService } from "./stock.service";

// Define the route prefix for this controller
@Controller('/api/v1/stock')
export class StockController {
    constructor(
        private readonly stockService: StockService, // Inject StockService
    ) { }

    // Define an HTTP GET route to get the long and short stocks
    @Get('/getLongShort')
    getLongShort(): string[] {
        return this.stockService.getLongShort();
    }

    // Define an HTTP GET route to get the long stocks
    @Get('/getLong')
    getLong(): string[] {
        return this.stockService.getLong();
    }

    // Define an HTTP GET route to get the short stocks
    @Get('/getShort')
    getShort(): string[] {
        return this.stockService.getShort();
    }

    // Define an HTTP GET route to get the bot bars
    @Get('/getBotBars')
    getBotBars(): object[] {
        return this.stockService.getBotBars();
    }

    // Define an HTTP POST route to set the long and short stocks
    @Post('/setLongShort')
    setLongShort(@Body() stockDto: StockDto): string[]{
        return this.stockService.setLongShort(stockDto);
    }
}
