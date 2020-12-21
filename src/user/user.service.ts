import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UpdateUserDto, UserByIdDto } from "./user.validator";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findOne(userByIdDto: UserByIdDto): Promise<UserEntity> {
        const { id } = userByIdDto;
        let user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException(`User doesn't exists with the id {${id}}`);
        return user;
    }

    async update(userByIdDto: UserByIdDto, updateUserDto: UpdateUserDto): Promise<any> {
        const { id } = userByIdDto;
        await this.findOne({ id });
        let toUpdate = await this.userRepository.update({ id }, updateUserDto);
        return toUpdate;
    }

    async delete(userByIdDto: UserByIdDto): Promise<any> {
        const { id } = userByIdDto;
        await this.findOne({ id });
        const toDelete = await this.userRepository.delete({ id });
        return toDelete;
    }

}