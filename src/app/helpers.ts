import {UserTokenInfoT} from "./user/types";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const randomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const checkUserToken = (value: string): UserTokenInfoT => {
    const token = value.split(' ')[1]
    return <UserTokenInfoT>jwt.verify(token, process.env.JWT_SECRET!)
}


export const transport = nodemailer.createTransport({
    service: "Mail.ru",
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
    },
});
