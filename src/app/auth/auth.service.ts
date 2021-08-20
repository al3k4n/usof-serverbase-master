import {CreateUserDataT, LoginUserDataT} from "../user/types";
import {ErrorType} from "../types";
import {User} from "@entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {randomString, transport} from "../helpers";

export const createUser = async (body: CreateUserDataT): Promise<ErrorType | User> => {
    try {
        const users = await User.findOne({login: body.login})
        if (users) {
            return 1
        }

        if (body.password !== body.password_confirmation) {
            return 2
        }

        const user = new User()
        user.login = body.login
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(body.password, salt);
        user.email = body.email
        user.verification = randomString(128)

        // Отправить письмо тут
        await transport.sendMail({
            from: process.env.EMAIL_LOGIN,
            to: user.email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello, ${user.login}!</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8080/confirm/${user.verification}> Click here</a>`
        })

        await user.save()

        return user
    } catch (e) {
        return -1
    }
}

export const loginUser = async (body: LoginUserDataT): Promise<ErrorType | string> => {
    try {
        const user = await User.findOne({login: body.login})
        if (!user) {
            return 1
        }
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (!validPassword) {
            return 2
        }
        return jwt.sign({
            login: user.login,
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET!)
    } catch (e) {
        return -1
    }
}