import { Controller, Get, Render } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserViewController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello World' };
    }

}