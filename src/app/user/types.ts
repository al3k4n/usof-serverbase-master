// import {UserRole} from "@entity/User";

export enum UserRole {
    admin='admin',
    user='user'
}

export type CreateUserDataT = {
    login: string,
    password: string,
    password_confirmation: string,
    email: string
}

export type CreateUserWithRoleT = CreateUserDataT & { role: UserRole }
export type CreateUserWithRoleAndEmailT = CreateUserWithRoleT & { send_confirmation_email: boolean }

export type LoginUserDataT = {
    login: string,
    password: string,
    email: string
}

export type UpdatableUserDataT = {
    login?: string
    password?: string
    email?: string
    role?: UserRole
}


export type UserTokenInfoT = {
    login: string,
    id: number,
    role: UserRole
}