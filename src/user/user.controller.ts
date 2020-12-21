import { Body, Controller, Delete, Get, Param, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UpdateUserDto, UserByIdDto } from "./user.validator";

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/get/:id')
    @UsePipes(ValidationPipe)
    async fetchUser(
        @Param() id: UserByIdDto
    ): Promise<UserEntity> {
        return await this.userService.findOne(id);
    }

    @Put('/update/:id')
    @UsePipes(ValidationPipe)
    async updateUser(
        @Param() id: UserByIdDto,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<object> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete('/delete/:id')
    @UsePipes(ValidationPipe)
    async deleteUser(
        @Param() id: UserByIdDto
    ): Promise<object> {
        return this.userService.delete(id);
    }

}