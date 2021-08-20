import {Body, Controller, Post, Route, Tags} from 'tsoa';
import {CreateUserDataT, LoginUserDataT} from "../user/types";
import {createUser, loginUser} from "./auth.service";

@Tags('User')
@Route('/api/auth')
export class AuthController extends Controller {
    @Post('/register/')
    public async register(@Body() body: CreateUserDataT): Promise<any> {
        const result = await createUser(body)
        if (typeof result === 'number') {
            this.setStatus(400)
        }
        return result
    }

    @Post('/login')
    public async loginUserEndpoint(@Body() body: LoginUserDataT): Promise<any> {
        const result = await loginUser(body)
        if (typeof result === 'number') {
            this.setStatus(400)
        }
        return result
    }
}