import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async readById(id): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async update(id, User: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, User, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndRemove(id);
    }
}