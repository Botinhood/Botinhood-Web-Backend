import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { User } from "../schema/user.schema";
import { UserService } from "./user.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        const newUser = await this.userService.create(createUserDto);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }

    @Get()
    async fetchAll(@Res() response) {
        const users = await this.userService.readAll();
        return response.status(HttpStatus.OK).json({
            users
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.userService.readById(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() user: User) {
        const updatedUser = await this.userService.update(id, user);
        return response.status(HttpStatus.OK).json({
            updatedUser
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedUser
        })
    }
}