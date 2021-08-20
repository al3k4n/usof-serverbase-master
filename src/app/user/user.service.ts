import {User, UserRole} from '@entity/User';
import {checkUserToken, randomString, transport} from "../helpers";
import {CreateUserWithRoleAndEmailT, UpdatableUserDataT} from "./types";
import bcrypt from "bcrypt";


export const getAllUsers = async (token: string) => {
    const tokenData = checkUserToken(token)
    if (tokenData.role === UserRole.admin) {
        return await User.find();
    }

    try {
        return await User.find();
    } catch (e) {
        console.error(e);
    }
}

export const createUser = async (token: string, data: CreateUserWithRoleAndEmailT) => {
    const tokenData = checkUserToken(token)

    if (data.role === UserRole.admin) {
        if (tokenData.role !== UserRole.admin) {
            return 1
        }
    }

    const user = new User()
    user.login = data.login
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
    user.email = data.email
    user.verification = randomString(128)
    user.role = data.role

    if (data.send_confirmation_email) {
        await transport.sendMail({
            from: process.env.EMAIL_LOGIN,
            to: user.email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello, ${user.login}!</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8080/confirm/${user.verification}> Click here</a>`
        })
    }
}


export const updateUser = async (token: string, data: UpdatableUserDataT) => {
    const tokenData = checkUserToken(token)
    let foundUser
    if (tokenData.role === UserRole.admin) {
        foundUser = await User.findOne({login: data.login})
        if (!foundUser) {return 1}
        if (data.role) {
            foundUser.role = data!.role
        }
    }
    else {
        foundUser = await User.findOne({id: tokenData.id})
        if (!foundUser) {return 1}
        if (data.login) {
            foundUser.login = data?.login
        }
        if (data.password) {
            foundUser.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10))
        }
        if (data.email) {
            // Do i need to resend email?
            foundUser.email = data.email
        }
    }
    return foundUser
}

export const deleteUser = async (token: string, id: number) => {
    const tokenData = checkUserToken(token)
    if (tokenData.role === UserRole.admin) {
        const foundUser = await User.findOne({id: id})
        foundUser?.remove()
    }
}
