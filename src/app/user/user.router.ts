import {Body, Controller, Delete, Get, Header, Path, Post, Put, Query, Route, Tags} from 'tsoa';
import {createUser, deleteUser, getAllUsers, updateUser} from './user.service';
import {User} from "@entity/User";
import {CreateUserWithRoleAndEmailT, UpdatableUserDataT} from "./types";

@Tags('User')
@Route('/api/user')
export class UserController extends Controller {

    @Get('/get/')
    public async getAllUserEndpoint(
        @Header('Authorization') authHeader: any
    ) {
        return getAllUsers(authHeader)
    }

    @Post('/create/')
    public async createUserEndpoint(
        @Header('Authorization') authHeader: any,
        @Body() body: CreateUserWithRoleAndEmailT
    ) {
        return createUser(authHeader, body)
    }

    @Put('/update/{id}/')
    public async updateUserEndpoint(
        @Query('id') id: number,
        @Body() body: UpdatableUserDataT,
        @Header('Authorization') authHeader: any
    ) {
        return updateUser(authHeader, body)
    }

    @Delete('/delete/{id}/')
    public async deleteUserEndpoint(@Path('id') id: number, @Header('Authorization') authHeader: any) {
        return deleteUser(authHeader, id);
    }
}