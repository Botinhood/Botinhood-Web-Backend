import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { StockDto } from "./stock.dto";
import { StockService } from "./stock.service";
// import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/stock')
export class StockController {
    constructor(
        private readonly stockService: StockService,
        // private jwtService: JwtService
    ) { }

    @Get('/getLongShort')
    getLongShort(): string[] {
        return this.stockService.getLongShort();
    }

    @Get('/getLong')
    getLong(): string[] {
        return this.stockService.getLong();
    }

    @Get('/getShort')
    getShort(): string[] {
        return this.stockService.getShort();
    }

    @Get('/getBotBars')
    getBotBars(): object[] {
        return this.stockService.getBotBars();
    }

    @Get('/getQuantity')
    getQuantity(): object {
        return this.stockService.getQuantity();
    }

    @Post('/setLongShort')
    setLongShort(@Body() stockDto: StockDto): string[]{
        return this.stockService.setLongShort(stockDto);
    }

    // async Signup(@Res() response, @Body() user: User) {
    //     const newUSer = await this.stockService.signup(user);
    //     return response.status(HttpStatus.CREATED).json({
    //         newUSer
    //     })
    // }
    // @Post('/signin')
    // async SignIn(@Res() response, @Body() user: User) {
    //     const token = await this.stockService.signin(user, this.jwtService);
    //     return response.status(HttpStatus.OK).json(token)
    // }
}